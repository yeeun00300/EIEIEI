import React from "react";
import styles from "./Header.module.scss";
import logoImg from "../../../img/TitleLogo.png";

function Header(props) {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img className={styles.logoImg} src={logoImg} alt="" />
        <div>FarmCore</div>
      </div>
      <div className={styles.userInfo}>
        <div>종 아이콘</div>
        <div>프로필</div>
      </div>
    </div>
  );
}

export default Header;
