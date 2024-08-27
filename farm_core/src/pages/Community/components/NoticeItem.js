import React from "react";
import styles from "./NoticeItem.module.scss";
import { Link } from "react-router-dom";
import FreeboardPage from "../FreeboardPage";
import logoImg from "../../../img/TitleLogo.png";

function NoticeItem({ notice }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.notice}>
        <img src={notice.image} />
        <div className={styles.content}>
          <h2 className={styles.title}>{notice.title}</h2>
          <p>{notice.content}</p>
          <p>{notice.admin}</p>
          <p>{`작성일 : ${notice.date}`}</p>
        </div>
      </div>
    </div>
  );
}

export default NoticeItem;
