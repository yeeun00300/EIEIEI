import React, { useEffect, useState } from "react";
import styles from "./Community.module.scss";
import searchImg from "../../img/돋보기.png";
import BoardList from "./components/BoardList";
import ListPage from "./components/ListPage";
import { useNavigate } from "react-router-dom";
import NewBoardPage from "./NewBoardPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityPosts } from "./../../store/communitySlice/communitySlice";

function Community() {
  const dispatch = useDispatch();
  const { communityContents } = useSelector((state) => state.communitySlice);

  const [isWriting, setIsWriting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      fetchCommunityPosts({
        communityType: "freeboard", // 실제 사용 중인 커뮤니티 타입 확인
        queryOptions: {
          conditions: [
            { field: "communityType", operator: "==", value: "freeboard" },
          ],
        },
      })
    );
  }, [dispatch]);

  const handleNewBoardClick = () => {
    setIsWriting(true);
  };

  const handleBackToList = () => {
    setIsWriting(false);
  };

  const handleOpenBoard = (item) => {
    navigate(`/My_Farm_Board_FreeBoard/${item.id}`);
  };

  if (isWriting) {
    return <NewBoardPage onCancel={handleBackToList} />;
  }

  return (
    <div className="page">
      <ListPage variant="freeBoard">
        <form className={styles.form}>
          <input placeholder="검색으로 게시글 찾기" />
          <button className={styles.search}>
            <img src={searchImg} alt="검색" />
          </button>
          <button className={styles.new} onClick={handleNewBoardClick}>
            새 글 쓰기
          </button>
          <select>
            <option>추천순</option>
            <option>최신순</option>
          </select>
        </form>

        <p>총 {communityContents.length}개 게시물</p>
        <BoardList items={communityContents} onItemClick={handleOpenBoard} />
      </ListPage>
    </div>
  );
}

export default Community;
