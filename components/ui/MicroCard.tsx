"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { forwardRef } from "react";
import {
    Leaf,
    Heart,
    GraduationCap,
    Recycle,
    BarChart3,
    Target,
    CheckCircle,
  } from "lucide-react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  loading?: boolean;
}

// ── Data ─────────────────────────────────────────────────────────────────────

const focusAreas = [
    {
      icon: Leaf,
      label: "Climate & Environment",
      description:
        "Decarbonisation, circular systems, and nature-based solutions.",
    },
    {
      icon: Heart,
      label: "Health & Wellbeing",
      description:
        "Accessible care, digital health, and underserved communities.",
    },
    {
      icon: GraduationCap,
      label: "Education & Mobility",
      description: "First-generation learners and workforce pathways.",
    },
    {
      icon: Recycle,
      label: "Circular Economy",
      description:
        "Waste elimination, material recovery, and regenerative supply chains.",
    },
  ];

export function MicroCard({ focusAreas }: { focusAreas: PortfolioCompany }) {
  
  
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {focusAreas.map(({ icon: Icon, label, description }) => (
          <div
            key={label}
            className="flex gap-3 p-4 rounded-xl bg-[#F7FAF8] border border-gray-100"
          >
            <div className="shrink-0 mt-0.5 h-8 w-8 rounded-lg bg-[#1A3A2E] flex items-center justify-center">
              <Icon size={15} className="text-[#52B788]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1A3A2E] mb-0.5">
                {label}
              </p>
              <p className="text-xs text-[#0F1A14]/60 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
