"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { COMPANY_INFO, STATS } from "@/lib/constants";

export default function Hero() {
  const whatsappLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hi, I need help with CA services.")}`;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-primary-950 to-primary-900">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-secondary-500/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-primary-600/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 mb-8 animate-fade-in">
              <span className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
              Trusted by {COMPANY_INFO.clientsServed} clients across India
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 animate-slide-up">
              Expert CA Services for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-secondary-300">
                Tax, Audit & Compliance
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up delay-100">
              From ITR filing to GST compliance, auditing to international taxation — we handle it all so you can focus on growing your business.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10 animate-slide-up delay-200">
              {[
                "Qualified CA",
                "100% Digital Process",
                "Secure & Confidential",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-success-400" />
                  {item}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-slide-up delay-300">
              <Link href="/contact">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>

          {/* Right side - Stats card */}
          <div className="relative animate-slide-in-right delay-400">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              {/* Floating badge */}
              <div className="absolute -top-4 right-8 bg-secondary-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg">
                {COMPANY_INFO.experience} Years Experience
              </div>

              <h3 className="text-2xl font-bold text-white mb-8">Why Choose Us?</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {STATS.map((stat, index) => (
                  <div key={stat.label} className={`text-center p-4 rounded-xl bg-white/5 animate-scale-in delay-${(index + 1) * 100}`}>
                    <div className="text-3xl sm:text-4xl font-bold text-secondary-400 mb-1">{stat.value}</div>
                    <div className="text-sm text-slate-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Services preview */}
              <div className="space-y-3">
                {["ITR Filing from ₹999", "GST Returns from ₹1,499/mo", "Audit Services from ₹15,000"].map((service) => (
                  <div key={service} className="flex items-center gap-3 text-slate-200">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/30 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-success-400" />
                    </div>
                    {service}
                  </div>
                ))}
              </div>

              <Link href="/pricing" className="flex items-center justify-center gap-2 mt-8 text-secondary-400 hover:text-secondary-300 font-medium transition-colors">
                View All Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Decorative floating elements */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-secondary-500/20 rounded-2xl blur-xl animate-float" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary-500/20 rounded-full blur-xl animate-float delay-300" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

