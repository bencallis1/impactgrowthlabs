import { FadeIn } from "@/components/nalanda/ui/FadeIn";
import styles from "./FocusAreaCard.module.css";

interface FocusAreaCardProps {
  title: string;
  body: string;
  questions?: string[];
  delay?: number;
}

export function FocusAreaCard({
  title,
  body,
  questions = [],
  delay = 0,
}: FocusAreaCardProps) {
  return (
    <FadeIn delay={delay}>
      <div className={styles.card}>
        <div className={styles.accent} aria-hidden="true" />
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.body}>{body}</p>
        {questions.length > 0 && (
          <div className={styles.questions}>
            <p className={styles.questionsLabel}>We ask:</p>
            <ul className={styles.questionsList}>
              {questions.map((q) => (
                <li key={q} className={styles.question}>
                  {q}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </FadeIn>
  );
}

