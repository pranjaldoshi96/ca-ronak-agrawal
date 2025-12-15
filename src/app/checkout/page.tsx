"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Shield, Lock, CreditCard, Smartphone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { SERVICES, COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { loadRazorpay, initiateRazorpayPayment, formatAmountForRazorpay } from "@/lib/payments/razorpay";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const serviceId = searchParams.get("service");
  const planType = searchParams.get("plan") || "basic";
  
  const service = SERVICES.find((s) => s.id === serviceId);
  const plan = service?.pricing[planType as keyof typeof service.pricing];
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gstNumber: "",
    agreeToTerms: false,
  });
  const [paymentMethod, setPaymentMethod] = useState<"razorpay" | "stripe">("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Preload Razorpay SDK
    loadRazorpay();
  }, []);

  if (!service || !plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Service Not Found</h1>
          <p className="text-slate-600 mb-6">The selected service or plan is not available.</p>
          <Link href="/pricing">
            <Button variant="primary">View All Plans</Button>
          </Link>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (!formData.phone.trim() || !/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Valid 10-digit phone is required";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      if (paymentMethod === "razorpay") {
        // Create order
        const response = await fetch("/api/payments/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: plan.price,
            currency: "INR",
            serviceId: service.id,
            planType,
            customerName: formData.name,
            customerEmail: formData.email,
            customerPhone: formData.phone,
          }),
        });

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error);
        }

        // Initiate Razorpay payment
        await initiateRazorpayPayment({
          key: data.key,
          amount: formatAmountForRazorpay(plan.price),
          currency: "INR",
          name: COMPANY_INFO.name,
          description: `${service.shortTitle} - ${plan.label}`,
          orderId: data.order.id,
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: `+91${formData.phone}`,
          },
          notes: {
            serviceId: service.id,
            planType,
          },
          handler: async (response) => {
            // Verify payment
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            });

            const verifyData = await verifyResponse.json();

            if (verifyData.success) {
              router.push(`/checkout/success?payment_id=${response.razorpay_payment_id}`);
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          },
        });
      } else {
        // Stripe checkout
        const response = await fetch("/api/payments/create-checkout-session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: plan.price,
            currency: "USD",
            serviceId: service.id,
            planType,
            customerEmail: formData.email,
            successUrl: `${window.location.origin}/checkout/success`,
            cancelUrl: `${window.location.origin}/checkout?service=${service.id}&plan=${planType}`,
          }),
        });

        const data = await response.json();

        if (data.success && data.session.url) {
          window.location.href = data.session.url;
        } else {
          throw new Error(data.error);
        }
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-slate-50 min-h-screen">
        <div className="container-custom">
          {/* Breadcrumb */}
          <Link 
            href="/pricing" 
            className="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pricing
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout form */}
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-8">
                  <h1 className="text-2xl font-bold text-slate-900 mb-6">Checkout</h1>

                  {/* Contact Details */}
                  <div className="mb-8">
                    <h2 className="font-semibold text-slate-900 mb-4">Contact Details</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="label">Full Name *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={cn("input", errors.name && "input-error")}
                          placeholder="John Doe"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="label">Email *</label>
                          <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={cn("input", errors.email && "input-error")}
                            placeholder="john@example.com"
                          />
                          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <label className="label">Phone *</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">+91</span>
                            <input
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className={cn("input pl-12", errors.phone && "input-error")}
                              placeholder="98765 43210"
                            />
                          </div>
                          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                      <div>
                        <label className="label">GST Number (Optional)</label>
                        <input
                          type="text"
                          value={formData.gstNumber}
                          onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                          className="input"
                          placeholder="22AAAAA0000A1Z5"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-8">
                    <h2 className="font-semibold text-slate-900 mb-4">Payment Method</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("razorpay")}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all",
                          paymentMethod === "razorpay"
                            ? "border-primary-500 bg-primary-50"
                            : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <Smartphone className="w-5 h-5 text-primary-600" />
                          <span className="font-medium">Razorpay (India)</span>
                        </div>
                        <p className="text-sm text-slate-500">UPI, Cards, Net Banking, Wallets</p>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("stripe")}
                        className={cn(
                          "p-4 rounded-xl border-2 text-left transition-all",
                          paymentMethod === "stripe"
                            ? "border-primary-500 bg-primary-50"
                            : "border-slate-200 hover:border-slate-300"
                        )}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <CreditCard className="w-5 h-5 text-primary-600" />
                          <span className="font-medium">Stripe (International)</span>
                        </div>
                        <p className="text-sm text-slate-500">Credit/Debit Cards (Visa, Mastercard)</p>
                      </button>
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="mb-8">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-slate-600">
                        I agree to proceed with the payment and understand that payment is 100% upfront.
                        My data will be handled securely and confidentially.
                      </span>
                    </label>
                    {errors.agreeToTerms && <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>}
                  </div>

                  {/* Pay button */}
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={handlePayment}
                    isLoading={isProcessing}
                  >
                    <Lock className="w-5 h-5" />
                    Pay ₹{plan.price.toLocaleString('en-IN')}
                  </Button>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 mt-6 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      Secure Payment
                    </div>
                    <div className="flex items-center gap-1">
                      <Lock className="w-4 h-4" />
                      256-bit SSL
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order summary */}
            <div>
              <Card className="sticky top-32">
                <CardContent className="p-6">
                  <h2 className="font-semibold text-slate-900 mb-4">Order Summary</h2>
                  
                  <div className="p-4 bg-slate-50 rounded-xl mb-6">
                    <h3 className="font-medium text-slate-900">{service.title}</h3>
                    <Badge variant="primary" className="mt-2">{plan.label}</Badge>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className="border-t border-slate-100 pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Subtotal</span>
                      <span className="text-slate-900">₹{plan.price.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">GST (Included)</span>
                      <span className="text-slate-900">₹{Math.round(plan.price * 0.18 / 1.18).toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-100">
                      <span>Total</span>
                      <span className="text-primary-700">₹{plan.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}

