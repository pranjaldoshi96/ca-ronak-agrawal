// Stripe payment integration for international clients
// Note: This handles client-side operations. Server-side operations should be done via API routes.

export interface CreateCheckoutSessionParams {
  priceId?: string;
  amount?: number;
  currency?: string;
  customerEmail?: string;
  metadata?: Record<string, string>;
  successUrl: string;
  cancelUrl: string;
}

export interface StripeSession {
  id: string;
  url: string;
}

// Load Stripe.js
export async function loadStripe(publishableKey: string) {
  if ((window as unknown as { Stripe?: unknown }).Stripe) {
    return (window as unknown as { Stripe: (key: string) => unknown }).Stripe(publishableKey);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/";
    script.onload = () => {
      const Stripe = (window as unknown as { Stripe: (key: string) => unknown }).Stripe;
      if (Stripe) {
        resolve(Stripe(publishableKey));
      } else {
        reject(new Error("Stripe.js failed to load"));
      }
    };
    script.onerror = () => reject(new Error("Failed to load Stripe.js"));
    document.body.appendChild(script);
  });
}

// Format amount for Stripe (convert to cents)
export function formatAmountForStripe(amount: number, currency: string = "usd"): number {
  // Some currencies don't use decimal places
  const zeroDecimalCurrencies = ["JPY", "KRW", "VND"];
  if (zeroDecimalCurrencies.includes(currency.toUpperCase())) {
    return Math.round(amount);
  }
  return Math.round(amount * 100);
}

// Format amount from Stripe (convert from cents)
export function formatAmountFromStripe(amount: number, currency: string = "usd"): number {
  const zeroDecimalCurrencies = ["JPY", "KRW", "VND"];
  if (zeroDecimalCurrencies.includes(currency.toUpperCase())) {
    return amount;
  }
  return amount / 100;
}


