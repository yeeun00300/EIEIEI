import React from "react";
import ListPage from "./ListPage";
import styles from "./Community.module.scss";
import searchImg from "../../img/돋보기.png";
import FreeboardItem from "./FreeboardItem";
import BoardList from "./BoardList";

const handleSubmit = () => {};
const handleKeywordChange = () => {};
const dummyItems = [
  { id: 1, title: "첫번째 글" },
  { id: 2, title: "두번째 글" },
  { id: 3, title: "세번째 글" },
];

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
          <button className={styles.new}>새 글 쓰기</button>
        </form>

        <p>총 n개 게시물</p>
        <BoardList items={dummyItems} />
      </ListPage>
    </div>
  );
}

export default Community;
