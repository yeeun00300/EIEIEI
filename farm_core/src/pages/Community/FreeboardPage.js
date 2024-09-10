import React from "react";
import { useParams } from "react-router-dom";
import styles from "./FreeboardPage.module.scss";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import sirenImg from "../../img/신고하기.png";
import CommentSection from "./components/CommentSection";
import { useSelector } from "react-redux";

function FreeboardPage() {
  const { id } = useParams();
  const { communityContents, isLoading } = useSelector(
    (state) => state.communitySlice
  );

  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const postData = communityContents.find((post) => post.id === id);

  if (!postData) {
    console.log("게시물을 찾을 수 없습니다.");
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

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
            <span>{postData.like || 0}</span>
            <FaRegThumbsDown />
            <span>{postData.dislike || 0}</span>
          </div>
        </div>
        <CommentSection />
      </div>
    </div>
  );
}

export default FreeboardPage;
