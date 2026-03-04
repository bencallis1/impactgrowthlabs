import styles from "./ImpactBar.module.css";

const stats = [
  { number: "1,500", label: "years of proof" },
  { number: "700", label: "years Nalanda lasted" },
  { number: "9M", label: "manuscripts in the Dharmaganja" },
  { number: "10,000", label: "students at peak" },
  { number: "1,000", label: "year investment horizon" },
  { number: "427 CE", label: "Nalanda founded" },
];

export function ImpactBar() {
  const items = [...stats, ...stats];

  return (
    <div className={styles.bar} aria-label="Key statistics">
      <div className={styles.track}>
        {items.map((stat, i) => (
          <div key={stat.label + i.toString()} className={styles.item}>
            <span className={styles.number}>{stat.number}</span>
            <span className={styles.label}>{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

