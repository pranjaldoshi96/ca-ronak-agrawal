import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Linkedin, Twitter, Youtube, Instagram, Facebook } from "lucide-react";
import { COMPANY_INFO, SERVICES, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hi, I'm interested in your CA services.")}`;

  return (
    <footer className="bg-slate-950 text-white">
      {/* CTA Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-gradient-to-r from-secondary-600 to-secondary-500 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-secondary-500/20">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Ready to simplify your finances?</h3>
              <p className="text-white/90">Get expert CA services with transparent pricing. No hidden fees.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-lg font-semibold hover:bg-[#1fb855] transition-colors shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors shadow-lg"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary-500 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                RA
              </div>
              <div>
                <span className="text-2xl font-bold">{COMPANY_INFO.name}</span>
                <p className="text-xs text-secondary-400">Chartered Accountants</p>
              </div>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              {COMPANY_INFO.tagline}. Trusted by 500+ clients across India and abroad.
            </p>
            <div className="flex gap-3">
              <a href="https://youtube.com/@cacmaronakagrawal?si=3BKWyU_hYGL4f7IG" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-secondary-500 transition-all duration-200">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/financebycaronak/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-secondary-500 transition-all duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/caronakagrawal" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-secondary-500 transition-all duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://x.com/cacmaronak" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-secondary-500 transition-all duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/share/16VMJsrALk/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center hover:bg-secondary-500 transition-all duration-200">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.id}`}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {service.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/portal" className="text-slate-400 hover:text-white transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-secondary-500 mt-0.5" />
                <div>
                  <a href={`tel:${COMPANY_INFO.phone}`} className="text-white hover:text-secondary-400 transition-colors">
                    {COMPANY_INFO.phone}
                  </a>
                  <p className="text-sm text-slate-500">{COMPANY_INFO.workingHours}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-secondary-500 mt-0.5" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-400 hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary-500 mt-0.5" />
                <span className="text-slate-400">{COMPANY_INFO.address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-slate-500">
              <Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

