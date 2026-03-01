"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const jobsData = [
  { quarter: "Q1 '24", jobs: 5200 },
  { quarter: "Q2 '24", jobs: 6100 },
  { quarter: "Q3 '24", jobs: 7300 },
  { quarter: "Q4 '24", jobs: 8400 },
];

const capitalData = [
  { quarter: "Q1 '24", deployed: 32, returned: 4 },
  { quarter: "Q2 '24", deployed: 38, returned: 6 },
  { quarter: "Q3 '24", deployed: 44, returned: 8 },
  { quarter: "Q4 '24", deployed: 50, returned: 12 },
];

const emissionsData = [
  { month: "Sep", avoided: 140 },
  { month: "Oct", avoided: 162 },
  { month: "Nov", avoided: 178 },
  { month: "Dec", avoided: 195 },
  { month: "Jan", avoided: 210 },
  { month: "Feb", avoided: 228 },
];

export function JobsChart() {
  return (
    <div className="rounded-xl bg-white border border-gray-100 p-6">
      <h3 className="font-semibold text-[#1A3A2E] mb-1">Jobs Created</h3>
      <p className="text-sm text-[#0F1A14]/50 mb-6">Cumulative across portfolio</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={jobsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="quarter" tick={{ fontSize: 12, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="jobs"
            stroke="#52B788"
            strokeWidth={2.5}
            dot={{ fill: "#1A3A2E", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CapitalChart() {
  return (
    <div className="rounded-xl bg-white border border-gray-100 p-6">
      <h3 className="font-semibold text-[#1A3A2E] mb-1">Capital ($M)</h3>
      <p className="text-sm text-[#0F1A14]/50 mb-6">Deployed vs. returned</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={capitalData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="quarter" tick={{ fontSize: 12, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Bar dataKey="deployed" fill="#1A3A2E" radius={[4, 4, 0, 0]} />
          <Bar dataKey="returned" fill="#95D5B2" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EmissionsChart() {
  return (
    <div className="rounded-xl bg-white border border-gray-100 p-6">
      <h3 className="font-semibold text-[#1A3A2E] mb-1">Emissions Avoided</h3>
      <p className="text-sm text-[#0F1A14]/50 mb-6">tCO₂e per month (trailing 6)</p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={emissionsData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} />
          <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} />
          <Tooltip
            contentStyle={{
              borderRadius: "8px",
              border: "1px solid #e5e7eb",
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="avoided"
            stroke="#2D6A4F"
            strokeWidth={2.5}
            dot={{ fill: "#52B788", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
