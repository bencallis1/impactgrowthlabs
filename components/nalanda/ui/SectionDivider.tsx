import styles from "./SectionDivider.module.css";

interface SectionDividerProps {
  width?: "full" | "short" | "medium";
  className?: string;
}

export function SectionDivider({
  width = "full",
  className,
}: SectionDividerProps) {
  return (
    <div
      className={`${styles.divider} ${styles[width]} ${className || ""}`}
    />
  );
}

