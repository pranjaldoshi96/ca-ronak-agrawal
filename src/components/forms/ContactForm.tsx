"use client";

import { useState } from "react";
import { CheckCircle, MessageCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";

interface Service {
  id: string;
  shortTitle: string;
}

interface ContactFormProps {
  services: Service[];
  preSelectedService?: string;
}

interface FormData {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  service: string;
  clientType: string;
  message: string;
  consent: boolean;
}

const countryCodes = [
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
];

export default function ContactForm({ services, preSelectedService = "" }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    countryCode: "+91",
    phone: "",
    service: preSelectedService,
    clientType: "individual",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const clientTypes = [
    { value: "individual", label: "Individual" },
    { value: "business", label: "Business" },
    { value: "startup", label: "Startup" },
    { value: "nri", label: "NRI" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{6,15}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.consent) {
      newErrors.consent = "Please accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateWhatsAppMessage = (): string => {
    const serviceName = services.find(s => s.id === formData.service)?.shortTitle || formData.service;
    const clientTypeLabel = clientTypes.find(t => t.value === formData.clientType)?.label || formData.clientType;
    
    let message = `Hi, I'm interested in your CA services.\n\n`;
    message += `*Name:* ${formData.name}\n`;
    message += `*Email:* ${formData.email}\n`;
    message += `*Phone:* ${formData.countryCode} ${formData.phone}\n`;
    message += `*Service Required:* ${serviceName}\n`;
    message += `*Client Type:* ${clientTypeLabel}\n`;
    
    if (formData.message.trim()) {
      message += `\n*Additional Details:*\n${formData.message}`;
    }
    
    return message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Small delay to show loading state
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Generate WhatsApp link
    const whatsappMessage = generateWhatsAppMessage();
    const whatsappNumber = COMPANY_INFO.whatsapp;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-success-600" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
        <p className="text-slate-600 mb-6">
          Your inquiry has been sent via WhatsApp. We&apos;ll respond shortly during business hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => {
              setIsSubmitted(false);
              setFormData({
                name: "",
                email: "",
                countryCode: "+91",
                phone: "",
                service: "",
                clientType: "individual",
                message: "",
                consent: false,
              });
            }}
          >
            Submit Another Inquiry
          </Button>
          <a
            href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp">
              <MessageCircle className="w-4 h-4" />
              Open WhatsApp
            </Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name & Email row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="label">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={cn("input", errors.name && "input-error")}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="label">
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={cn("input", errors.email && "input-error")}
            placeholder="john@example.com"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
      </div>

      {/* Phone & Service row */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="phone" className="label">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="input w-28 flex-shrink-0"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={cn("input flex-1", errors.phone && "input-error")}
              placeholder="9876543210"
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="service" className="label">
            Service Required <span className="text-red-500">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={cn("input", errors.service && "input-error")}
          >
            <option value="">Select a service</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.shortTitle}
              </option>
            ))}
            <option value="other">Other / Not Sure</option>
          </select>
          {errors.service && <p className="text-red-500 text-sm mt-1">{errors.service}</p>}
        </div>
      </div>

      {/* Client type */}
      <div>
        <label className="label">I am a(n)</label>
        <div className="flex flex-wrap gap-4">
          {clientTypes.map((type) => (
            <label
              key={type.value}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all",
                formData.clientType === type.value
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              <input
                type="radio"
                name="clientType"
                value={type.value}
                checked={formData.clientType === type.value}
                onChange={handleChange}
                className="sr-only"
              />
              <span className="text-sm font-medium">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="label">
          Additional Details (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="input resize-none"
          placeholder="Tell us more about your requirements..."
        />
      </div>

      {/* Consent */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="mt-1 w-4 h-4 rounded border-slate-300 text-primary-600 focus:ring-primary-500"
          />
          <span className="text-sm text-slate-600">
            I agree to receive communications from Ronak Agrawal CA. I understand that my data will be 
            handled securely and confidentially.
          </span>
        </label>
        {errors.consent && <p className="text-red-500 text-sm mt-1">{errors.consent}</p>}
      </div>

      {/* Submit button */}
      <Button
        type="submit"
        variant="whatsapp"
        size="lg"
        className="w-full"
        isLoading={isSubmitting}
      >
        <MessageCircle className="w-5 h-5" />
        Send Inquiry via WhatsApp
      </Button>

      <p className="text-center text-sm text-slate-500">
        Your inquiry will be sent directly to our WhatsApp. We&apos;ll respond within 2 hours during business hours.
      </p>
    </form>
  );
}
