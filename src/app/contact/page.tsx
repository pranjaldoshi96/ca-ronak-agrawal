"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { COMPANY_INFO, SERVICES } from "@/lib/constants";
import ContactForm from "@/components/forms/ContactForm";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: COMPANY_INFO.phone,
    link: `tel:${COMPANY_INFO.phone}`,
    description: "Mon-Sat, 9AM-7PM",
  },
  {
    icon: Mail,
    title: "Email",
    value: COMPANY_INFO.email,
    link: `mailto:${COMPANY_INFO.email}`,
    description: "We reply within 2 hours",
  },
  {
    icon: MapPin,
    title: "Office",
    value: COMPANY_INFO.address,
    link: "#",
    description: "Visit by appointment",
  },
  {
    icon: Clock,
    title: "Working Hours",
    value: COMPANY_INFO.workingHours,
    link: "#",
    description: "Closed on Sundays",
  },
];

function ContactContent() {
  const searchParams = useSearchParams();
  const preSelectedService = searchParams.get("service") || "";
  const whatsappLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hi, I'd like to schedule a consultation.")}`;

  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-primary-950 to-primary-900 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative text-center">
            <Badge variant="secondary" className="mb-4">Contact Us</Badge>
            <h1 className="heading-1 text-white mb-6 max-w-3xl mx-auto">
              Let&apos;s Discuss Your{" "}
              <span className="text-secondary-400">Requirements</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Get a free consultation with our experts. We&apos;ll understand your needs 
              and recommend the best solutions. No obligations!
            </p>
          </div>
        </section>

        {/* Contact section */}
        <section className="section bg-slate-50">
          <div className="container-custom">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-8">
                    <h2 className="heading-3 text-slate-900 mb-2">Send Us a Message</h2>
                    <p className="text-slate-600 mb-8">
                      Fill out the form below and we&apos;ll get back to you within 2 hours during business hours.
                    </p>
                    <ContactForm services={SERVICES} preSelectedService={preSelectedService} />
                  </CardContent>
                </Card>
              </div>

              {/* Contact info sidebar */}
              <div className="space-y-6">
                {/* WhatsApp CTA */}
                <Card className="bg-gradient-to-br from-[#25D366] to-[#128C7E] border-0">
                  <CardContent className="p-6 text-white">
                    <MessageCircle className="w-10 h-10 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Prefer WhatsApp?</h3>
                    <p className="text-white/80 mb-4 text-sm">
                      Chat with us directly. We respond instantly during business hours.
                    </p>
                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#25D366] rounded-lg font-medium hover:bg-white/90 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Start Chat
                    </a>
                  </CardContent>
                </Card>

                {/* Contact info cards */}
                {contactInfo.map((info) => (
                  <Card key={info.title} hover>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900">{info.title}</h3>
                          {info.link !== "#" ? (
                            <a
                              href={info.link}
                              className="text-primary-600 hover:text-primary-700 transition-colors"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-slate-700">{info.value}</p>
                          )}
                          <p className="text-sm text-slate-500 mt-1">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Map section */}
        <section className="h-96 bg-slate-200 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3677.8!2d74.4544!3d22.9144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962a3c4a5b1f3a5%3A0x8c2e6e3e1c0b8c0a!2sBus%20Stand%2C%20Ranapur%2C%20Jhabua%2C%20Madhya%20Pradesh%20457993!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location - Ranapur, Jhabua, Madhya Pradesh"
            className="absolute inset-0"
          />
          <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 max-w-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-slate-900">Our Office</p>
                <p className="text-sm text-slate-600">Bus Stand, Ranapur, Jhabua, Madhya Pradesh - 457993</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    }>
      <ContactContent />
    </Suspense>
  );
}
