import React, { useEffect, useState } from "react";
import styles from "./Community.module.scss";
import searchImg from "../../img/돋보기.png";
import BoardList from "./components/BoardList";
import ListPage from "./components/ListPage";
import { Link, useNavigate } from "react-router-dom";
import hiImg from "../../img/인사.jpeg";
import logoImg from "../../img/TitleLogo.png";
import NewBoardPage from "./NewBoardPage";
import FreeboardPage from "./FreeboardPage";
import { useDispatch, useSelector } from "react-redux";
import MyCalendar from "../../components/Calendar/MyCalendar";
import Auction from "../../components/RealTimeLiveStock/Auction";
import communitySlice, {
  fetchCommunity,
} from "./../../store/communitySlice/communitySlice";

const handleSubmit = () => {};
const handleKeywordChange = () => {};
const dummyItems = [
  {
    id: 1,
    title: "안녕하세요.",
    content: "요즘 날씨가...",
    image: hiImg,
    date: "2024-08-23",
    tag1: "#스마트팜",
    tag2: "#낙농",
    user: "userId",
  },
  {
    id: 2,
    title: "처음왔어요.",
    content: "행복한 하루...",
    image: hiImg,
    date: "2024-07-16",
    tag1: "#축사",
    tag2: "#양계",
    user: "userId",
  },
  {
    id: 3,
    title: "이런것도 있었네요.",
    content: "많이 신경써주시는...",
    image: hiImg,
    date: "2024-05-06",
    tag1: "#팜코어",
    tag2: "#양돈",
    user: "userId",
  },
];
const noticeItems = [
  {
    id: 1,
    title: "첫번째 공지📢",
    content: "자유롭게...",
    image: logoImg,
    date: "2024-01-25",
    admin: "admin",
  },
];

function Community() {
  const dispatch = useDispatch();
  const { communityContents } = useSelector((state) => state.communitySlice);

  const [isWriting, setIsWriting] = useState(false);
  const [openBoard, setOpenBoard] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const queryOptions = {
      conditions: [
        {
          field: "farmId",
          operator: "==",
          value: "123",
        },
      ],
    };

    dispatch(fetchCommunity({ collectionName: "community", queryOptions }));
  }, [dispatch]);
  console.log(communityContents);

  const handleNewBoardClick = () => {
    setIsWriting(true);
  };
  const handleBackToList = () => {
    setIsWriting(false);
    setOpenBoard(false);
  };

  const handleOpenBoard = (item) => {
    setSelectedItem(item);
    setOpenBoard(true);
  };
  if (isWriting) {
    // 새 글 작성 페이지 렌더링
    return <NewBoardPage onCancel={handleBackToList} />;
  }
  if (openBoard && selectedItem) {
    // 특정 게시글이 선택되었을 경우 게시글 상세 페이지로 전환
    return <FreeboardPage />;
  }

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
          items={communityContents}
          notices={noticeItems}
          onItemClick={handleOpenBoard}
        />
        <Auction />
      </ListPage>
    </div>
  );
}

export default Community;
