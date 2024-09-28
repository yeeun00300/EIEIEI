import React, { useEffect, useState } from "react";
import styles from "./FreeboardItem.module.scss";
import {
  FaRegThumbsUp,
  FaRegThumbsDown,
  FaRegCommentDots,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { collection, doc, getDocs, getFirestore } from "firebase/firestore";
import { getSubCollection } from "../../../firebase";

function FreeBoardItem({ item, onItemClick }) {
  const [comments, setComments] = useState([]);

  const handleClick = () => {
    if (onItemClick) {
      onItemClick(item);
    }
  };
  console.log(item);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsList = await getSubCollection(
          "community",
          item.id,
          "comments"
        );
        setComments(commentsList);
      } catch (error) {
        console.error("댓글을 가져오는 중 오류 발생:", error);
      }
    };

    fetchComments();
  }, [item.id]);
  const getItemContent = () => {
    if (item.declareState === "black") {
      return <p className={styles.reported}>차단된 게시물 입니다</p>;
    }

    if (
      item.declareState === "reported" ||
      item.declareState === "" ||
      item.declareState === "checked"
    ) {
      return (
        <>
          {item.imgUrl && (
            <img src={item.imgUrl} alt="게시물" onClick={handleClick} />
          )}
          <div className={styles.content}>
            <button className={styles.title} onClick={handleClick}>
              {item.title}
            </button>
            <p className={styles.description} onClick={handleClick}>
              {item.content}
            </p>
            <p>{`작성자: ${item.authorNickName}`}</p>

            <div className={styles.reactions}>
              <div>
                <FaRegThumbsUp />
                <span>{item.like || 0}</span>
              </div>
              <div>
                <FaRegThumbsDown />
                <span>{item.dislike || 0}</span>
              </div>
              <div>
                <FaRegCommentDots />
                <span>{comments.length || 0}</span>
              </div>
            </div>
          </div>
        </>
      );
    }

    // declareState가 "black"이 아닌 다른 값일 경우, 또는 undefined일 경우
    return null;
  };
  const itemClassName = item.notice
    ? `${styles.freeboardItem} ${styles.notice}`
    : styles.freeboardItem;

  return (
    <div className={styles.wrapper}>
      <div className={itemClassName}>
        {/* {item.imgUrl && <img src={item.imgUrl} alt="게시물" />}
        <div className={styles.content}>
          <button className={styles.title} onClick={handleClick}>
            {item.title}
          </button>
          <p className={styles.description} onClick={handleClick}>
            {item.content}
          </p>
          <div></div>
          <p>{`작성자: ${item.authorNickName}`}</p>

          <div className={styles.reactions}>
            <FaRegThumbsUp />
            <span>{item.like || 0}</span>
            <FaRegThumbsDown />
            <span>{item.dislike || 0}</span>
          </div>
        </div> */}
        {getItemContent()}
      </div>
    </div>
  );
}

export default FreeBoardItem;
