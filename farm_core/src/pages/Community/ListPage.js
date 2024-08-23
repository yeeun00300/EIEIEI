import React from "react";
import styles from "./ListPage.module.scss";
import freeImg from "../../img/게시판.png";
import liveImg from "../../img/농장.png";

const dataDict = {
  freeBoard: {
    src: freeImg,
    title: "자유 게시판",
    description: "FarmCore의 자유게시판 입니다.",
  },
  livestock: {
    src: liveImg,
    title: "농장 관리에 관한 이야기를 나눠보세요.",
  },
};

function ListPage({ variant, children }) {
  const { src, title, description } = dataDict[variant];
  return (
    <>
      <div className={styles.container}>
        <img className={styles.icon} src={src} />
        <div className={styles.texts}>
          <h1 className={styles.heading}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div>{children}</div>
    </>
  );
}

export default ListPage;
