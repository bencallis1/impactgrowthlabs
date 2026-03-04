import { EyebrowLabel } from "@/components/nalanda/ui/EyebrowLabel";
import { FadeIn } from "@/components/nalanda/ui/FadeIn";
import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  subhead?: string;
  align?: "left" | "center";
  variant?: "dark" | "light";
}

export function SectionHeader({
  eyebrow,
  headline,
  subhead,
  align = "left",
  variant = "light",
}: SectionHeaderProps) {
  const headlineLines = headline.split("\n");

  return (
    <FadeIn className={`${styles.header} ${styles[align]}`}>
      {eyebrow && <EyebrowLabel>{eyebrow}</EyebrowLabel>}
      <h2 className={`${styles.headline} ${styles[variant]}`}>
        {headlineLines.map((line, i) => (
          <span key={line + i.toString()}>
            {line}
            {i < headlineLines.length - 1 && <br />}
          </span>
        ))}
      </h2>
      {subhead && (
        <p className={`${styles.subhead} ${styles[variant]}`}>{subhead}</p>
      )}
    </FadeIn>
  );
}

