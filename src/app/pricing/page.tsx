"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { SERVICES, COMPANY_INFO } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const [selectedService, setSelectedService] = useState<string>("all");
  const whatsappLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hi, I need help choosing the right service plan. Can you guide me?")}`;

  const filteredServices = selectedService === "all" 
    ? SERVICES 
    : SERVICES.filter(s => s.id === selectedService);

  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-500/15 rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative text-center">
            <Badge variant="secondary" className="mb-4">Transparent Pricing</Badge>
            <h1 className="heading-1 text-white mb-6 max-w-4xl mx-auto">
              Simple, Honest Pricing for{" "}
              <span className="text-secondary-400">Every Need</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              No hidden charges, no surprises. 100% upfront payment ensures commitment 
              from both sides. Pay securely online and get started immediately.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-slate-300">
              {["✓ GST Inclusive", "✓ No Hidden Fees", "✓ Secure Payments", "✓ Money-back Guarantee"].map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Service Filter Tabs */}
        <section className="bg-white border-b border-slate-200 sticky top-16 z-30">
          <div className="container-custom">
            <div className="flex gap-2 py-4 overflow-x-auto scrollbar-thin">
              <button
                onClick={() => setSelectedService("all")}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                  selectedService === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                All Services
              </button>
              {SERVICES.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all",
                    selectedService === service.id
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  )}
                >
                  {service.shortTitle}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing tables */}
        <section className="section bg-slate-50">
          <div className="container-custom">
            {filteredServices.map((service, serviceIndex) => (
              <div key={service.id} className={serviceIndex > 0 ? "mt-20" : ""}>
                {/* Service header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                  <div>
                    <h2 className="heading-3 text-slate-900">{service.title}</h2>
                    <p className="text-slate-600 mt-1">{service.description}</p>
                  </div>
                  <Link href={`/services/${service.id}`}>
                    <Button variant="ghost" size="sm">
                      Learn More
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Pricing cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { key: "basic", ...service.pricing.basic, tier: "Basic", popular: false },
                    { key: "standard", ...service.pricing.standard, tier: "Standard", popular: true },
                    { key: "premium", ...service.pricing.premium, tier: "Premium", popular: false },
                  ].map((plan) => (
                    <Card 
                      key={plan.key}
                      className={`relative ${plan.popular ? 'ring-2 ring-secondary-500' : ''}`}
                      hover
                    >
                      {plan.popular && (
                        <div className="absolute -top-3 right-4">
                          <Badge variant="primary">Most Popular</Badge>
                        </div>
                      )}
                      <CardHeader className="p-6 pb-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                            {plan.tier}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mt-2">{plan.label}</h3>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="mb-6">
                          <span className="text-3xl font-bold text-slate-900">
                            ₹{plan.price.toLocaleString('en-IN')}
                          </span>
                          {service.id === 'gst' && plan.key !== 'basic' && (
                            <span className="text-slate-500 text-sm ml-1">/month</span>
                          )}
                          {service.id === 'bookkeeping' && (
                            <span className="text-slate-500 text-sm ml-1">/month</span>
                          )}
                        </div>

                        <ul className="space-y-2 mb-6">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                              <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                              {feature}
                            </li>
                          ))}
                        </ul>

                        <Link href={`/contact?service=${service.id}&plan=${plan.key}`}>
                          <Button 
                            variant={plan.popular ? "primary" : "outline"} 
                            className="w-full"
                            size="sm"
                          >
                            Get Started
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedService === "all" && serviceIndex < filteredServices.length - 1 && (
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent mt-16" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Custom quote section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge variant="secondary" className="mb-4">Enterprise Solutions</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Need a Custom Package?
                  </h2>
                  <p className="text-slate-300 mb-6">
                    For larger businesses or complex requirements, we offer customized 
                    packages with dedicated resources and flexible terms. Let&apos;s discuss 
                    your specific needs.
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    {[
                      "Dedicated CA for your account",
                      "Priority support with SLA guarantees",
                      "Custom reporting and compliance calendar",
                      "Quarterly business reviews",
                    ].map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-secondary-400" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col items-center md:items-end gap-4">
                  <Link href="/contact">
                    <Button variant="secondary" size="lg">
                      Request Custom Quote
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="whatsapp" size="lg">
                      <MessageCircle className="w-5 h-5" />
                      Chat with Us
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <section className="section bg-slate-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="heading-2 text-slate-900 mb-4">Pricing FAQs</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    q: "Are the prices inclusive of GST?",
                    a: "Yes, all prices displayed are inclusive of GST. You will receive a proper GST invoice for all services.",
                  },
                  {
                    q: "Why do you require 100% upfront payment?",
                    a: "Upfront payment ensures commitment from both sides and allows us to prioritize your work immediately. It also helps us maintain our no-bad-debt policy, keeping prices fair for everyone.",
                  },
                  {
                    q: "What if I'm not satisfied with the service?",
                    a: "We offer a satisfaction guarantee. If you're not happy with our service within the first 7 days, we'll refund your payment in full. No questions asked.",
                  },
                  {
                    q: "Can I upgrade my plan later?",
                    a: "Absolutely! You can upgrade anytime. We'll prorate the difference and apply it to your new plan.",
                  },
                  {
                    q: "Do you offer discounts for annual payments?",
                    a: "Yes, for recurring services like GST filing and bookkeeping, we offer up to 20% discount for annual commitments.",
                  },
                ].map((faq) => (
                  <div key={faq.q} className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-2">{faq.q}</h3>
                    <p className="text-slate-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
