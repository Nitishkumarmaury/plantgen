import { NextRequest, NextResponse } from "next/server";
import { sendTelegramNotification, OrderData } from "@/lib/telegram";
import { sanitizeInput, isValidPhone } from "@/lib/sanitize";
import { products } from "@/data/products";
import { GIFT_WRAP_COST } from "@/lib/constants";

// Simple in-memory rate limiter (per IP, 5 orders / 10 min)
const rateLimitMap = new Map<string, { count: number; ts: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW = 10 * 60 * 1000; // 10 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.ts > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, ts: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT) return true;
  entry.count++;
  return false;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limit by IP
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const {
      name,
      phone,
      alternatePhone,
      address,
      landmark,
      deliveryDate,
      timeSlot,
      messageNote,
      items,
    } = body;

    // Generate orderId server-side
    const orderId = `PG-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

    // Validate required fields
    if (!name || !phone || !address || !deliveryDate || !timeSlot) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Server-side phone validation
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number" },
        { status: 400 }
      );
    }

    // Validate alternatePhone if provided
    if (alternatePhone && !isValidPhone(alternatePhone)) {
      return NextResponse.json(
        { error: "Invalid alternate phone number" },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order must contain at least one item" },
        { status: 400 }
      );
    }

    // Server-side price validation
    let computedTotal = 0;
    for (const item of items) {
      const catalogProduct = products.find((p) => p.id === item.id);
      if (!catalogProduct) {
        return NextResponse.json(
          { error: `Product not found: ${item.name}` },
          { status: 400 }
        );
      }
      const itemPrice = catalogProduct.price + (item.giftWrap ? GIFT_WRAP_COST : 0);
      computedTotal += itemPrice * (item.quantity || 1);
    }
    const totalAmount = computedTotal;

    // Sanitise all user-supplied text fields
    const safeName = sanitizeInput(name);
    const safeAddress = sanitizeInput(address);
    const safeLandmark = landmark ? sanitizeInput(landmark) : undefined;
    const safeMessage = messageNote ? sanitizeInput(messageNote) : undefined;

    // Prepare order data for Telegram
    const orderData: OrderData = {
      orderId,
      customerName: safeName,
      phone,
      alternatePhone: alternatePhone || undefined,
      address: safeAddress,
      landmark: safeLandmark,
      deliveryDate,
      timeSlot,
      items: items.map(
        (item: { name: string; quantity: number; price: number; giftWrap?: boolean }) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          giftWrap: item.giftWrap || false,
        })
      ),
      totalAmount,
      messageNote: safeMessage,
    };

    // Try to save to Firebase (non-blocking — wrapped in try/catch)
    try {
      const { db } = await import("@/lib/firebase");
      const { collection, addDoc, serverTimestamp } = await import(
        "firebase/firestore"
      );
      await addDoc(collection(db, "orders"), {
        ...orderData,
        status: "pending",
        createdAt: serverTimestamp(),
      });
    } catch (firebaseError) {
      console.warn("Firebase save failed (continuing):", firebaseError);
    }

    // Send Telegram notification (non-blocking failure)
    try {
      await sendTelegramNotification(orderData);
    } catch (telegramError) {
      console.warn("Telegram notification failed (continuing):", telegramError);
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.error("Order API error:", error);
    return NextResponse.json(
      { error: "Failed to process order" },
      { status: 500 }
    );
  }
}
