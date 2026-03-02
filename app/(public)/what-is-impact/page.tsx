import type { Metadata } from "next";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import {
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "What is Impact?",
  description:
    "Impact investing means generating measurable positive outcomes for people and planet — alongside financial returns. Explore our philosophy, focus areas, and measurement framework.",
};



const measurementPillars = [
  {
    title: "Theory of Change Development",
    body: "a clearly articulated pathway from business activity to measurable outcome to long-term systemic shift",
  },
  {
    title: "CERT Tech Impact Measurement",
    body: "eal-time impact verification tools that go far beyond quarterly self-reporting",
  },
  {
    title: "Bronze and Silver Impact Certification",
    body: "independent, third-party verification of impact claims at each program stage",
  },
  {
    title: "Ongoing Impact Mentorship",
    body: "guidance from practitioners with over 30 years of hands-on impact project experience across four continents",
  },
];

const practiceStats = [
  { value: "$48M+", label: "Capital deployed" },
  { value: "24", label: "Active portfolio companies" },
  { value: "2.4M", label: "Tonnes of CO₂ avoided" },
  { value: "145K+", label: "Lives directly reached" },
  { value: "6", label: "Countries of operation" },
  { value: "100%", label: "SDG-aligned investments" },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function WhatIsImpactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Hero ── */}
      <section className="relative h-[92vh] min-h-[600px] flex items-center">
        {/* Background image */}
        <Image
          src="https://imagedelivery.net/lcKdEvt7ci2YjdeNVK02Iw/f229994d-d0d8-4f43-de8d-9a6c4d63d300/Originals"
          alt="Aerial view of a lush green forest canopy"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay — deep green at bottom, semi-transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1A14]/50 via-[#0F1A14]/60 to-[#0F1A14]/80" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <AnimatedSection>
            <p className="text-[#95D5B2] text-sm font-medium tracking-widest uppercase mb-6">
              Our Philosophy
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-white max-w-3xl leading-[1.1] mb-6">
              What is
              <br />
              impact?
            </h1>
            <p className="text-white/70 text-xl max-w-xl leading-relaxed">
              Real impact isn&apos;t a compromise between doing good and doing
              well. It&apos;s the natural result of building businesses that
              solve the world&apos;s most pressing problems.
            </p>
          </AnimatedSection>
        </div>

        {/* Bottom fade into white */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── Intro ── */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-3xl mx-auto text-center">
            <p className="text-2xl sm:text-3xl font-serif text-[#1A3A2E] leading-relaxed">
              &ldquo;Impact investing&rdquo; describes the practice of deploying
              capital with the explicit intention to generate positive,
              measurable social or environmental outcomes — alongside financial
              returns.
            </p>
            <p className="mt-6 text-lg text-[#0F1A14]/60">
              At Impact Growth Labs, we believe those two goals are not in
              tension. They are the same goal.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Section 1: What impact investing is — text left, image right ── */}
      <section className="py-24 bg-[#F7FAF8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <AnimatedSection>
              <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
                More Than a Metric.
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E] mb-6 leading-tight">
                A Way of Building.
                <br />
                with purpose
              </h2>
              <div className="space-y-4 text-[#0F1A14]/70 text-lg leading-relaxed">
                <p>
                  Impact investing has become a widely used phrase — but for us,
                  it describes something more fundamental than an investment
                  category or a reporting framework. At BGSImpact, impact means
                  building ventures that create measurable, positive change in
                  the world as a direct result of how they operate, not as an
                  afterthought. We believe that entrepreneurs who set out to
                  solve humanity's greatest challenges — in health, education,
                  energy, the environment, and beyond — are building the most
                  important companies of this generation.
                </p>
                <p>
                  And with the right support, they can also build the most
                  profitable ones. We don't ask founders to choose between
                  financial ambition and meaningful purpose. Through our
                  Risk-Return-Impact model, we help them demonstrate that these
                  goals are not in tension — they are the same goal, pursued
                  together.
                </p>
              </div>
            </AnimatedSection>

            {/* Image */}
            <AnimatedSection delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src="https://imagedelivery.net/lcKdEvt7ci2YjdeNVK02Iw/ae414f8e-27f1-4ce4-273a-7b72e2531700/Originals"
                  alt="Team collaborating around a table, engaged in purposeful discussion"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Subtle brand overlay */}
                <div className="absolute inset-0 bg-[#1A3A2E]/10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Section 2: Our impact thesis — image left, text right ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image — appears first on mobile, left on desktop */}
            <AnimatedSection delay={0.1} className="order-2 lg:order-1">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src="https://imagedelivery.net/lcKdEvt7ci2YjdeNVK02Iw/f229994d-d0d8-4f43-de8d-9a6c4d63d300/Originals"
                  alt="Hands cradling a green plant, symbolising environmental stewardship"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#1A3A2E]/10" />
              </div>
            </AnimatedSection>

            {/* Text */}
            <AnimatedSection className="order-1 lg:order-2">
              <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
                The Artificial Separation
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E] mb-6 leading-tight">
                Has to End.
                {/* <br />
                thesis */}
              </h2>
              <p className="text-[#0F1A14]/70 text-lg leading-relaxed mb-8">
                For decades, traditional investing has operated from a false
                premise: that financial returns and positive impact require
                trade-offs. That purpose costs something. That doing good means
                doing less well. We've seen the evidence — in our own portfolio
                and across the broader landscape — that this isn't true.
                Businesses that solve real problems tend to attract
                mission-aligned talent, build more durable competitive
                advantages, and operate in sectors with powerful societal
                tailwinds. The most important markets of the next century are
                defined by the world's most urgent challenges: clean energy,
                food security, accessible healthcare, economic inclusion. The
                entrepreneurs who address these challenges early, with the right
                capital and operational support behind them, don't just make the
                world better — they build exceptional businesses. BGSImpact
                exists to prove this, one company at a time.
              </p>
              

            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Section 3: How we measure impact — text left, image right ── */}
      <section className="py-24 bg-[#F7FAF8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text */}
            <AnimatedSection>
              <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
                An Impact Claim Without Evidence Is Just Marketing.
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E] mb-6 leading-tight">
                How we measure
                <br />
                what matters
              </h2>
              <p className="text-[#0F1A14]/70 text-lg leading-relaxed mb-8">
                We hold ourselves and the ventures we support to a rigorous
                standard of impact measurement — not because investors demand it
                (though they do), but because measurement is how we learn,
                improve, and demonstrate truth.
              </p>

              <p className="text-[#0F1A14]/70 text-lg leading-relaxed mb-8">Every venture in our programs works through our Risk-Return-Impact curriculum, which provides:</p>
              <div className="space-y-4">
                {measurementPillars.map((pillar) => (
                  <div key={pillar.title} className="flex gap-4">
                    <CheckCircle
                      size={20}
                      className="shrink-0 mt-0.5 text-[#52B788]"
                    />
                    <div>
                      <p className="font-semibold text-[#1A3A2E] mb-0.5">
                        {pillar.title}
                      </p>
                      <p className="text-sm text-[#0F1A14]/60 leading-relaxed">
                        {pillar.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[#0F1A14]/70 text-lg leading-relaxed mt-8 mb-8">We believe the next generation of impact measurement will be defined by real-time transparency and independent verification — not by sanitized reports and vague sustainability claims. We're building toward that future, and we invite the ventures we work with to lead the way.</p>

            </AnimatedSection>

            {/* Image */}
            <AnimatedSection delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image
                  src="https://imagedelivery.net/lcKdEvt7ci2YjdeNVK02Iw/0c736f2c-ef12-45e5-2566-bf79ae470700/Originals"
                  alt="Data analytics dashboard showing impact metrics and performance charts"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-[#1A3A2E]/10" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Section 4: Impact in practice — dark metrics band ── */}
      {/* <section className="py-24 bg-[#1A3A2E]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BarChart3 size={18} className="text-[#52B788]" />
              <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase">
                Impact in Practice
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">
              Numbers that reflect<br />what we stand for
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              Across our portfolio, these are the outcomes generated since
              our first investment in 2020.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden">
              {practiceStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#1A3A2E] px-8 py-10 text-center hover:bg-[#2D6A4F]/40 transition-colors"
                >
                  <p className="font-serif text-4xl sm:text-5xl text-[#52B788] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-white/60 uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2} className="mt-12 text-center">
            <p className="text-white/40 text-sm">
              Data reflects portfolio activity as of December 2024. Impact figures
              are self-reported by portfolio companies and independently reviewed
              annually.
            </p>
          </AnimatedSection>
        </div>
      </section> */}

      {/* ── CTA ── */}
      {/* <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-2xl">
            <p className="text-[#52B788] text-sm font-medium tracking-widest uppercase mb-4">
              Join the Conversation
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1A3A2E] mb-6">
              Ready to explore what impact means for your work?
            </h2>
            <p className="text-lg text-[#0F1A14]/60 mb-8 leading-relaxed">
              Whether you&apos;re a founder building for impact or an investor
              seeking alignment between values and returns, we&apos;d welcome
              the conversation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/apply"
                className="inline-flex items-center gap-2 rounded-full bg-[#1A3A2E] px-6 py-3 text-sm font-medium text-white hover:bg-[#2D6A4F] transition-colors"
              >
                Apply as a founder
              </a>
              <a
                href="/case-studies"
                className="inline-flex items-center gap-2 rounded-full border border-[#1A3A2E] px-6 py-3 text-sm font-medium text-[#1A3A2E] hover:bg-[#F7FAF8] transition-colors"
              >
                Explore our work
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section> */}
    </div>
  );
}
