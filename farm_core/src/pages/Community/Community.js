import React, { useState } from "react";
import styles from "./Community.module.scss";
import searchImg from "../../img/돋보기.png";
import BoardList from "./components/BoardList";
import ListPage from "./components/ListPage";
import { Link, useNavigate } from "react-router-dom";
import hiImg from "../../img/인사.jpeg";
import logoImg from "../../img/TitleLogo.png";
import FreeBoardItem from "./components/FreeboardItem";
import NewBoardPage from "./NewBoardPage";
import NoticeItem from "./components/NoticeItem";

const handleSubmit = () => {};
const handleKeywordChange = () => {};
const dummyItems = [
  {
    id: 1,
    title: "안녕하세요.",
    image: hiImg,
    date: "2024-08-23",
    tag1: "#스마트팜",
    tag2: "#낙농",
  },
  {
    id: 2,
    title: "처음왔어요.",
    image: hiImg,
    date: "2024-07-16",
    tag1: "#축사",
    tag2: "#양계",
  },
  {
    id: 3,
    title: "이런것도 있었네요.",
    image: hiImg,
    date: "2024-05-06",
    tag1: "#팜코어",
    tag2: "#양돈",
  },
];
const noticeItems = [
  { id: 1, title: "첫번째 공지📢", image: logoImg, date: "2024-01-25" },
];
function Community() {
  const [isWriting, setIsWriting] = useState(false);

  const handleNewBoardClick = () => {
    setIsWriting(true);
  };
  const handleBackToList = () => {
    setIsWriting(false);
  };

  if (isWriting) {
    // 새 글 작성 페이지 렌더링
    return <NewBoardPage onCancel={handleBackToList} />;
  }

  // const goNewBoard = () => {
  //   <NewBoardPage />;
  // };

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
          <button className={styles.new} onClick={handleNewBoardClick}>
            새 글 쓰기
          </button>

          <select>
            <option>추천순</option>
            <option>최신순</option>
          </select>
        </form>

        <p>총 n개 게시물</p>
        <BoardList
          items={dummyItems}
          notices={noticeItems}
          renderItem={(item) => <FreeBoardItem key={item.id} item={item} />}
        />
      </ListPage>
    </div>
  );
}

export default Community;
