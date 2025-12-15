"use client";

import Link from "next/link";
import { ArrowRight, FileText, Receipt, ClipboardCheck, Calculator, TrendingUp, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FileText,
  Receipt,
  ClipboardCheck,
  Calculator,
  TrendingUp,
  Globe,
};

export default function Services() {
  return (
    <section className="section bg-white" id="services">
      <div className="container-custom">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="primary" className="mb-4">Our Services</Badge>
          <h2 className="heading-2 text-slate-900 mb-4">
            Comprehensive CA Services for{" "}
            <span className="text-gradient">Every Need</span>
          </h2>
          <p className="text-lg text-slate-600">
            From individual tax filing to corporate audits, we offer end-to-end solutions 
            tailored to your specific requirements. All at transparent, upfront pricing.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = iconMap[service.icon];
            
            return (
              <Card key={service.id} hover className="group">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary-100 to-secondary-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    {IconComponent && <IconComponent className="w-7 h-7 text-secondary-600" />}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-secondary-600 transition-colors">
                    {service.shortTitle}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 mb-6 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Features preview */}
                  <ul className="space-y-2 mb-6">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Starting price */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div>
                      <span className="text-sm text-slate-500">Starting from</span>
                      <p className="text-xl font-bold text-slate-900">
                        ₹{service.pricing.basic.price.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <Link href={`/services/${service.id}`}>
                      <Button variant="ghost" size="sm" className="group/btn">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-6">
            Not sure which service you need? Let us help you choose.
          </p>
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Get Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

