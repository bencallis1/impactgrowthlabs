"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader2, Lock } from "lucide-react";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setError("");
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      window.location.href = "/portal";
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="mx-auto mb-4 h-14 w-14 rounded-full bg-[#1A3A2E] flex items-center justify-center">
            <Lock size={22} className="text-[#95D5B2]" />
          </div>
          <h1 className="font-serif text-3xl text-[#1A3A2E] mb-2">
            Investor Portal
          </h1>
          <p className="text-sm text-[#0F1A14]/50">
            Impact Growth Labs · Restricted Access
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-gray-100 p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#1A3A2E] mb-1.5">
                Email
              </label>
              <input
                {...register("email")}
                type="email"
                autoComplete="email"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:border-[#52B788] focus:outline-none focus:ring-2 focus:ring-[#52B788]/20 transition-all"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1A3A2E] mb-1.5">
                Password
              </label>
              <input
                {...register("password")}
                type="password"
                autoComplete="current-password"
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm placeholder-gray-400 focus:border-[#52B788] focus:outline-none focus:ring-2 focus:ring-[#52B788]/20 transition-all"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1A3A2E] px-8 py-3.5 text-sm font-medium text-white hover:bg-[#2D6A4F] transition-colors disabled:opacity-60"
            >
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : null}
              {isSubmitting ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-[#0F1A14]/40">
          Access is restricted to invited investors.{" "}
          <a href="/invest" className="text-[#2D6A4F] hover:underline">
            Request access
          </a>
        </p>
      </div>
    </div>
  );
}
