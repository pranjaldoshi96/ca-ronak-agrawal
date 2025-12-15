import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { COMPANY_INFO } from "@/lib/constants";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: `${COMPANY_INFO.name} | Chartered Accountants - Tax, Audit & Compliance Services`,
    template: `%s | ${COMPANY_INFO.name}`,
  },
  description: COMPANY_INFO.description,
  keywords: [
    "Chartered Accountant",
    "CA Services",
    "ITR Filing",
    "GST Registration",
    "Tax Audit",
    "Bookkeeping",
    "Tax Planning",
    "NRI Taxation",
    "India",
    "Mumbai",
  ],
  authors: [{ name: COMPANY_INFO.name }],
  creator: COMPANY_INFO.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: COMPANY_INFO.name,
    title: `${COMPANY_INFO.name} | Expert CA Services`,
    description: COMPANY_INFO.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY_INFO.name} | Chartered Accountants`,
    description: COMPANY_INFO.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
