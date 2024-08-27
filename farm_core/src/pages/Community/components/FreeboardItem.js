import React, { useState } from "react";
import styles from "./FreeboardItem.module.scss";
import hiImg from "../../../img/인사.jpeg";
import { Link, replace, useNavigate } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";
import FreeboardPage from "../FreeboardPage";

function FreeBoardItem({ item }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.freeboardItem}>
        <img src={item.image} />
        <div className={styles.content}>
          <Link className={styles.title} to="/freeBoard">
            {item.title}
          </Link>
          <p>{item.content}</p>
          <div>
            <ul className={styles.tags}>
              <li>{item.tag1}</li>
              <li>{item.tag2}</li>
            </ul>
          </div>
          <p>{item.user}</p>
          <p>{`작성일 : ${item.date}`}</p>
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
