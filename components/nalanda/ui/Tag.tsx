import type React from "react";
import styles from "./Tag.module.css";

interface TagProps {
  children: React.ReactNode;
  variant?: "gold" | "sage" | "terracotta";
}

export function Tag({ children, variant = "gold" }: TagProps) {
  return (
    <span className={`${styles.tag} ${styles[variant]}`}>
      {children}
    </span>
  );
}

