import React from "react";
import styles from "./FreeboardItem.module.scss";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import { useSelector } from "react-redux";

function FreeBoardItem({ item, onItemClick }) {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

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
              <FaRegThumbsUp />
              <span>{item.like || 0}</span>
              <FaRegThumbsDown />
              <span>{item.dislike || 0}</span>
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
