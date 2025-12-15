export const COMPANY_INFO = {
  name: "Ronak Agrawal",
  tagline: "Your Trusted Partner in Financial Excellence",
  description: "Professional Chartered Accountant services for individuals, businesses, and NRIs. Expert tax filing, GST compliance, auditing, and financial advisory.",
  phone: "+91 9589167567",
  whatsapp: "919589167567",
  email: "cacmaronakagrawal@gmail.com",
  address: "Bus Stand, Ranapur, Jhabua, Madhya Pradesh - 457993",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM",
  experience: "5+",
  clientsServed: "500+",
  icaiMembership: "",
};

export const SERVICES = [
  {
    id: "itr-filing",
    title: "Income Tax Return Filing",
    shortTitle: "ITR Filing",
    description: "Expert assistance for all types of ITR filing - from salaried individuals to business owners. Maximize your refunds legally.",
    icon: "FileText",
    features: [
      "All ITR forms (ITR-1 to ITR-7)",
      "Capital gains computation",
      "Salary restructuring advice",
      "Tax-saving recommendations",
      "Revised returns filing",
      "Response to notices",
    ],
    pricing: {
      basic: { price: 999, label: "Salaried (ITR-1)", features: ["Single Form 16", "Basic deductions", "E-filing", "Email support"] },
      standard: { price: 2499, label: "Multiple Income Sources", features: ["Multiple Form 16s", "Capital gains", "Rental income", "Priority support"] },
      premium: { price: 4999, label: "Business/Professional", features: ["ITR-3/ITR-4", "Business income", "Full deduction optimization", "Dedicated CA"] },
    },
    targetAudience: ["Individuals", "Professionals", "Business Owners"],
  },
  {
    id: "gst",
    title: "GST Registration & Filing",
    shortTitle: "GST Services",
    description: "Complete GST compliance solutions - from registration to monthly/quarterly returns. Stay compliant, avoid penalties.",
    icon: "Receipt",
    features: [
      "GST Registration",
      "GSTR-1, GSTR-3B Filing",
      "GST Annual Returns",
      "E-way Bill Generation",
      "GST Reconciliation",
      "Input Tax Credit Optimization",
    ],
    pricing: {
      basic: { price: 1499, label: "Monthly Filing", features: ["GSTR-1 & GSTR-3B", "Up to 50 invoices", "Reconciliation", "Email support"] },
      standard: { price: 2999, label: "Quarterly Package", features: ["All monthly + GSTR-9", "Up to 200 invoices", "ITC optimization", "Phone support"] },
      premium: { price: 7999, label: "Annual Package", features: ["Complete GST compliance", "Unlimited invoices", "Audit support", "Dedicated manager"] },
    },
    targetAudience: ["Small Businesses", "Traders", "Startups"],
  },
  {
    id: "audit",
    title: "Statutory & Tax Audit",
    shortTitle: "Audit Services",
    description: "Comprehensive audit services by qualified Chartered Accountants. Ensure compliance and build stakeholder confidence.",
    icon: "ClipboardCheck",
    features: [
      "Statutory Audit",
      "Tax Audit (44AB)",
      "Internal Audit",
      "Stock Audit",
      "Concurrent Audit",
      "Forensic Audit",
    ],
    pricing: {
      basic: { price: 15000, label: "Small Business Audit", features: ["Turnover up to ₹1 Cr", "Tax Audit", "Audit Report", "Basic compliance"] },
      standard: { price: 35000, label: "Medium Business", features: ["Turnover ₹1-5 Cr", "Statutory + Tax Audit", "Management letter", "Quarterly reviews"] },
      premium: { price: 75000, label: "Corporate Audit", features: ["Turnover above ₹5 Cr", "Full audit suite", "Board presentations", "Year-round support"] },
    },
    targetAudience: ["Companies", "LLPs", "Firms"],
  },
  {
    id: "bookkeeping",
    title: "Bookkeeping & Accounting",
    shortTitle: "Bookkeeping",
    description: "Outsource your accounting to experts. Focus on growing your business while we handle the numbers.",
    icon: "Calculator",
    features: [
      "Daily transaction recording",
      "Bank reconciliation",
      "Accounts payable/receivable",
      "Financial statements",
      "MIS Reports",
      "Payroll processing",
    ],
    pricing: {
      basic: { price: 4999, label: "Starter", features: ["Up to 100 transactions/month", "Monthly reports", "Bank reconciliation", "Email support"] },
      standard: { price: 9999, label: "Growth", features: ["Up to 300 transactions", "Weekly reports", "Payroll (up to 10)", "Phone support"] },
      premium: { price: 19999, label: "Enterprise", features: ["Unlimited transactions", "Daily reports", "Full payroll", "Dedicated accountant"] },
    },
    targetAudience: ["SMEs", "Startups", "Professionals"],
  },
  {
    id: "advisory",
    title: "Tax Planning & Advisory",
    shortTitle: "Tax Advisory",
    description: "Strategic tax planning to minimize liability and maximize savings. Personalized advice from experienced CAs.",
    icon: "TrendingUp",
    features: [
      "Tax planning strategies",
      "Investment advisory",
      "Business structuring",
      "Succession planning",
      "Wealth management",
      "Risk assessment",
    ],
    pricing: {
      basic: { price: 5000, label: "Personal Tax Planning", features: ["One consultation", "Tax optimization plan", "Investment guidance", "Email follow-up"] },
      standard: { price: 15000, label: "Business Advisory", features: ["Quarterly reviews", "Business structuring", "Compliance calendar", "Phone support"] },
      premium: { price: 50000, label: "Annual Retainer", features: ["Unlimited consultations", "Complete tax planning", "Legal liaison", "24/7 support"] },
    },
    targetAudience: ["HNIs", "Business Owners", "Professionals"],
  },
  {
    id: "international",
    title: "International Taxation",
    shortTitle: "NRI/International",
    description: "Specialized services for NRIs and international businesses. Navigate complex cross-border tax regulations.",
    icon: "Globe",
    features: [
      "NRI taxation",
      "DTAA benefits",
      "FEMA compliance",
      "Transfer pricing",
      "Foreign remittance",
      "Overseas investment advisory",
    ],
    pricing: {
      basic: { price: 4999, label: "NRI ITR Filing", features: ["NRI tax return", "DTAA application", "TDS refund", "Email support"] },
      standard: { price: 15000, label: "FEMA Compliance", features: ["Full FEMA review", "RBI filings", "Asset declarations", "Phone support"] },
      premium: { price: 50000, label: "Corporate International", features: ["Transfer pricing", "Cross-border structuring", "Ongoing compliance", "Dedicated team"] },
    },
    targetAudience: ["NRIs", "Foreign Companies", "Indian MNCs"],
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "Business Owner",
    company: "Sharma Enterprises",
    image: "/testimonials/1.jpg",
    content: "CA Ronak Agrawal has been handling our taxation and audit. Their proactive approach to tax planning has saved us lakhs every year. Highly professional!",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "NRI - Software Engineer",
    company: "Based in USA",
    image: "/testimonials/2.jpg",
    content: "As an NRI, managing Indian taxes was always stressful. CA Ronak Agrawal made it seamless with expertise in international taxation and FEMA compliance.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Startup Founder",
    company: "TechStart Solutions",
    image: "/testimonials/3.jpg",
    content: "From company registration to GST and compliance, CA Ronak Agrawal has been our one-stop solution. Understands startup needs and offers flexible packages.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha Gupta",
    role: "Freelance Consultant",
    company: "Self-employed",
    image: "/testimonials/4.jpg",
    content: "Filing ITR as a freelancer was confusing until I found CA Ronak Agrawal. Helped me structure my income properly and claim all eligible deductions.",
    rating: 5,
  },
];

