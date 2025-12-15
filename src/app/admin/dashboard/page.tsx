"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  Settings,
  Bell,
  LogOut,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  MoreVertical,
  Phone,
  Mail,
  Eye,
  UserPlus,
  DollarSign,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";

// Mock data
const mockStats = [
  { 
    label: "Total Revenue", 
    value: "₹4,52,000", 
    change: "+12.5%", 
    trend: "up",
    icon: DollarSign 
  },
  { 
    label: "Active Clients", 
    value: "128", 
    change: "+8", 
    trend: "up",
    icon: Users 
  },
  { 
    label: "Open Tasks", 
    value: "45", 
    change: "-5", 
    trend: "down",
    icon: FileText 
  },
  { 
    label: "Pending Leads", 
    value: "23", 
    change: "+3", 
    trend: "up",
    icon: UserPlus 
  },
];

const mockLeads = [
  { 
    id: 1, 
    name: "Vikram Singh", 
    email: "vikram@gmail.com", 
    phone: "+91 98765 43210",
    service: "ITR Filing",
    source: "Website",
    status: "new",
    createdAt: "2024-03-15T10:30:00",
  },
  { 
    id: 2, 
    name: "Meera Patel", 
    email: "meera@startup.io", 
    phone: "+91 87654 32109",
    service: "GST Registration",
    source: "WhatsApp",
    status: "contacted",
    createdAt: "2024-03-15T09:15:00",
  },
  { 
    id: 3, 
    name: "Arjun Reddy", 
    email: "arjun.r@company.com", 
    phone: "+91 76543 21098",
    service: "Tax Audit",
    source: "Referral",
    status: "qualified",
    createdAt: "2024-03-14T16:45:00",
  },
  { 
    id: 4, 
    name: "Priyanka Sharma", 
    email: "priyanka.s@nri.com", 
    phone: "+1 555 123 4567",
    service: "NRI Taxation",
    source: "Website",
    status: "proposal_sent",
    createdAt: "2024-03-14T14:20:00",
  },
  { 
    id: 5, 
    name: "Suresh Kumar", 
    email: "suresh@business.in", 
    phone: "+91 65432 10987",
    service: "Bookkeeping",
    source: "Google",
    status: "new",
    createdAt: "2024-03-14T11:00:00",
  },
];

const mockClients = [
  { 
    id: 1, 
    name: "Rajesh Sharma", 
    email: "rajesh@enterprise.com",
    company: "Sharma Enterprises",
    services: ["GST Returns", "Tax Audit"],
    status: "active",
    totalPaid: 125000,
    assignedTo: "CA Priya Sharma",
  },
  { 
    id: 2, 
    name: "Anita Verma", 
    email: "anita@techstart.io",
    company: "TechStart Solutions",
    services: ["ITR Filing", "GST Registration"],
    status: "active",
    totalPaid: 45000,
    assignedTo: "CA Amit Patel",
  },
  { 
    id: 3, 
    name: "Karan Malhotra", 
    email: "karan.m@global.com",
    company: "Global Traders",
    services: ["Bookkeeping", "Tax Advisory"],
    status: "active",
    totalPaid: 98000,
    assignedTo: "CA Sneha Gupta",
  },
];

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard", active: true },
  { icon: UserPlus, label: "Leads", href: "/admin/leads", badge: "23" },
  { icon: Users, label: "Clients", href: "/admin/clients" },
  { icon: FileText, label: "Services", href: "/admin/services" },
  { icon: CreditCard, label: "Payments", href: "/admin/payments" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: MessageSquare, label: "Messages", href: "/admin/messages", badge: "5" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminDashboard() {
  const [sidebarOpen] = useState(true);

  const getLeadStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "primary" | "secondary" | "success" | "outline"; label: string }> = {
      new: { variant: "primary", label: "New" },
      contacted: { variant: "secondary", label: "Contacted" },
      qualified: { variant: "success", label: "Qualified" },
      proposal_sent: { variant: "outline", label: "Proposal Sent" },
      converted: { variant: "success", label: "Converted" },
      lost: { variant: "outline", label: "Lost" },
    };
    const config = statusMap[status] || { variant: "outline" as const, label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top nav */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-primary-950 border-b border-primary-900 z-50">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary-700 font-bold text-xs">
                RA
              </div>
              <span className="font-bold text-white">{COMPANY_INFO.name}</span>
            </Link>
            <Badge variant="secondary" className="text-xs">Admin</Badge>
          </div>

          {/* Search */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search clients, leads, services..."
                className="w-full pl-10 pr-4 py-2 bg-primary-900 border border-primary-800 rounded-lg text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-300 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-700 flex items-center justify-center">
                <span className="text-sm font-medium text-white">A</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-slate-400">Super Admin</p>
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
                "flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
                item.active
                  ? "bg-primary-50 text-primary-700"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <Link href="/">
            <button className="flex items-center gap-3 px-4 py-3 w-full text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
              <LogOut className="w-5 h-5" />
              Log Out
            </button>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn(
        "pt-16 transition-all",
        sidebarOpen ? "ml-64" : "ml-0"
      )}>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
              <p className="text-slate-600">Welcome back! Here&apos;s what&apos;s happening today.</p>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
              <Button variant="primary" size="sm">
                <UserPlus className="w-4 h-4" />
                Add Client
              </Button>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {mockStats.map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      stat.trend === "up" ? "text-success-600" : "text-red-600"
                    )}>
                      {stat.trend === "up" ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent leads */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900">Recent Leads</h2>
                      <p className="text-sm text-slate-500">New inquiries that need attention</p>
                    </div>
                    <Link href="/admin/leads">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                          <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Lead</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                          <th className="text-left px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Time</th>
                          <th className="text-right px-6 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {mockLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                                  <span className="text-sm font-medium text-primary-700">
                                    {lead.name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-medium text-slate-900">{lead.name}</p>
                                  <p className="text-sm text-slate-500">{lead.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-slate-900">{lead.service}</p>
                              <p className="text-xs text-slate-500">{lead.source}</p>
                            </td>
                            <td className="px-6 py-4">
                              {getLeadStatusBadge(lead.status)}
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-slate-500">{formatTimeAgo(lead.createdAt)}</p>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                                  <Phone className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                                  <Mail className="w-4 h-4" />
                                </button>
                                <button className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top clients */}
            <div>
              <Card>
                <CardHeader className="p-6 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Top Clients</h2>
                    <Link href="/admin/clients">
                      <Button variant="ghost" size="sm">View All</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {mockClients.map((client) => (
                      <div
                        key={client.id}
                        className="p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary-700">
                                {client.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900">{client.name}</p>
                              <p className="text-xs text-slate-500">{client.company}</p>
                            </div>
                          </div>
                          <button className="p-1 text-slate-400 hover:text-slate-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {client.services.map((service) => (
                            <Badge key={service} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-500">Total Paid</span>
                          <span className="font-medium text-slate-900">
                            ₹{client.totalPaid.toLocaleString("en-IN")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <UserPlus className="w-4 h-4" />
                      Add New Client
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <FileText className="w-4 h-4" />
                      Create Invoice
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <MessageSquare className="w-4 h-4" />
                      Send Bulk Message
                    </Button>
                    <Button variant="outline" className="w-full justify-start" size="sm">
                      <BarChart3 className="w-4 h-4" />
                      Generate Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

