import Image from "next/image";
import type React from "react";
import { EyebrowLabel } from "@/components/nalanda/ui/EyebrowLabel";
import { FadeIn } from "@/components/nalanda/ui/FadeIn";
import { Button } from "@/components/nalanda/ui/Button";
import styles from "./DetailHero.module.css";

interface DetailHeroCTA {
  label: string;
  href: string;
}

interface DetailHeroProps {
  eyebrow?: string;
  title: string;
  summary?: string;
  imageSrc: string;
  imageAlt: string;
  cta?: DetailHeroCTA;
}

export function DetailHero({
  eyebrow,
  title,
  summary,
  imageSrc,
  imageAlt,
  cta,
}: DetailHeroProps) {
  const titleLines = title.split("\n");

  return (
    <section className={styles.hero}>
      <div className={styles.imageWrapper}>
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className={styles.image}
          sizes="100vw"
          priority
        />
      </div>

      <div className={styles.overlay}>
        <FadeIn className={styles.card}>
          {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}

          <h1 className={styles.title}>
            {titleLines.map((line, index) => (
              <span key={line + index.toString()}>
                {line}
                {index < titleLines.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {summary && <p className={styles.summary}>{summary}</p>}

          {cta && (
            <div className={styles.cta}>
              <Button href={cta.href} variant="contained">
                {cta.label}
              </Button>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

