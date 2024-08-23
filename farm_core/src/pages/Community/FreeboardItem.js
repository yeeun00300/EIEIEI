import React from "react";
import styles from "./freeBoardItem.module.scss";

function freeBoardItem() {
  return (
    <div className={styles.frreboardItem}>
      <img />
      <div className={styles.content}>
        <h2 className={styles.title}>안녕하세요</h2>
        <p>처음왔는데...</p>
        <div>
          <ul className={styles.tags}>
            <li>#스마트팜</li>
            <li>#낙농</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default freeBoardItem;
