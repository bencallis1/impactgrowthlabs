import type React from "react";
import styles from "./SectionWrapper.module.css";

interface SectionWrapperProps {
  children: React.ReactNode;
  variant?: "cream" | "white" | "indigo" | "forest" | "gold";
  id?: string;
  className?: string;
  narrow?: boolean;
}

export function SectionWrapper({
  children,
  variant = "cream",
  id,
  className,
  narrow = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`${styles.section} ${styles[variant]} ${className || ""}`}
    >
      <div
        className={`${styles.inner} ${
          narrow ? styles.narrow : ""
        }`}
      >
        {children}
      </div>
    </section>
  );
}

