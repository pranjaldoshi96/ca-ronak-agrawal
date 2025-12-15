"use client";

import { Shield, Clock, Award, Users, Headphones, Lock } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { COMPANY_INFO } from "@/lib/constants";

const features = [
  {
    icon: Shield,
    title: "ICAI Certified",
    description: "All our CAs are qualified members of ICAI with extensive experience in their respective domains.",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "We understand deadlines matter. Get your ITR filed, GST returns submitted on time, every time.",
  },
  {
    icon: Award,
    title: "5+ Years Experience",
    description: "Trusted by 500+ clients across India. Our experience helps us handle complex cases with ease.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Get a dedicated CA for your account. No repeating your story to different people every time.",
  },
  {
    icon: Headphones,
    title: "Multi-channel Support",
    description: "Reach us via WhatsApp, email, or phone. We respond within 2 hours during business hours.",
  },
  {
    icon: Lock,
    title: "100% Secure",
    description: "Bank-grade encryption for all your documents. Your data is safe with us and never shared.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section bg-slate-50" id="why-us">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <Badge variant="secondary" className="mb-4">Why Choose Us?</Badge>
            <h2 className="heading-2 text-slate-900 mb-6">
              Trusted by Businesses &{" "}
              <span className="text-gradient">Individuals Alike</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              We combine decades of experience with modern technology to deliver 
              CA services that are fast, reliable, and hassle-free. Our 100% upfront 
              pricing means no surprises.
            </p>

            {/* Stats inline */}
            <div className="grid grid-cols-3 gap-6 p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600">{COMPANY_INFO.clientsServed}</div>
                <div className="text-sm text-slate-500">Happy Clients</div>
              </div>
              <div className="text-center border-x border-slate-100">
                <div className="text-3xl font-bold text-secondary-600">{COMPANY_INFO.experience}</div>
                <div className="text-sm text-slate-500">Years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary-600">99%</div>
                <div className="text-sm text-slate-500">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right - Features grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 hover:border-secondary-200 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-100 to-secondary-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-secondary-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

