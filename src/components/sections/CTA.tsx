"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { COMPANY_INFO } from "@/lib/constants";

export default function CTA() {
  const whatsappLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hi, I'm interested in your CA services. Please share more details.")}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-primary-950 to-primary-900 py-20 md:py-28">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Take Control of Your{" "}
            <span className="text-secondary-400">Finances?</span>
          </h2>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Join 500+ satisfied clients who trust us for their taxation and compliance needs. 
            Get started with a free consultation today.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Schedule Free Consultation
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="lg">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us Now
              </Button>
            </a>
          </div>

          {/* Contact options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-slate-400">
            <a 
              href={`tel:${COMPANY_INFO.phone}`}
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              {COMPANY_INFO.phone}
            </a>
            <span className="hidden sm:block">•</span>
            <a 
              href={`mailto:${COMPANY_INFO.email}`}
              className="hover:text-white transition-colors"
            >
              {COMPANY_INFO.email}
            </a>
          </div>

          {/* Trust note */}
          <p className="mt-8 text-sm text-slate-500">
            ✓ No spam, ever &nbsp; ✓ 100% free consultation &nbsp; ✓ Response within 2 hours
          </p>
        </div>
      </div>
    </section>
  );
}

