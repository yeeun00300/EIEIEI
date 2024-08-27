import React from "react";
import ListPage from "./components/ListPage";
import styles from "./Livestock.module.scss";
import searchImg from "../../img/돋보기.png";
import BoardList from "./components/BoardList";
import logoImg from "../../img/TitleLogo.png";
import cowImg from "../../img/한우축사.jpg";
const dummyItems = [
  {
    id: 1,
    title: "사료 배합 질문",
    content: "비육기에 접어들어...",
    image: cowImg,
    date: "2024-08-23",
    tag1: "#스마트팜",
    tag2: "#한우",
    user: "userId",
  },
];
const noticeItems = [
  {
    id: 1,
    title: "커뮤니티 이용안내📢",
    content: "신고 및 제재 기준",
    image: logoImg,
    date: "2024-01-25",
    admin: "admin",
  },
];

function Livestock() {
  const handleSubmit = () => {};
  const handleKeywordChange = () => {};
  return (
    <div className="page">
      <ListPage variant="livestock">
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

export default Livestock;
