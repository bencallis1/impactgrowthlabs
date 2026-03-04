import type React from "react";
import Link from "next/link";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "contained" | "text" | "contained-light";
  className?: string;
  type?: "button" | "submit";
}

export function Button({
  children,
  href,
  onClick,
  variant = "contained",
  className,
  type = "button",
}: ButtonProps) {
  const classes = `${styles.btn} ${styles[variant]} ${className || ""}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

