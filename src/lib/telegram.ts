interface OrderData {
  orderId: string;
  customerName: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  landmark?: string;
  deliveryDate: string;
  timeSlot: string;
  messageNote?: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: number;
}

export async function sendTelegramNotification(order: OrderData): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error("Telegram bot credentials not configured");
    return false;
  }

  const itemsList = order.items
    .map((item) => `  • ${item.name} x${item.quantity} — ₹${item.price * item.quantity}`)
    .join("\n");

  const message = `
🌿 *NEW ORDER — PLANTGEN*
━━━━━━━━━━━━━━━━━━━

📋 *Order ID:* \`${order.orderId}\`

👤 *Customer:* ${order.customerName}
📞 *Phone:* ${order.phone}
${order.alternatePhone ? `📞 *Alt Phone:* ${order.alternatePhone}` : ""}

📍 *Address:* ${order.address}
${order.landmark ? `🏠 *Landmark:* ${order.landmark}` : ""}

📅 *Delivery:* ${order.deliveryDate}
🕐 *Time Slot:* ${order.timeSlot}

${order.messageNote ? `💌 *Gift Message:* "${order.messageNote}"` : ""}

🛒 *Items:*
${itemsList}

💰 *Total:* ₹${order.totalAmount}
💳 *Payment:* Cash on Delivery

━━━━━━━━━━━━━━━━━━━
  `.trim();

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Telegram API error:", errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send Telegram notification:", error);
    return false;
  }
}

export type { OrderData };
