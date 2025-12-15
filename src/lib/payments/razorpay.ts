// Razorpay payment integration for Indian clients
// Note: This is a client-side integration. Server-side order creation should be done via API routes.

export interface RazorpayOptions {
  key: string;
  amount: number; // in paise (100 = ₹1)
  currency: string;
  name: string;
  description: string;
  orderId: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
  handler: (response: RazorpayResponse) => void;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export interface CreateOrderParams {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}

// Client-side Razorpay loader
export function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

// Initialize payment
export async function initiateRazorpayPayment(options: RazorpayOptions): Promise<void> {
  const loaded = await loadRazorpay();
  
  if (!loaded) {
    throw new Error("Failed to load Razorpay SDK");
  }

  const Razorpay = (window as unknown as { Razorpay: new (options: RazorpayOptions) => { open: () => void } }).Razorpay;
  const razorpay = new Razorpay({
    ...options,
    theme: {
      color: "#1340eb", // primary-700 color
      ...options.theme,
    },
  });

  razorpay.open();
}

// Format amount for Razorpay (convert to paise)
export function formatAmountForRazorpay(amount: number): number {
  return Math.round(amount * 100);
}

// Format amount from Razorpay (convert from paise)
export function formatAmountFromRazorpay(amount: number): number {
  return amount / 100;
}


