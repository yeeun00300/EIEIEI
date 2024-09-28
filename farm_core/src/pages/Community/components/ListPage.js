import React from "react";
import styles from "./ListPage.module.scss";
import freeImg from "../../../img/게시글.png";
import liveImg from "../../../img/농장.png";

const dataDict = {
  freeBoard: {
    src: freeImg,
    title: "자유 게시판",
    description: "자유롭게 이야기를 나눠보세요.",
    className: styles.freeBoard,
  },
  livestock: {
    src: liveImg,
    title: "축산 관리 커뮤니티",
    description: "축사 관리에 관한 이야기를 나눠보세요.",
    className: styles.livestockBoard,
  },
};

function ListPage({ variant, children }) {
  const { src, title, description, className } = dataDict[variant];
  return (
    <>
      <div className={`${styles.container} ${className}`}>
        <img className={styles.icon} src={src} />
        <div className={styles.texts}>
          <h1 className={styles.heading}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.wrapper}>{children}</div>
    </>
  );
}

export default ListPage;
