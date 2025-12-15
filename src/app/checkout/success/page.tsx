"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Download, ArrowRight, Mail, Phone } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentId = searchParams.get("payment_id") || searchParams.get("session_id");

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-slate-50 min-h-screen">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                {/* Success icon */}
                <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-12 h-12 text-success-600" />
                </div>

                {/* Heading */}
                <h1 className="text-3xl font-bold text-slate-900 mb-4">
                  Payment Successful!
                </h1>
                <p className="text-lg text-slate-600 mb-8">
                  Thank you for choosing {COMPANY_INFO.name}. Your payment has been processed successfully.
                </p>

                {/* Payment details */}
                {paymentId && (
                  <div className="p-4 bg-slate-50 rounded-xl mb-8 text-left">
                    <p className="text-sm text-slate-500">Transaction ID</p>
                    <p className="font-mono text-slate-900">{paymentId}</p>
                  </div>
                )}

                {/* What's next */}
                <div className="bg-primary-50 rounded-xl p-6 mb-8 text-left">
                  <h2 className="font-semibold text-primary-900 mb-4">What happens next?</h2>
                  <ul className="space-y-3">
                    {[
                      "You'll receive a confirmation email with your invoice",
                      "Our team will contact you within 24 hours",
                      "We'll send you a document checklist",
                      "Once you submit documents, work begins immediately",
                    ].map((step, index) => (
                      <li key={step} className="flex items-start gap-3 text-sm text-primary-800">
                        <span className="w-6 h-6 rounded-full bg-primary-200 flex items-center justify-center flex-shrink-0 text-xs font-medium">
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Button variant="primary" size="lg">
                    <Download className="w-5 h-5" />
                    Download Invoice
                  </Button>
                  <Link href="/portal">
                    <Button variant="outline" size="lg">
                      Go to Client Portal
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                </div>

                {/* Contact */}
                <div className="border-t border-slate-100 pt-6">
                  <p className="text-slate-600 mb-4">Have questions? Contact us:</p>
                  <div className="flex flex-wrap justify-center gap-6">
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <Phone className="w-4 h-4" />
                      {COMPANY_INFO.phone}
                    </a>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <Mail className="w-4 h-4" />
                      {COMPANY_INFO.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

