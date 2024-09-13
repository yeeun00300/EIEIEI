import React, { useEffect, useState } from "react";
import styles from "./Community.module.scss";
import searchImg from "../../img/돋보기.png";
import BoardList from "./components/BoardList";
import ListPage from "./components/ListPage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityPosts } from "./../../store/communitySlice/communitySlice";

function Community() {
  const dispatch = useDispatch();
  const { communityContents } = useSelector((state) => state.communitySlice);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("추천순");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      fetchCommunityPosts({
        communityType: "freeboard",
        queryOptions: {
          conditions: [
            { field: "communityType", operator: "==", value: "freeboard" },
          ],
        },
      })
    );
  }, [dispatch]);

  const handleNewBoardClick = () => {
    navigate("/My_Farm_Board_NewBoard");
  };

  const handleOpenBoard = (item) => {
    console.log(item.id);
    navigate(`/My_Farm_Board_FreeBoard/:${item.id}`);
  };

  const getSortedContents = () => {
    let sortedContents = [...communityContents];

    if (sortOption === "추천순") {
      sortedContents.sort((a, b) => b.like - a.like);
    } else if (sortOption === "최신순") {
      sortedContents.sort((a, b) => b.updatedAt - a.updatedAt);
    }

    return sortedContents;
  };

  const sortedContents = getSortedContents();

  return (
    <div className="page">
      <ListPage variant="freeBoard">
        <form className={styles.form}>
          <input
            placeholder="검색으로 게시글 찾기"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.search}>
            <img src={searchImg} alt="검색" />
          </button>
          <button
            className={styles.new}
            type="button"
            onClick={handleNewBoardClick}
          >
            새 글 쓰기
          </button>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="추천순">추천순</option>
            <option value="최신순">최신순</option>
          </select>
        </form>

        <p>총 {sortedContents.length}개 게시물</p>
        <BoardList items={sortedContents} onItemClick={handleOpenBoard} />
      </ListPage>
    </div>
  );
}

export default Community;
