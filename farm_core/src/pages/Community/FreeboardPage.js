import React from "react";
import styles from "./FreeboardPage.module.scss";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import sirenImg from "../../img/신고하기.png";
import CommentSection from "./components/CommentSection";

function FreeboardPage({ postData }) {
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
              <img src={sirenImg} alt="신고하기" />
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
