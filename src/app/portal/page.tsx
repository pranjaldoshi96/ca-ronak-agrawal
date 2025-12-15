"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function PortalLoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In production, this would call an auth API
    // For demo, redirect to dashboard
    window.location.href = "/portal/dashboard";

    setIsLoading(false);
  };

  return (
    <>
      <Header />
      <main className="pt-32 pb-20 bg-slate-50 min-h-screen">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <Badge variant="primary" className="mb-4">Client Portal</Badge>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-slate-600">
                {isLogin 
                  ? "Log in to access your dashboard and track your services"
                  : "Register to get started with your CA services"
                }
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Registration fields */}
                  {!isLogin && (
                    <>
                      <div>
                        <label className="label">Full Name</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="input"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label className="label">Phone Number</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">+91</span>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="input pl-12"
                            placeholder="98765 43210"
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Email */}
                  <div>
                    <label className="label">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input pl-12"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="label mb-0">Password</label>
                      {isLogin && (
                        <Link href="/portal/forgot-password" className="text-sm text-primary-600 hover:underline">
                          Forgot password?
                        </Link>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="input pl-12 pr-12"
                        placeholder="••••••••"
                        required
                        minLength={8}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    isLoading={isLoading}
                  >
                    {isLogin ? "Log In" : "Create Account"}
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </form>

                {/* Toggle login/register */}
                <div className="mt-6 text-center">
                  <p className="text-slate-600">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button
                      type="button"
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-primary-600 font-medium hover:underline"
                    >
                      {isLogin ? "Register" : "Log in"}
                    </button>
                  </p>
                </div>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-sm text-slate-500">or</span>
                  </div>
                </div>

                {/* Guest access */}
                <p className="text-center text-sm text-slate-600">
                  New here?{" "}
                  <Link href="/contact" className="text-primary-600 font-medium hover:underline">
                    Get a free consultation
                  </Link>
                </p>
              </CardContent>
            </Card>

            {/* Help text */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Having trouble logging in?{" "}
              <Link href="/contact" className="text-primary-600 hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

