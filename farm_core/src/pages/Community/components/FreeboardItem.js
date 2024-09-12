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

  const userNickName =
    useSelector((state) => state.checkLoginSlice.checkLogin.nickname) ||
    "닉네임 없음";
  return (
    <div className={styles.wrapper}>
      <div className={styles.freeboardItem}>
        {item.imgUrl && <img src={item.imgUrl} alt="게시물" />}
        <div className={styles.content}>
          <a className={styles.title} onClick={handleClick}>
            {item.title}
          </a>
          <p className={styles.description}>{item.content}</p>
          <div></div>
          <p>{`작성자: ${userNickName}`}</p>
          <p>
            {`작성일: ${
              item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : "N/A"
            }`}
          </p>
          <p>
            {`수정일: ${
              item.updatedAt
                ? new Date(item.updatedAt).toLocaleDateString()
                : "N/A"
            }`}
          </p>
          <div className={styles.reactions}>
            <FaRegThumbsUp />
            <span>{item.like || 0}</span>
            <FaRegThumbsDown />
            <span>{item.dislike || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeBoardItem;
