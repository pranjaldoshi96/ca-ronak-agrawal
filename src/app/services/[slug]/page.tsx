import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, FileText, Receipt, ClipboardCheck, Calculator, TrendingUp, Globe, MessageCircle, Phone, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { SERVICES, COMPANY_INFO } from "@/lib/constants";

const iconMap: { [key: string]: React.ComponentType<{ className?: string }> } = {
  FileText,
  Receipt,
  ClipboardCheck,
  Calculator,
  TrendingUp,
  Globe,
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const IconComponent = iconMap[service.icon];
  const whatsappLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in your ${service.title} service. Please share more details.`)}`;

  const pricingTiers = [
    { key: "basic", ...service.pricing.basic, popular: false },
    { key: "standard", ...service.pricing.standard, popular: true },
    { key: "premium", ...service.pricing.premium, popular: false },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative">
            {/* Breadcrumb */}
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* Badge */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.targetAudience.map((audience) => (
                    <Badge key={audience} variant="secondary" className="text-sm">
                      {audience}
                    </Badge>
                  ))}
                </div>

                {/* Title */}
                <h1 className="heading-1 text-white mb-6">
                  {service.title}
                </h1>

                {/* Description */}
                <p className="text-xl text-slate-300 mb-8">
                  {service.description}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button variant="secondary" size="lg">
                      Get Started
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="whatsapp" size="lg">
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp Us
                    </Button>
                  </a>
                </div>
              </div>

              {/* Icon card */}
              <div className="hidden lg:flex justify-center">
                <div className="w-64 h-64 rounded-3xl bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center">
                  {IconComponent && <IconComponent className="w-32 h-32 text-secondary-400" />}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features section */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="heading-2 text-slate-900 mb-4">
                What&apos;s <span className="text-gradient">Included</span>
              </h2>
              <p className="text-lg text-slate-600">
                Comprehensive service covering all aspects of {service.shortTitle.toLowerCase()}.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.features.map((feature) => (
                <div 
                  key={feature}
                  className="flex items-start gap-4 p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{feature}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing section */}
        <section className="section bg-slate-50" id="pricing">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="primary" className="mb-4">Transparent Pricing</Badge>
              <h2 className="heading-2 text-slate-900 mb-4">
                Choose Your <span className="text-gradient">Plan</span>
              </h2>
              <p className="text-lg text-slate-600">
                All prices are inclusive of GST. 100% upfront payment - no hidden charges.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricingTiers.map((tier) => (
                <Card 
                  key={tier.key}
                  className={`relative ${tier.popular ? 'ring-2 ring-primary-500 scale-105' : ''}`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge variant="primary" className="shadow-lg">Most Popular</Badge>
                    </div>
                  )}
                  <CardHeader className="p-6 pb-0">
                    <h3 className="text-lg font-semibold text-slate-900">{tier.label}</h3>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-primary-700">
                        ₹{tier.price.toLocaleString('en-IN')}
                      </span>
                      {tier.key !== 'basic' && service.id.includes('gst') && (
                        <span className="text-slate-500 text-sm ml-1">/month</span>
                      )}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link href="/contact" className="block">
                      <Button 
                        variant={tier.popular ? "primary" : "outline"} 
                        className="w-full"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Custom quote */}
            <div className="text-center mt-12">
              <p className="text-slate-600 mb-4">
                Need a custom solution? We offer tailored packages for enterprise clients.
              </p>
              <Link href="/contact">
                <Button variant="ghost">
                  Request Custom Quote
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-primary-950">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Our team of expert CAs is ready to assist you. Get a free consultation 
                and personalized quote within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <Button variant="secondary" size="lg">
                    Schedule Consultation
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <a href={`tel:${COMPANY_INFO.phone}`}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary-900">
                    <Phone className="w-5 h-5" />
                    {COMPANY_INFO.phone}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

