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
    <div className="min-h-screen bg-[color:var(--color-cream)] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[color:var(--color-gold)] text-sm font-medium tracking-widest uppercase mb-4">
              Founders
            </p>
            <h1 className="font-serif text-5xl text-[color:var(--color-indigo)] mb-6 leading-tight">
              Apply to partner with us
            </h1>
            <p className="text-lg text-[color:var(--color-text-secondary)] mb-8 leading-relaxed">
              We invest in pre-seed and seed-stage founders building companies
              at the intersection of business and meaningful impact. We read
              every application.
            </p>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[color:var(--color-indigo)] uppercase tracking-wider">
                What you get
              </p>
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle
                    size={18}
                    className="text-[color:var(--color-gold)] mt-0.5 shrink-0"
                  />
                  <p className="text-sm text-[color:var(--color-text-secondary)]">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl bg-[#ffffff] border border-[color:var(--color-border-light)] p-5">
              <p className="text-xs text-[color:var(--color-text-tertiary)] uppercase tracking-wider mb-2">
                Response Time
              </p>
              <p className="text-sm text-[color:var(--color-text-secondary)]">
                We aim to respond to every application within{" "}
                <strong className="text-[color:var(--color-indigo)]">
                  5 business days
                </strong>
                Promising applications move to a 30-minute intro call.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl bg-[#ffffff] border border-[color:var(--color-border-light)] p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-[color:var(--color-indigo)] mb-8">
              Your application
            </h2>
            <FounderApplicationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