export const STATS = [
  { value: "500+", label: "Clients Served" },
  { value: "5+", label: "Years Experience" },
  { value: "₹5Cr+", label: "Tax Saved" },
  { value: "99%", label: "Client Satisfaction" },
];

export const FAQ = [
  {
    question: "How do I get started?",
    answer: "Simply fill out our inquiry form or call us. We'll schedule a free consultation to understand your needs and recommend the right services.",
  },
  {
    question: "What documents do I need for ITR filing?",
    answer: "For salaried individuals: Form 16, bank statements, investment proofs. For business: P&L statement, balance sheet, GST returns. We'll provide a detailed checklist based on your situation.",
  },
  {
    question: "Do you offer services for NRIs?",
    answer: "Yes! We specialize in NRI taxation including ITR filing, DTAA benefits, FEMA compliance, and overseas investment advisory. Everything can be done remotely.",
  },
  {
    question: "What is your payment policy?",
    answer: "We follow a 100% upfront payment model for standard services. For large engagements, we offer milestone-based payments. All payments are secured through Razorpay/Stripe.",
  },
  {
    question: "How do you ensure data security?",
    answer: "We use bank-grade encryption for all data transfers. Your documents are stored securely and never shared with third parties. We're compliant with data protection regulations.",
  },
  {
    question: "Can you handle income tax notices?",
    answer: "Absolutely. Our team has extensive experience in handling all types of income tax notices, scrutiny assessments, and appeals. We'll represent you before the authorities.",
  },
];

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

