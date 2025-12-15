import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Target, Heart, Shield, Clock, Linkedin, Mail } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { STATS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about CA Ronak Agrawal - a trusted chartered accountant with 5+ years of experience serving 500+ clients across India and abroad.",
};

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description: "We maintain the highest ethical standards in all our dealings. Your trust is our most valuable asset.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for excellence in everything we do, continuously improving our services to serve you better.",
  },
  {
    icon: Heart,
    title: "Client First",
    description: "Your success is our success. We go the extra mile to ensure your financial well-being.",
  },
  {
    icon: Clock,
    title: "Timeliness",
    description: "We understand deadlines matter. We deliver on time, every time, without compromising quality.",
  },
];

const team = [
  {
    name: "CA Ronak Agrawal",
    role: "Founder & Principal CA",
    specialization: "Tax, Audit & Advisory",
    experience: "5+ years",
    image: "/team/1.jpg",
  },
];

const milestones = [
  { year: "2019", title: "Founded", description: "Started with a vision to provide accessible CA services" },
  { year: "2020", title: "100+ Clients", description: "Reached our first major milestone" },
  { year: "2021", title: "GST Expertise", description: "Became known for comprehensive GST services" },
  { year: "2023", title: "Digital First", description: "Launched fully digital service delivery platform" },
  { year: "2024", title: "500+ Clients", description: "Serving clients across India and abroad" },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container-custom relative">
            <div className="max-w-3xl">
              <Badge variant="secondary" className="mb-4">About Us</Badge>
              <h1 className="heading-1 text-white mb-6">
                Your Trusted Partner in{" "}
                <span className="text-secondary-400">Financial Excellence</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8">
                For over 5 years, we&apos;ve been helping individuals and businesses 
                navigate the complex world of taxation and compliance with expertise, 
                integrity, and personalized attention.
              </p>
            </div>
          </div>
        </section>

        {/* Stats section */}
        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary-700 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge variant="primary" className="mb-4">Our Story</Badge>
                <h2 className="heading-2 text-slate-900 mb-6">
                  From a Small Office to{" "}
                  <span className="text-gradient">Pan-India Practice</span>
                </h2>
                <div className="space-y-4 text-slate-600">
                  <p>
                    CA Ronak Agrawal started this practice in 2019 with a simple mission: to make quality 
                    chartered accountancy services accessible to everyone. What started 
                    as a small practice has grown into a trusted CA service 
                    serving clients across India and abroad.
                  </p>
                  <p>
                    Our journey has been driven by commitment to excellence and our 
                    clients&apos; trust. We&apos;ve embraced technology, offering completely 
                    digital services - from document collection to report delivery.
                  </p>
                  <p>
                    Today, we&apos;re proud to serve over 500 clients ranging from 
                    individual taxpayers to growing businesses. We bring deep expertise 
                    across taxation, audit, and advisory services.
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={milestone.year} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-700">{milestone.year}</span>
                      </div>
                      {index < milestones.length - 1 && (
                        <div className="w-0.5 h-full bg-primary-100 mt-2" />
                      )}
                    </div>
                    <div className="pb-6">
                      <h3 className="font-semibold text-slate-900">{milestone.title}</h3>
                      <p className="text-slate-600">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="section bg-slate-50">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="secondary" className="mb-4">Our Values</Badge>
              <h2 className="heading-2 text-slate-900 mb-4">
                What <span className="text-gradient">Drives Us</span>
              </h2>
              <p className="text-lg text-slate-600">
                Our core values guide everything we do - from how we interact with 
                clients to the quality of work we deliver.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <Card key={value.title} hover>
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mx-auto mb-6">
                      <value.icon className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">{value.title}</h3>
                    <p className="text-slate-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team section */}
        <section className="section bg-white">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge variant="primary" className="mb-4">Our Team</Badge>
              <h2 className="heading-2 text-slate-900 mb-4">
                Meet the <span className="text-gradient">Experts</span>
              </h2>
              <p className="text-lg text-slate-600">
                Our team of qualified Chartered Accountants brings decades of combined 
                experience across various domains of accounting and taxation.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {team.map((member) => (
                <Card key={member.name} hover>
                  <CardContent className="p-8">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary-200 to-primary-100 flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl font-bold text-primary-700">
                        RA
                      </span>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                      <p className="text-primary-600 mb-2">{member.role}</p>
                      <p className="text-slate-500 mb-1">{member.specialization}</p>
                      <p className="text-slate-400 text-sm">{member.experience} experience</p>
                    </div>
                    <div className="flex justify-center gap-3 mt-6">
                      <a href="https://www.linkedin.com/in/caronakagrawal" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="mailto:cacmaronakagrawal@gmail.com" className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-primary-100 hover:text-primary-600 transition-colors">
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-20 bg-primary-950">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Work with Us?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Let&apos;s discuss how we can help you achieve your financial goals.
              </p>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  Get in Touch
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

