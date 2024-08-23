import React from "react";
import ListPage from "./ListPage";
import styles from "./Community.module.scss";
import searchImg from "../../img/돋보기.png";

const handleSubmit = () => {};
const handleKeywordChange = () => {};

function Community() {
  return (
    <div className="page">
      <ListPage variant="freeBoard">
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            placeholder="검색으로 게시글 찾기"
            onChange={handleKeywordChange}
          />
          <button>
            <img src={searchImg} />
          </button>
        </form>
        <p>총 0개 게시물</p>
        <div className={styles.boardList}></div>
      </ListPage>
    </div>
  );
}

export default Community;
