"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  FileText, 
  CreditCard, 
  Upload, 
  MessageSquare, 
  Settings,
  Bell,
  LogOut,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Plus
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";

// Mock data - in production this would come from an API
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 98765 43210",
  clientId: "MYC-2024-001",
};

const mockServices = [
  {
    id: 1,
    name: "ITR Filing 2023-24",
    status: "in_progress",
    progress: 60,
    lastUpdate: "2024-03-15",
    assignedTo: "CA Priya Sharma",
    nextAction: "Awaiting Form 16 upload",
  },
  {
    id: 2,
    name: "GST Registration",
    status: "completed",
    progress: 100,
    lastUpdate: "2024-02-28",
    assignedTo: "CA Amit Patel",
    nextAction: null,
  },
  {
    id: 3,
    name: "GST Returns - March 2024",
    status: "pending",
    progress: 0,
    lastUpdate: "2024-03-01",
    assignedTo: "CA Amit Patel",
    nextAction: "Starts on April 1",
  },
];

const mockDocuments = [
  { id: 1, name: "Form 16 - 2023-24", type: "pdf", uploadedAt: "2024-03-10", size: "245 KB" },
  { id: 2, name: "Bank Statement - Q4", type: "pdf", uploadedAt: "2024-03-08", size: "1.2 MB" },
  { id: 3, name: "Investment Proofs", type: "zip", uploadedAt: "2024-03-05", size: "3.5 MB" },
];

const mockPayments = [
  { id: 1, description: "ITR Filing - Premium", amount: 4999, date: "2024-03-01", status: "paid" },
  { id: 2, description: "GST Registration", amount: 1499, date: "2024-02-15", status: "paid" },
  { id: 3, description: "GST Returns - Annual", amount: 7999, date: "2024-02-01", status: "paid" },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/portal/dashboard", active: true },
  { icon: FileText, label: "My Services", href: "/portal/services" },
  { icon: Upload, label: "Documents", href: "/portal/documents" },
  { icon: CreditCard, label: "Payments", href: "/portal/payments" },
  { icon: MessageSquare, label: "Messages", href: "/portal/messages" },
  { icon: Settings, label: "Settings", href: "/portal/settings" },
];

export default function PortalDashboard() {
  const [sidebarOpen] = useState(true);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      case "in_progress":
        return <Badge variant="primary">In Progress</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-success-500" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-primary-500" />;
      case "pending":
        return <AlertCircle className="w-5 h-5 text-slate-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-700 flex items-center justify-center text-white font-bold text-xs">
                RA
              </div>
              <span className="font-bold text-slate-900">{COMPANY_INFO.name}</span>
            </Link>
            <span className="text-slate-300">|</span>
            <span className="text-slate-600">Client Portal</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700">
                  {mockUser.name.charAt(0)}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-slate-900">{mockUser.name}</p>
                <p className="text-xs text-slate-500">{mockUser.clientId}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-slate-200 transition-transform z-40",
        !sidebarOpen && "-translate-x-full"
      )}>
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                item.active
                  ? "bg-primary-50 text-primary-700"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn(
        "pt-16 transition-all",
        sidebarOpen ? "ml-64" : "ml-0"
      )}>
        <div className="p-8">
          {/* Welcome section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Welcome back, {mockUser.name.split(" ")[0]}!
            </h1>
            <p className="text-slate-600">
              Here&apos;s an overview of your services and recent activity.
            </p>
          </div>

          {/* Stats cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { label: "Active Services", value: "2", color: "primary" },
              { label: "Completed", value: "1", color: "success" },
              { label: "Documents", value: "3", color: "secondary" },
              { label: "Total Paid", value: "₹14,497", color: "slate" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
                  <p className={cn(
                    "text-3xl font-bold",
                    stat.color === "primary" && "text-primary-700",
                    stat.color === "success" && "text-success-600",
                    stat.color === "secondary" && "text-secondary-600",
                    stat.color === "slate" && "text-slate-900"
                  )}>
                    {stat.value}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Services */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Your Services</h2>
                    <Link href="/services">
                      <Button variant="ghost" size="sm">
                        <Plus className="w-4 h-4" />
                        New Service
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {mockServices.map((service, index) => (
                    <div
                      key={service.id}
                      className={cn(
                        "p-6 hover:bg-slate-50 transition-colors cursor-pointer",
                        index < mockServices.length - 1 && "border-b border-slate-100"
                      )}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3">
                          {getStatusIcon(service.status)}
                          <div>
                            <h3 className="font-medium text-slate-900">{service.name}</h3>
                            <p className="text-sm text-slate-500">Assigned to: {service.assignedTo}</p>
                          </div>
                        </div>
                        {getStatusBadge(service.status)}
                      </div>
                      
                      {service.status === "in_progress" && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-slate-500">Progress</span>
                            <span className="font-medium text-slate-900">{service.progress}%</span>
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary-500 rounded-full transition-all"
                              style={{ width: `${service.progress}%` }}
                            />
                          </div>
                        </div>
                      )}

                      {service.nextAction && (
                        <div className="flex items-center gap-2 text-sm text-primary-600">
                          <AlertCircle className="w-4 h-4" />
                          {service.nextAction}
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Recent documents */}
              <Card>
                <CardHeader className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Documents</h2>
                    <Link href="/portal/documents">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {mockDocuments.slice(0, 3).map((doc) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-slate-400" />
                          <div>
                            <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                            <p className="text-xs text-slate-500">{doc.size}</p>
                          </div>
                        </div>
                        <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <Link href="/portal/documents">
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      <Upload className="w-4 h-4" />
                      Upload Document
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent payments */}
              <Card>
                <CardHeader className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Payments</h2>
                    <Link href="/portal/payments">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {mockPayments.slice(0, 3).map((payment) => (
                      <div
                        key={payment.id}
                        className="flex items-center justify-between p-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900">{payment.description}</p>
                          <p className="text-xs text-slate-500">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-slate-900">
                            ₹{payment.amount.toLocaleString("en-IN")}
                          </p>
                          <Badge variant="success" className="text-xs">Paid</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick contact */}
              <Card className="bg-primary-50 border-primary-100">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-primary-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-primary-700 mb-4">
                    Our support team is available Mon-Sat, 9AM-7PM.
                  </p>
                  <Link href="/portal/messages">
                    <Button variant="primary" className="w-full" size="sm">
                      <MessageSquare className="w-4 h-4" />
                      Send Message
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

