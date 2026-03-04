import { FadeIn } from "@/components/nalanda/ui/FadeIn";
import styles from "./Interlude.module.css";

interface InterludeProps {
  quote: string;
  accentWords?: string[];
  subtext?: string;
  variant?: "indigo" | "forest";
}

export function Interlude({
  quote,
  accentWords = [],
  subtext,
  variant = "indigo",
}: InterludeProps) {
  const highlightedQuote = accentWords.reduce((text, word) => {
    return text.replace(
      word,
      `<em class="gold">${word}</em>`,
    );
  }, quote);

  return (
    <div className={`${styles.interlude} ${styles[variant]}`}>
      <FadeIn className={styles.inner}>
        <blockquote
          className={styles.quote}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: highlightedQuote.replace(/\n/g, "<br/>"),
          }}
        />
        {subtext && <p className={styles.subtext}>{subtext}</p>}
      </FadeIn>
    </div>
  );
}

