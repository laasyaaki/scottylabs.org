import React from "react";
import styles from "./ProfileCard.module.css";

type Props = {
  name: string;
  role: string;
};

export default function ProfileCard({ name, role }: Props) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <article className={styles.card} role="group" aria-label={name}>
      <div className={styles.avatar} aria-hidden>
        <span className={styles.initials}>{initials}</span>
      </div>
      <div className={styles.meta}>
        <div className={styles.name}>{name}</div>
        <div className={styles.role}>{role}</div>
      </div>
    </article>
  );
}
