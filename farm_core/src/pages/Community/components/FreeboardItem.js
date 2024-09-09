import React, { useState } from "react";
import styles from "./FreeboardItem.module.scss";
import hiImg from "../../../img/인사.jpeg";
import { Link, replace, useNavigate } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import FreeboardPage from "../FreeboardPage";

function FreeBoardItem({ item, onItemClick }) {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.freeboardItem}>
        <img src={item.imgUrl} />
        <div className={styles.content}>
          <a className={styles.title} onClick={handleClick}>
            {item.title}
          </a>
          <p>{item.content}</p>
          <div>
          </div>
          <p>{item.user}</p>
          <p>{`작성일 : ${item.createdAt}`}</p>
          <div className={styles.reactions}>
            <FaRegThumbsUp />
            <span>4</span>
            <FaRegThumbsDown />
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeBoardItem;
