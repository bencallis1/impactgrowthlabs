import type { Metadata } from "next";
import { JobsChart, CapitalChart, EmissionsChart } from "@/components/portal/ImpactChart";
import { Leaf, Users, DollarSign } from "lucide-react";

export const metadata: Metadata = { title: "Impact | Investor Portal" };

const kpis = [
  { icon: Users, label: "Jobs Created", value: "8,400+", change: "+14% QoQ" },
  { icon: DollarSign, label: "Capital Deployed", value: "$50M", change: "+$6M this quarter" },
  { icon: Leaf, label: "tCO₂e Avoided", value: "228K", change: "+18 this month" },
];

export default function ImpactPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-[#1A3A2E] mb-1">Impact Dashboard</h1>
        <p className="text-sm text-[#0F1A14]/50">
          Aggregate impact metrics across the portfolio · Updated monthly
        </p>
      </div>

      {/* KPI summary row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="rounded-xl bg-white border border-gray-100 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-lg bg-[#1A3A2E] flex items-center justify-center text-[#95D5B2]">
                  <Icon size={16} />
                </div>
                <p className="text-xs text-[#0F1A14]/50 font-medium">
                  {kpi.label}
                </p>
              </div>
              <p className="text-3xl font-semibold text-[#1A3A2E] mb-1">
                {kpi.value}
              </p>
              <p className="text-xs text-[#52B788] font-medium">{kpi.change}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <JobsChart />
        <CapitalChart />
        <div className="lg:col-span-2">
          <EmissionsChart />
        </div>
      </div>

      <p className="mt-6 text-xs text-[#0F1A14]/30 text-center">
        Data shown is for illustrative purposes. Full audited impact reports available in the Reports section.
      </p>
    </div>
  );
}
