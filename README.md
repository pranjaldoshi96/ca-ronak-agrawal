# Myca - CA Services Platform

A modern, full-featured platform for Chartered Accountant services. Built to acquire clients from India and internationally, with features for lead capture, service management, payments, and client portal.

## 🚀 Features

### Client-Facing
- **Professional Landing Page** - Trust signals, testimonials, and clear CTAs
- **Service Pages** - Detailed service information with transparent pricing
- **Pricing Calculator** - Easy-to-understand pricing tiers
- **Lead Capture Forms** - Smart forms with service routing
- **WhatsApp Integration** - Quick contact via WhatsApp Business

### Payments (100% Upfront)
- **Razorpay** - For Indian clients (UPI, Cards, Net Banking)
- **Stripe** - For international clients (Credit/Debit Cards)
- **Secure Checkout** - GST-compliant invoicing

### Client Portal
- Service tracking and status updates
- Document upload/download
- Payment history
- Communication with CA team

### Admin Dashboard
- Lead management and conversion tracking
- Client database
- Service delivery tracking
- Revenue analytics

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **Payments**: Razorpay + Stripe
- **Database**: PostgreSQL with Prisma (ready to integrate)
- **Auth**: NextAuth.js (ready to integrate)

## 📦 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/myca.git
cd myca
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your credentials (see Environment Variables section)

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

See `.env.example` for all required environment variables:

| Variable | Description |
|----------|-------------|
| `RAZORPAY_KEY_ID` | Razorpay API Key ID |
| `RAZORPAY_KEY_SECRET` | Razorpay Secret Key |
| `STRIPE_SECRET_KEY` | Stripe Secret Key |
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | NextAuth.js secret |
| `RESEND_API_KEY` | Email service API key |

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (home)/            # Public pages
│   ├── admin/             # Admin dashboard
│   ├── api/               # API routes
│   ├── checkout/          # Payment flow
│   ├── contact/           # Contact page
│   ├── portal/            # Client portal
│   ├── pricing/           # Pricing page
│   └── services/          # Service pages
├── components/
│   ├── forms/             # Form components
│   ├── layout/            # Header, Footer
│   ├── sections/          # Page sections
│   └── ui/                # Reusable UI components
└── lib/
    ├── constants.ts       # App constants & data
    ├── utils.ts           # Utility functions
    └── payments/          # Payment integrations
```

## 🎨 Customization

### Company Information

Update company details in `src/lib/constants.ts`:

```typescript
export const COMPANY_INFO = {
  name: "Myca",
  phone: "+91 98765 43210",
  email: "info@myca.in",
  // ... more settings
};
```

### Services & Pricing

Modify services in `src/lib/constants.ts`:

```typescript
export const SERVICES = [
  {
    id: "itr-filing",
    title: "Income Tax Return Filing",
    pricing: {
      basic: { price: 999, ... },
      // ...
    },
  },
  // ... more services
];
```

### Styling

The design uses a custom color palette defined in `tailwind.config.ts`. Primary colors are deep navy blue for trust, with gold accents for premium feel.

## 🔌 Integrations

### Payment Gateways

**Razorpay (Indian Payments)**
1. Sign up at [Razorpay Dashboard](https://dashboard.razorpay.com)
2. Get API keys from Settings > API Keys
3. Add to `.env.local`

**Stripe (International Payments)**
1. Sign up at [Stripe Dashboard](https://dashboard.stripe.com)
2. Get API keys from Developers > API Keys
3. Add to `.env.local`

### Database (Recommended: Supabase)

1. Create project at [Supabase](https://supabase.com)
2. Get connection string from Settings > Database
3. Add to `DATABASE_URL` in `.env.local`

### Email (Recommended: Resend)

1. Sign up at [Resend](https://resend.com)
2. Get API key from API Keys
3. Add to `RESEND_API_KEY` in `.env.local`

## 📱 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with services overview |
| `/services` | All services listing |
| `/services/[slug]` | Individual service page |
| `/pricing` | Pricing comparison |
| `/about` | About the firm |
| `/contact` | Contact form & inquiry |
| `/checkout` | Payment checkout flow |
| `/portal` | Client login |
| `/portal/dashboard` | Client dashboard |
| `/admin` | Admin login |
| `/admin/dashboard` | Admin dashboard |

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Self-hosted

```bash
npm run build
npm start
```

## 📄 License

MIT License - feel free to use this for your own CA practice!

## 🤝 Support

For support, email support@myca.in or open an issue.

---

Built with ❤️ for Chartered Accountants
