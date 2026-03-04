import type { Metadata } from "next";
import { CheckCircle } from "lucide-react";
import { Hero } from "@/components/nalanda/sections/Hero";
import { SectionWrapper } from "@/components/nalanda/sections/SectionWrapper";
import { SectionHeader } from "@/components/nalanda/sections/SectionHeader";
import { FadeIn } from "@/components/nalanda/ui/FadeIn";

export const metadata: Metadata = {
  title: "What is Impact?",
  description:
    "Impact is not a marketing category. It is a way of building with coherence, accountability, and loving kindness toward all living things.",
};

const measurementPillars = [
  {
    title: "Clarity of change",
    body: "A clearly articulated path from business activity to measurable outcome to long-horizon systemic shift.",
  },
  {
    title: "Truthful data",
    body: "Evidence that is specific, verifiable, and updated as the work evolves — not just annual reports.",
  },
  {
    title: "Coherence checks",
    body: "Regular audits of whether mission, method, and capital structure are still in alignment.",
  },
  {
    title: "Listening to the field",
    body: "Structured feedback from the people and places most affected by the work, not only investors.",
  },
];

export default function WhatIsImpactPage() {
  return (
    <main>
      <Hero
        eyebrow="Our philosophy"
        headline={"What impact really\nasks of us."}
        subheadline="The challenges facing people and the living world are serious, specific, and already here. Impact is not a marketing category; it is a way of building with coherence and accountability to all living things."
        secondaryLine="Named after the university that lasted 700 years. Guided by Maitri (मैत्री) — unconditional loving kindness toward all living things."
        ctas={[
          { label: "Explore our work →", href: "/ventures" },
          {
            label: "Tell us about your work →",
            href: "/apply",
            variant: "text",
          },
        ]}
        variant="light"
      />

      <SectionWrapper variant="cream" narrow>
        <FadeIn>
          <p>
            “Impact investing” describes the practice of deploying capital with
            the explicit intention to generate positive, measurable social or
            environmental outcomes — alongside financial returns. The Nalanda
            Collective treats those outcomes not as a trade-off, but as a test
            of coherence between mission and method.
          </p>
        </FadeIn>
      </SectionWrapper>

      <SectionWrapper variant="cream">
        <div className="grid-split">
          <div>
            <SectionHeader
              eyebrow="More than a metric"
              headline={"Impact as a way\nof building."}
              subhead="Impact is not a reporting framework layered on top of an otherwise extractive model. It is the natural result of how a venture is designed, governed, and scaled."
              align="left"
              variant="light"
            />
            <FadeIn>
              <p>
                Impact investing has become a widely used phrase — but for us,
                it names something more fundamental than a category of funds. It
                is a commitment to build ventures that create measurable,
                positive change in the world as a direct consequence of how
                they operate, not as an afterthought.
              </p>
              <p>
                When founders design from this premise, questions about impact
                are not a compliance exercise. They are design constraints:
                Who is served? What is restored? What remains for the seventh
                generation? The answers shape everything from product to
                capital structure.
              </p>
            </FadeIn>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="cream">
        <div className="grid-split">
          <div>
            <SectionHeader
              eyebrow="The artificial separation"
              headline={"Returns and impact\nare not opposites."}
              subhead="For decades, capital has operated as if doing good and doing well were in tension. The evidence — and Nalanda’s precedent — suggest otherwise."
              align="left"
              variant="light"
            />
            <FadeIn>
              <p>
                Traditional investing has often assumed that financial returns
                and positive impact require trade-offs. That purpose is a cost
                centre. That doing good means doing less well. Our experience —
                and the broader landscape — suggest that this framing is
                incomplete at best.
              </p>
              <p>
                Ventures that solve real problems tend to attract
                mission-aligned talent, build more durable advantages, and
                operate in sectors with powerful societal tailwinds. Clean
                energy, regenerative food systems, accessible healthcare,
                economic inclusion — the markets that matter most over the next
                century are defined by the challenges we are all already
                living with. Founders who address those challenges early, with
                coherent capital and support, do not have to choose between
                impact and return.
              </p>
            </FadeIn>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper variant="cream">
        <div className="grid-split">
          <div>
            <SectionHeader
              eyebrow="Evidence, not aspiration"
              headline={"How we measure\nwhat matters."}
              subhead="An impact claim without evidence is just marketing. Measurement is how we learn, adjust, and stay honest about what our work is actually doing in the world."
              align="left"
              variant="light"
            />
            <FadeIn>
              <p>
                We hold ourselves — and the founders we work with — to a
                rigorous standard of impact measurement. Not because investors
                demand it, but because truth-telling is the only reliable
                foundation for long-horizon work.
              </p>
              <p>
                Every venture we partner with works through a shared
                measurement practice that includes:
              </p>
              <ul>
                {measurementPillars.map((pillar) => (
                  <li key={pillar.title}>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <CheckCircle
                        size={20}
                        style={{ flexShrink: 0, marginTop: "0.25rem" }}
                      />
                      <div>
                        <p>{pillar.title}</p>
                        <p>{pillar.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <p>
                We believe the next generation of impact measurement will be
                defined by real-time transparency and independent verification,
                not by polished reports and vague sustainability claims. We are
                building toward that future — and we invite the ventures we
                work with to lead, and learn, alongside us.
              </p>
            </FadeIn>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}

