"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPANY_INFO, NAV_LINKS } from "@/lib/constants";
import Button from "@/components/ui/Button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappLink = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent("Hi, I'm interested in your CA services.")}`;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg shadow-slate-200/50"
          : "bg-transparent"
      )}
    >
      {/* Top bar */}
      <div className={cn(
        "hidden lg:block transition-all duration-300 border-b",
        isScrolled ? "bg-slate-900 border-slate-800" : "bg-slate-900/90 backdrop-blur border-slate-800/50"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-6 text-slate-300">
              <span>{COMPANY_INFO.workingHours}</span>
            </div>
            <div className="flex items-center gap-6">
              <a href={`tel:${COMPANY_INFO.phone}`} className="flex items-center gap-2 text-white hover:text-secondary-400 transition-colors">
                <Phone className="w-4 h-4" />
                {COMPANY_INFO.phone}
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-slate-300 hover:text-white transition-colors">
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg transition-all",
              isScrolled
                ? "bg-primary-700 text-white"
                : "bg-white text-primary-700"
            )}>
              RA
            </div>
            <div>
              <span className={cn(
                "text-2xl font-bold transition-colors",
                isScrolled ? "text-primary-900" : "text-white"
              )}>
                {COMPANY_INFO.name}
              </span>
              <p className={cn(
                "text-xs transition-colors hidden sm:block",
                isScrolled ? "text-slate-500" : "text-white/70"
              )}>
                Chartered Accountants
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium transition-colors hover:text-primary-500",
                  isScrolled ? "text-slate-700" : "text-white/90 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="sm">
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </a>
            <Link href="/contact">
              <Button variant={isScrolled ? "primary" : "outline"} size="sm" className={!isScrolled ? "border-white text-white hover:bg-white hover:text-primary-700" : ""}>
                Get Free Consultation
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "lg:hidden p-2 rounded-lg transition-colors",
              isScrolled ? "text-slate-700 hover:bg-slate-100" : "text-white hover:bg-white/10"
            )}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 rounded-b-2xl shadow-xl animate-fade-in">
            <div className="py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-primary-600 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 pt-4 space-y-3 border-t border-slate-100 mt-4">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button variant="whatsapp" className="w-full">
                    <MessageCircle className="w-4 h-4" />
                    Chat on WhatsApp
                  </Button>
                </a>
                <Link href="/contact" className="block">
                  <Button variant="primary" className="w-full">
                    Get Free Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

