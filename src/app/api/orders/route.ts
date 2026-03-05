import { NextRequest, NextResponse } from "next/server";
import { sendTelegramNotification, OrderData } from "@/lib/telegram";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      orderId,
      name,
      phone,
      alternatePhone,
      address,
      landmark,
      deliveryDate,
      timeSlot,
      messageNote,
      items,
      totalAmount,
    } = body;

    // Validate required fields
    if (!orderId || !name || !phone || !address || !deliveryDate || !timeSlot) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Prepare order data for Telegram
    const orderData: OrderData = {
      orderId,
      customerName: name,
      phone,
      alternatePhone: alternatePhone || undefined,
      address,
      landmark: landmark || undefined,
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
      messageNote: messageNote || undefined,
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
