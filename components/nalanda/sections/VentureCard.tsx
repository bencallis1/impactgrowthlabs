import type React from "react";
import { Tag } from "@/components/nalanda/ui/Tag";
import { FadeIn } from "@/components/nalanda/ui/FadeIn";
import styles from "./VentureCard.module.css";

interface VentureCardProps {
  name: string;
  description: string;
  stage: string;
  focusArea: string;
  whatDrewUs?: string;
  founderQuote?: string;
  href?: string;
  delay?: number;
}

export function VentureCard({
  name,
  description,
  stage,
  focusArea,
  whatDrewUs,
  founderQuote,
  href,
  delay = 0,
}: VentureCardProps) {
  const CardWrapper = ({
    children,
  }: {
    children: React.ReactNode;
  }) =>
    href ? (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
      >
        {children}
      </a>
    ) : (
      <div className={styles.card}>{children}</div>
    );

  return (
    <FadeIn delay={delay}>
      <CardWrapper>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.tags}>
            <Tag variant="gold">{focusArea}</Tag>
            <Tag variant="sage">{stage}</Tag>
          </div>
        </div>
        <p className={styles.description}>{description}</p>
        {whatDrewUs && (
          <p className={styles.whatDrewUs}>{whatDrewUs}</p>
        )}
        {founderQuote && (
          <blockquote className={styles.quote}>
            “{founderQuote}”
          </blockquote>
        )}
      </CardWrapper>
    </FadeIn>
  );
}

