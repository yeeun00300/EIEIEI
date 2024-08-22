import React from "react";
import styles from "./Nav.module.scss";
import Footer from "../footer/Footer";

function Nav(props) {
  return (
    <div className={styles.nav}>
      <ul className={styles.category}>
        <li className={styles.categoryItem}>나의 목장</li>
        <li className={styles.categoryItem}>나의 목장</li>
        <li className={styles.categoryItem}>나의 목장</li>
        <li className={styles.categoryItem}>나의 목장</li>
      </ul>
      <Footer />
    </div>
  );
}

export default Nav;
