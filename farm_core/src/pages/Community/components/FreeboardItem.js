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
  return (
    <div className={styles.wrapper}>
      <div className={styles.freeboardItem}>
        {item.imgUrl && <img src={item.imgUrl} alt="게시물" />}
        <div className={styles.content}>
          <button className={styles.title} onClick={handleClick}>
            {item.title}
          </button>
          <p className={styles.description}>{item.content}</p>
          <div></div>
          <p>{`작성자: ${item.authorNickName}`}</p>

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
