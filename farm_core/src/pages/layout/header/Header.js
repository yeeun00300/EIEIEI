import React from "react";
import styles from "./Header.module.scss";

function Header(props) {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>로고</div>
      <div className={styles.userInfo}>
        <div>종 아이콘</div>
        <div>프로필</div>
      </div>
    </div>
  );
}

export default Header;
