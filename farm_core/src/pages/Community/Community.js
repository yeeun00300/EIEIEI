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
  fetchCommunityPost,
} from "./../../store/communitySlice/communitySlice";

const handleSubmit = () => {};
const handleKeywordChange = () => {};


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

    dispatch(fetchCommunityPost({ collectionName: "community", queryOptions }));
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
          onItemClick={handleOpenBoard}
        />
        <Auction />
      </ListPage>
    </div>
  );
}

export default Community;
