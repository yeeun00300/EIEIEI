import React from "react";
import styles from "./Community.module.scss";
import searchImg from "../../img/돋보기.png";
import FreeboardItem from "./components/FreeboardItem";
import BoardList from "./components/BoardList";
import ListPage from "./components/ListPage";

const handleSubmit = () => {};
const handleKeywordChange = () => {};
const dummyItems = [
  { id: 1, title: "첫번째 글" },
  { id: 2, title: "두번째 글" },
  { id: 3, title: "세번째 글" },
];
const noticeItems = [{ id: 1, title: "첫번째 공지" }];
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
          <select>
            <option>추천순</option>
            <option>최신순</option>
          </select>
        </form>

        <p>총 n개 게시물</p>
        <BoardList items={dummyItems} notices={noticeItems} />
      </ListPage>
    </div>
  );
}

export default Community;
