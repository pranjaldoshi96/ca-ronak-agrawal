import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, FileText, Receipt, ClipboardCheck, Calculator, TrendingUp, Globe, CheckCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Comprehensive CA services including ITR filing, GST registration, tax audit, bookkeeping, and more. Expert chartered accountants at your service.",
};

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FileText,
  Receipt,
  ClipboardCheck,
  Calculator,
  TrendingUp,
  Globe,
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">Our Services</Badge>
              <h1 className="heading-1 text-white mb-6">
                Professional CA Services{" "}
                <span className="text-secondary-400">You Can Trust</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                From individual tax filing to corporate audits, we offer comprehensive 
                chartered accountancy services tailored to your specific needs. 
                All with transparent, upfront pricing.
              </p>
              <div className="flex flex-wrap gap-6 text-slate-300">
                {["✓ 5+ Years Experience", "✓ 500+ Clients Served", "✓ 100% Digital Process"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services grid */}
        <section className="section bg-slate-50">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-8">
              {SERVICES.map((service) => {
                const IconComponent = iconMap[service.icon];
                
                return (
                  <Card key={service.id} hover className="group">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          {IconComponent && <IconComponent className="w-8 h-8 text-primary-600" />}
                        </div>

                        <div className="flex-1">
                          {/* Title & badge */}
                          <div className="flex items-center gap-3 mb-3">
                            <h2 className="text-2xl font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                              {service.title}
                            </h2>
                          </div>

                          {/* Description */}
                          <p className="text-slate-600 mb-6">
                            {service.description}
                          </p>

                          {/* Target audience */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {service.targetAudience.map((audience) => (
                              <Badge key={audience} variant="outline" className="text-xs">
                                {audience}
                              </Badge>
                            ))}
                          </div>

                          {/* Features */}
                          <div className="grid sm:grid-cols-2 gap-2 mb-6">
                            {service.features.slice(0, 4).map((feature) => (
                              <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                                <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0" />
                                {feature}
                              </div>
                            ))}
                          </div>

                          {/* Pricing & CTA */}
                          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                            <div>
                              <span className="text-sm text-slate-500">Starting from</span>
                              <p className="text-2xl font-bold text-primary-700">
                                ₹{service.pricing.basic.price.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <Link href={`/services/${service.id}`}>
                              <Button variant="primary" size="sm">
                                View Details
                                <ArrowRight className="w-4 h-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="bg-gradient-to-r from-primary-700 to-primary-600 rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Not Sure Which Service You Need?
              </h2>
              <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
                Our experts will analyze your requirements and recommend the best 
                solution. Book a free consultation today - no obligations!
              </p>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Get Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

