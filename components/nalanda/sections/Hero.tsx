import { EyebrowLabel } from "@/components/nalanda/ui/EyebrowLabel";
import { Button } from "@/components/nalanda/ui/Button";
import { SectionDivider } from "@/components/nalanda/ui/SectionDivider";
import { FadeIn } from "@/components/nalanda/ui/FadeIn";
import styles from "./Hero.module.css";

interface HeroCTA {
  label: string;
  href: string;
  variant?: "contained" | "text";
}

interface HeroProps {
  eyebrow?: string;
  headline: string;
  subheadline?: string;
  secondaryLine?: string;
  ctas?: HeroCTA[];
  variant?: "light";
  showScrollIndicator?: boolean;
}

export function Hero({
  eyebrow,
  headline,
  subheadline,
  secondaryLine,
  ctas = [],
  variant = "light",
  showScrollIndicator = true,
}: HeroProps) {
  const headlineLines = headline.split("\n");

  return (
    <section className={`${styles.hero} ${styles[variant]}`}>
      <div className={styles.inner}>
        <FadeIn>
          {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}

          <h1 className={styles.headline}>
            {headlineLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < headlineLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {subheadline && (
            <p className={styles.subheadline}>{subheadline}</p>
          )}

          {secondaryLine && (
            <>
              <SectionDivider width="medium" className={styles.divider} />
              <p className={styles.secondaryLine}>{secondaryLine}</p>
            </>
          )}

          {ctas.length > 0 && (
            <div className={styles.ctas}>
              {ctas.map((cta, i) => (
                <Button
                  key={cta.href}
                  href={cta.href}
                  variant={cta.variant || (i === 0 ? "contained" : "text")}
                >
                  {cta.label}
                </Button>
              ))}
            </div>
          )}
        </FadeIn>
      </div>

      {showScrollIndicator && (
        <div className={styles.scrollIndicator} aria-hidden="true">
          <span className={styles.scrollText}>Scroll</span>
          <div className={styles.scrollLine} />
        </div>
      )}
    </section>
  );
}

