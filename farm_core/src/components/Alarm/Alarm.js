import React from "react";
import styles from "./Alarm.module.scss";

function Alarm({ title, description }) {
  return (
    <ul className={styles.Alarm}>
      <li>
        <h1>{title}</h1>
        <p>2024-08-27 00:00:00</p>
        <h3>{description}</h3>
      </li>
      <li>
        <h1>{title}</h1>
        <p>2024-08-27 00:00:00</p>
        <h3>{description}</h3>
      </li>
    </ul>
  );
}

export default Alarm;
