'use client';

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import styles from "./FadeIn.module.css";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  threshold = 0.15,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            window.setTimeout(() => {
              target.classList.add(styles.visible);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <div ref={ref} className={`${styles.fadeIn} ${className || ""}`}>
      {children}
    </div>
  );
}

