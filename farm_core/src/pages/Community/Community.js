import React from "react";
import ListPage from "./ListPage";
import styles from "./Community.module.scss";
import searchImg from "../../img/돋보기.png";
import FreeboardItem from "./FreeboardItem";

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
          <button className={styles.search}>
            <img src={searchImg} />
          </button>
          <button className={styles.new}>
            <p>새 글 쓰기</p>
          </button>
        </form>

        <p>총 n개 게시물</p>
        <div className={styles.boardList}>
          <FreeboardItem />
          <FreeboardItem />
          <FreeboardItem />
        </div>
      </ListPage>
    </div>
  );
}

export default Community;
