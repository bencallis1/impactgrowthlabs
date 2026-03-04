"use client";

import {
  useMotionValue,
  useSpring,
  useInView,
  motion,
} from "framer-motion";
import { useEffect, useRef } from "react";

interface Metric {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const metrics: Metric[] = [
  {
    value: 500,
    suffix: "M+",
    label: "Contract Development",
    description: "Pipeline growth for our core projects",
  },
  {
    value: 11,
    suffix: "",
    label: "Active Projects",
    description: "Across 8 sectors",
  },
  {
    value: 4,
    suffix: "+",
    label: "Philanthropic Initiatives",
    description: "The more we make, the more we give",
  },
  {
    value: 10,
    suffix: "",
    label: "SDGs Addressed",
    description: "UN Sustainable Development Goals",
  },
];

// XPRIZE-style impact proof cards
const impactProofs = [
  {
    category: "FINANCIAL",
    color: "text-[#52B788]",
    borderColor: "border-[#52B788]/30",
    bgColor: "bg-[#52B788]/8",
    headline: (
      <>
        Mobilized{" "}
        <span className="text-[#52B788] font-bold">$500M+</span>{" "}
        in contract development pipeline across our portfolio companies
      </>
    ),
  },
  {
    category: "IMPACT",
    color: "text-[#95D5B2]",
    borderColor: "border-[#95D5B2]/30",
    bgColor: "bg-[#95D5B2]/8",
    headline: (
      <>
        Addressing{" "}
        <span className="text-[#95D5B2] font-bold">10 UN SDGs</span>{" "}
        through{" "}
        <span className="text-[#95D5B2] font-bold">11 active</span>{" "}
        ventures spanning 8 core verticals
      </>
    ),
  },
  {
    category: "GIVING",
    color: "text-[#52B788]",
    borderColor: "border-[#52B788]/30",
    bgColor: "bg-[#52B788]/8",
    headline: (
      <>
        Committed to{" "}
        <span className="text-[#52B788] font-bold">4+ philanthropic</span>{" "}
        initiatives — because profit and purpose are not opposites
      </>
    ),
  },
];

function AnimatedNumber({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1800, bounce: 0.05 });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent =
          value >= 1000
            ? Math.round(latest).toLocaleString() + suffix
            : Math.round(latest) + suffix;
      }
    });
  }, [spring, value, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function ImpactMetrics() {
  return (
    <section className="bg-[#0F1A14] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
            Our Impact
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">
            Numbers that matter
          </h2>
          <p className="text-white/45 max-w-xl mx-auto">
            Every figure represents real people, real ecosystems, and real returns
            — proof that doing good and doing well are the same thing.
          </p>
        </motion.div>

        {/* XPRIZE-style narrative proof cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {impactProofs.map((proof, i) => (
            <motion.div
              key={proof.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className={`rounded-2xl border ${proof.borderColor} ${proof.bgColor} p-7`}
            >
              <span className={`text-xs font-semibold tracking-widest uppercase ${proof.color} mb-4 block`}>
                {proof.category}
              </span>
              <p className="text-white/80 text-lg leading-relaxed">
                {proof.headline}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Animated counter grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0F1A14] px-8 py-12 text-center"
            >
              <div className="text-4xl sm:text-5xl font-serif text-white mb-2">
                <AnimatedNumber value={metric.value} suffix={metric.suffix} />
              </div>
              <div className="text-[#52B788] font-medium mb-1">
                {metric.label}
              </div>
              <div className="text-white/35 text-sm">{metric.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
