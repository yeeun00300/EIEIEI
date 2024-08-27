import React from "react";
import styles from "./FreeboardItem.module.scss";
import { Link } from "react-router-dom";
import FreeboardPage from "../FreeboardPage";
import logoImg from "../../../img/TitleLogo.png";

function NoticeItem({ notice }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.freeboardItem}>
        <img src={logoImg} />
        <div className={styles.content}>
          <Link to="/freeboard">
            <h2 className={styles.title}>📢공지사항</h2>
          </Link>
          <p>서버 점검 안내.</p>
          <div></div>
          <p>작성일 : 2024-01-23</p>
        </div>
      </div>
    </div>
  );
}

export default NoticeItem;
