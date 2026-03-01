import type { Metadata } from "next";
import { FounderApplicationForm } from "@/components/forms/FounderApplicationForm";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Apply as a Founder",
  description: "Apply to partner with Impact Growth Labs. We back mission-driven founders from day zero.",
};

const benefits = [
  "Pre-seed to Series A investment ($250K–$2M initial check)",
  "Embedded studio support — product, GTM, hiring, and fundraising",
  "Access to 300+ impact-aligned mentors and advisors",
  "Introduction to our LP network for subsequent rounds",
  "Impact measurement framework built into your operations",
];

export default function ApplyPage() {
  return (
    <div className="min-h-screen bg-[#F7FAF8] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
              Founders
            </p>
            <h1 className="font-serif text-5xl text-[#1A3A2E] mb-6 leading-tight">
              Apply to partner with us
            </h1>
            <p className="text-lg text-[#0F1A14]/60 mb-8 leading-relaxed">
              We invest in pre-seed and seed-stage founders building companies
              at the intersection of business and meaningful impact. We read
              every application.
            </p>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#1A3A2E] uppercase tracking-wider">
                What you get
              </p>
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="text-[#52B788] mt-0.5 shrink-0"
                  />
                  <p className="text-sm text-[#0F1A14]/70">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl bg-white border border-gray-100 p-5">
              <p className="text-xs text-[#0F1A14]/40 uppercase tracking-wider mb-2">
                Response Time
              </p>
              <p className="text-sm text-[#0F1A14]/70">
                We aim to respond to every application within{" "}
                <strong className="text-[#1A3A2E]">5 business days</strong>.
                Promising applications move to a 30-minute intro call.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl bg-white border border-gray-100 p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-[#1A3A2E] mb-8">
              Your application
            </h2>
            <FounderApplicationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
