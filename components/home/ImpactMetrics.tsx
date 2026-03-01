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
    label: "Philanthropic Initiative",
    description: "The more we make, the more we give",
  },
  {
    value: 10,
    suffix: "",
    label: "SDGs Addressed",
    description: "UN Sustainable Development Goals",
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
    <section className="bg-[#1A3A2E] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-[#95D5B2] text-sm font-medium tracking-widest uppercase mb-4">
            Our Impact
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-white">
            Numbers that matter
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1A3A2E] px-8 py-12 text-center"
            >
              <div className="text-4xl sm:text-5xl font-serif text-white mb-2">
                <AnimatedNumber value={metric.value} suffix={metric.suffix} />
              </div>
              <div className="text-[#95D5B2] font-medium mb-1">
                {metric.label}
              </div>
              <div className="text-white/40 text-sm">{metric.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
