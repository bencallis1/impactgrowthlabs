import type { Metadata } from "next";
import { Hero } from "@/components/nalanda/sections/Hero";
import { Interlude } from "@/components/nalanda/sections/Interlude";
import { FocusAreaCard } from "@/components/nalanda/sections/FocusAreaCard";
import { VentureCard } from "@/components/nalanda/sections/VentureCard";
import styles from "./VenturesPage.module.css";

export const metadata: Metadata = {
  title: "Ventures — The Nalanda Collective",
  description:
    "The ventures we back are built for all living things. A portfolio guided by Maitri and a thousand-year horizon.",
};

const focusAreas = [
  {
    title: "Living food systems",
    body:
      "Ventures reimagining how we grow, distribute, and share food — in ways that nourish soil, communities, and culture at the same time.",
    questions: [
      "What happens to this place after a hundred harvests?",
      "Who is better fed — and who might be left out?",
      "How does this restore relationship between people and land?",
    ],
  },
  {
    title: "Regenerative energy & infrastructure",
    body:
      "Founders building power, water, and mobility systems that make life gentler on the planet while expanding access for those most often excluded.",
    questions: [
      "What is the true cost of each unit of energy over a thousand years?",
      "Whose resilience increases when this infrastructure arrives?",
      "Where does this system return more than it takes?",
    ],
  },
  {
    title: "Learning, health, and inner work",
    body:
      "Companies that tend to the inner and outer conditions for human flourishing — education, mental health, care work, and the spaces between them.",
    questions: [
      "What kind of human being does this product help shape?",
      "How does this reduce suffering without creating new forms of it?",
      "What becomes possible in a community that fully receives this?",
    ],
  },
];

const ventures = [
  {
    name: "[PLACEHOLDER: portfolio company name]",
    description: "[PLACEHOLDER: one-line description of the venture]",
    stage: "[PLACEHOLDER: stage]",
    focusArea: "[PLACEHOLDER: focus area]",
    whatDrewUs:
      "[PLACEHOLDER: what drew us — 2–3 sentences in Nalanda voice]",
    founderQuote: "[TESTIMONIAL PLACEHOLDER: founder quote]",
  },
  {
    name: "[PLACEHOLDER: portfolio company name]",
    description: "[PLACEHOLDER: one-line description of the venture]",
    stage: "[PLACEHOLDER: stage]",
    focusArea: "[PLACEHOLDER: focus area]",
    whatDrewUs:
      "[PLACEHOLDER: what drew us — 2–3 sentences in Nalanda voice]",
    founderQuote: "[TESTIMONIAL PLACEHOLDER: founder quote]",
  },
  {
    name: "[PLACEHOLDER: portfolio company name]",
    description: "[PLACEHOLDER: one-line description of the venture]",
    stage: "[PLACEHOLDER: stage]",
    focusArea: "[PLACEHOLDER: focus area]",
    whatDrewUs:
      "[PLACEHOLDER: what drew us — 2–3 sentences in Nalanda voice]",
    founderQuote: "[TESTIMONIAL PLACEHOLDER: founder quote]",
  },
];

export default function VenturesPage() {
  return (
    <main className={styles.page}>
      <Hero
        eyebrow="Ventures"
        headline={"Founders building for\nall living things."}
        subheadline="We back teams who treat impact not as a marketing claim, but as the natural consequence of how they build, govern, and grow."
        secondaryLine="Named after the university that lasted 700 years. Investing with a thousand-year horizon."
        ctas={[
          {
            label: "Tell us about your work →",
            href: "/connect?type=founder",
          },
          {
            label: "Explore our philosophy →",
            href: "/philosophy",
            variant: "text",
          },
        ]}
        variant="dark"
      />

      <section className={`${styles.section} ${styles.sectionLight}`}>
        <div className={styles.inner}>
          <div className={styles.headerText}>
            <p className={styles.sectionLabel}>Where we focus</p>
            <h2 className={styles.sectionTitle}>
              Three doors into the same story.
            </h2>
            <p className={styles.sectionBody}>
              We do not chase every theme that trends. We return, again and
              again, to a small set of questions: How does this venture change
              the relationship between people and planet? What remains for the
              seventh generation? Where is there already quiet, patient work
              happening that deserves to be amplified?
            </p>
          </div>

          <div className={styles.gridFocusAreas}>
            {focusAreas.map((area, index) => (
              <FocusAreaCard
                key={area.title}
                title={area.title}
                body={area.body}
                questions={area.questions}
                delay={index * 120}
              />
            ))}
          </div>
        </div>
      </section>

      <Interlude
        quote={"Everything is connected.\nWe invest accordingly."}
        accentWords={["We invest accordingly."]}
        subtext="This is not a slogan. It is our underwriting criteria."
        variant="indigo"
      />

      <section className={`${styles.section} ${styles.sectionWhite}`}>
        <div className={styles.inner}>
          <div className={styles.headerText}>
            <p className={styles.sectionLabel}>The portfolio</p>
            <h2 className={styles.sectionTitle}>
              A living ledger of relationship.
            </h2>
            <p className={styles.sectionBody}>
              The ventures we back are not transactions on a cap table. They
              are long-standing relationships with people who are willing to
              build slowly, coherently, and with deep accountability to all
              living things. The examples below are placeholders — this canvas
              is ready for the real stories.
            </p>
          </div>

          <div className={styles.gridVentures}>
            {ventures.map((venture, index) => (
              <VentureCard
                key={venture.name + index.toString()}
                name={venture.name}
                description={venture.description}
                stage={venture.stage}
                focusArea={venture.focusArea}
                whatDrewUs={venture.whatDrewUs}
                founderQuote={venture.founderQuote}
                delay={index * 120}
              />
            ))}
          </div>

          <p className={styles.placeholderNote}>
            All names and details above are placeholders. Replace with real
            portfolio data before launch.
          </p>
        </div>
      </section>
    </main>
  );
}

