import type React from "react";
import styles from "./EyebrowLabel.module.css";

interface EyebrowLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function EyebrowLabel({ children, className }: EyebrowLabelProps) {
  return (
    <span className={`${styles.eyebrowLabel} ${className || ""}`}>
      {children}
    </span>
  );
}

