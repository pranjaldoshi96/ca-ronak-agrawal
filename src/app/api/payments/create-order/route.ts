import { NextRequest, NextResponse } from "next/server";

// This would use the Razorpay SDK in production
// import Razorpay from "razorpay";

interface CreateOrderRequest {
  amount: number;
  currency?: string;
  serviceId: string;
  planType: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateOrderRequest = await request.json();
    
    const { amount, currency = "INR", serviceId, planType, customerName, customerEmail, customerPhone } = body;

    // Validate required fields
    if (!amount || !serviceId || !planType || !customerName || !customerEmail || !customerPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production, create order using Razorpay SDK:
    // const razorpay = new Razorpay({
    //   key_id: process.env.RAZORPAY_KEY_ID!,
    //   key_secret: process.env.RAZORPAY_KEY_SECRET!,
    // });
    // 
    // const order = await razorpay.orders.create({
    //   amount: amount * 100, // in paise
    //   currency,
    //   receipt: `order_${Date.now()}`,
    //   notes: {
    //     serviceId,
    //     planType,
    //     customerName,
    //     customerEmail,
    //     customerPhone,
    //   },
    // });

    // For demo, return mock order
    const mockOrder = {
      id: `order_${Date.now()}`,
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
      status: "created",
      created_at: Date.now(),
    };

    return NextResponse.json({
      success: true,
      order: mockOrder,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_demo",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

