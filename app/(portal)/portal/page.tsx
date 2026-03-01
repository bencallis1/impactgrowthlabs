import type { Metadata } from "next";
import { getPortfolioCompanies } from "@/lib/contentful";
import { PortfolioCard } from "@/components/portal/PortfolioCard";
import { auth } from "@/auth";

export const metadata: Metadata = { title: "Portfolio | Investor Portal" };

export default async function PortalPage() {
  const [session, companies] = await Promise.all([
    auth(),
    getPortfolioCompanies(),
  ]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#1A3A2E] mb-1">
          Welcome back{session?.user?.name ? `, ${session.user.name}` : ""}
        </h1>
        <p className="text-sm text-[#0F1A14]/50">
          Portfolio overview · {companies.length} companies
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Portfolio Companies", value: companies.length },
          { label: "Capital Deployed", value: "$50M+" },
          { label: "Jobs Created", value: "8,400+" },
          { label: "Avg. Multiple", value: "2.4x" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl bg-white border border-gray-100 p-5"
          >
            <p className="text-2xl font-semibold text-[#1A3A2E] mb-1">
              {stat.value}
            </p>
            <p className="text-xs text-[#0F1A14]/50">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Portfolio grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {companies.map((company) => (
          <PortfolioCard key={company.sys.id} company={company} />
        ))}
      </div>
    </div>
  );
}
