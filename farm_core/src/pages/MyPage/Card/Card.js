import React from "react";
import styles from "./Card.module.scss";
function Card({ children, className }) {
  return <div className={styles.card}>{children}</div>;
}

export default Card;
