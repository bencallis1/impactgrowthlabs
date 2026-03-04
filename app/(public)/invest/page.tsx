import type { Metadata } from "next";
import { InvestorInquiryForm } from "@/components/forms/InvestorInquiryForm";
import { TrendingUp, Shield, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Investor Inquiry",
  description: "Partner with Impact Growth Labs as an LP or co-investor in our impact venture portfolio.",
};

const highlights = [
  {
    icon: TrendingUp,
    title: "Strong Returns",
    body: "Our Fund I portfolio has returned 2.4x DPI with strong unrealized value across active holdings.",
  },
  {
    icon: Shield,
    title: "Rigorous Selection",
    body: "We review 300+ companies per year and invest in fewer than 2% — only those with clear impact and commercial potential.",
  },
  {
    icon: Globe,
    title: "Global Network",
    body: "Access to deal flow across North America, EMEA, and Southeast Asia with deep local ecosystem relationships.",
  },
];

export default function InvestPage() {
  return (
    <div className="min-h-screen bg-[color:var(--color-cream)] pt-28 pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[color:var(--color-gold)] text-sm font-medium tracking-widest uppercase mb-4">
              Investors
            </p>
            <h1 className="font-serif text-5xl text-[color:var(--color-indigo)] mb-6 leading-tight">
              Invest in what matters
            </h1>
            <p className="text-lg text-[color:var(--color-text-secondary)] mb-10 leading-relaxed">
              We work with family offices, foundations, HNW individuals, and
              institutional LPs who are serious about generating both financial
              returns and measurable impact.
            </p>

            <div className="space-y-5">
              {highlights.map((h) => {
                const Icon = h.icon;
                return (
                  <div key={h.title} className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-xl bg-[color:var(--color-indigo)] flex items-center justify-center text-[color:var(--color-gold)] shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-[color:var(--color-indigo)] mb-1">
                        {h.title}
                      </p>
                      <p className="text-sm text-[color:var(--color-text-secondary)] leading-relaxed">
                        {h.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-xl bg-[color:var(--color-indigo)] p-5 text-[color:var(--color-text-on-dark)]">
              <p className="text-xs text-[color:var(--color-gold)] uppercase tracking-wider mb-2">
                Already an LP?
              </p>
              <p className="text-sm text-[color:var(--color-text-on-dark-secondary)]">
                Access your portfolio data, reports, and impact dashboard in the{" "}
                <a
                  href="/portal"
                  className="text-[color:var(--color-gold)] underline"
                >
                  Investor Portal
                </a>
                .
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-2xl bg-[#ffffff] border border-[color:var(--color-border-light)] p-8 shadow-sm">
            <h2 className="font-serif text-2xl text-[color:var(--color-indigo)] mb-8">
              Investor inquiry
            </h2>
            <InvestorInquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
