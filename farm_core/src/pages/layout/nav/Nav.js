import React from "react";
import styles from "./Nav.module.scss";

function Nav(props) {
  return (
    <div className={styles.nav}>
      <ul className={styles.category}>
        <li className={styles.categoryItem}>나의 목장</li>
        <li className={styles.categoryItem}>나의 목장</li>
        <li className={styles.categoryItem}>나의 목장</li>
        <li className={styles.categoryItem}>나의 목장</li>
      </ul>
    </div>
  );
}

export default Nav;
