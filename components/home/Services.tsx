import { Zap, LineChart, Globe, Users } from "lucide-react";
import { AnimatedSection, StaggerGrid, StaggerItem } from "@/components/ui/AnimatedSection";

const services = [
  {
    icon: Zap,
    title: "Studio Model",
    description:
      "We embed with founders from day zero — co-building the product, team, and go-to-market strategy before formal funding. More than a check, we're a founding partner.",
  },
  {
    icon: LineChart,
    title: "Strategic Capital",
    description:
     "We connect mission-driven founders with aligned capital partners — from initial checks to follow-on rounds — while providing the strategic support that makes them investment-ready."
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Access to 300+ impact-aligned mentors, 40+ corporate partners actively seeking solutions, and a growing community of dedicated leaders who share learnings openly.",
  },
  {
    icon: Users,
    title: "Impact Architecture",
    description:
      "Our in-house impact team helps you define, measure, and communicate your outcomes — building investor-grade impact data from the earliest days.",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
            How We Work
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E] mb-6">
          The Moment Everything Changes.
          </h2>
          <p className="mx-auto max-w-2xl text-3xl text-[#0F1A14]/70">
          We unlock tomorrow’s possibilities for today’s most impactful companies
          </p>
        </AnimatedSection>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <StaggerItem key={service.title}>
                <div className="group relative rounded-2xl border border-gray-100 bg-[#F7FAF8] p-8 hover:border-[#52B788]/40 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                  {/* Top accent line on hover */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#52B788]/0 to-transparent group-hover:via-[#52B788]/60 transition-all duration-500" />
                  <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#1A3A2E] text-[#95D5B2] group-hover:bg-[#2D6A4F] group-hover:shadow-lg group-hover:shadow-[#1A3A2E]/20 transition-all duration-300">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1A3A2E] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[#0F1A14]/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}
