import React from "react";
import styles from "./NoticeItem.module.scss";
import { Link } from "react-router-dom";
import FreeboardPage from "../FreeboardPage";
import logoImg from "../../../img/TitleLogo.png";

function NoticeItem({ notice, onItemClick }) {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick(notice);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.noticeItem}>
        {notice.imgUrl && <img src={notice.imgUrl} alt="공지" />}
        <div className={styles.content}>
          <button className={styles.title} onClick={handleClick}>
            {notice.title}
          </button>
          <p className={styles.description} onClick={handleClick}>
            {notice.content}
          </p>
          <p>{`작성자: ${notice.authorNickName}`}</p>
        </div>
      </div>
    </div>
  );
}

export default NoticeItem;
