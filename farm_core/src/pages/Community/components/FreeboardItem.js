import React from "react";
import styles from "./FreeboardItem.module.scss";
import hiImg from "../../../img/인사.jpeg";
import { Link, replace, useNavigate } from "react-router-dom";
import { FaRegThumbsUp } from "react-icons/fa6";
import { FaRegThumbsDown } from "react-icons/fa6";

function FreeBoardItem() {
  const navigate = useNavigate();

  const goBoardPage = () => {
    navigate("/freeBoard", { replace: true });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.freeboardItem}>
        <img src={hiImg} />
        <div className={styles.content}>
          <h2 className={styles.title} onClick={goBoardPage}>
            안녕하세요
          </h2>
          <p>처음왔는데...</p>
          <div>
            <ul className={styles.tags}>
              <li>#스마트팜</li>
              <li>#낙농</li>
            </ul>
          </div>
          <p>작성일 : 2024-08-23</p>
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
