import React, { useState } from "react";
import styles from "./FreeboardPage.module.scss";
import hiImg from "../../img/인사.jpeg";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import sirenImg from "../../img/신고하기.png";
import CommentSection from "./components/CommentSection";

function FreeboardPage() {
  const postData = {
    title: "안녕하세요",
    content: "처음 왔는데 게시판이 너무 좋네요!",
    date: "2024-08-23",
    imgUrl: hiImg,
  };

  return (
    <div className="page">
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {postData.imgUrl && (
            <img
              src={postData.imgUrl}
              alt={postData.title}
              className={styles.image}
            />
          )}
          <h1 className={styles.title}>{postData.title}</h1>
          <p className={styles.contentText}>{postData.content}</p>
          <p>{postData.date}</p>
          <button>수정하기</button>
          <button>삭제하기</button>
          <div className={styles.siren}>
            <button>
              <img src={sirenImg} />
            </button>
            <span>신고하기</span>
          </div>
          <div className={styles.reactions}>
            <FaRegThumbsUp />
            <span>4</span>
            <FaRegThumbsDown />
            <span>0</span>
          </div>
        </div>
        <CommentSection />
      </div>
    </div>
  );
}

export default FreeboardPage;
