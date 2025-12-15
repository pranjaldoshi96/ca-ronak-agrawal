"use client";

import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { FAQ as FAQData, COMPANY_INFO } from "@/lib/constants";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const whatsappLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hi, I have a question about your CA services.")}`;

  return (
    <section className="section bg-slate-50" id="faq">
      <div className="container-custom">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left side */}
          <div className="lg:col-span-2">
            <Badge variant="primary" className="mb-4">FAQ</Badge>
            <h2 className="heading-2 text-slate-900 mb-6">
              Frequently Asked{" "}
              <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Got questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re 
              looking for, feel free to reach out to us directly.
            </p>
            
            <div className="p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
              <h3 className="font-semibold text-slate-900 mb-2">Still have questions?</h3>
              <p className="text-sm text-slate-600 mb-4">
                Our team is here to help. Get in touch and we&apos;ll respond within 2 hours.
              </p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" className="w-full">
                  <MessageCircle className="w-4 h-4" />
                  Chat with Us
                </Button>
              </a>
            </div>
          </div>

          {/* Right side - Accordion */}
          <div className="lg:col-span-3 space-y-4">
            {FAQData.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "bg-white rounded-2xl border transition-all duration-300",
                  openIndex === index 
                    ? "border-primary-200 shadow-lg shadow-primary-100/50" 
                    : "border-slate-100 hover:border-slate-200"
                )}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={cn(
                    "font-semibold transition-colors",
                    openIndex === index ? "text-primary-700" : "text-slate-900"
                  )}>
                    {item.question}
                  </span>
                  <ChevronDown 
                    className={cn(
                      "w-5 h-5 text-slate-400 transition-transform duration-300",
                      openIndex === index && "rotate-180 text-primary-600"
                    )} 
                  />
                </button>
                <div className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}>
                  <p className="px-6 pb-6 text-slate-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

