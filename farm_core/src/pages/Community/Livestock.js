import React, { useEffect, useState } from "react";
import styles from "./Livestock.module.scss";
import searchImg from "../../img/돋보기.png";
import BoardList from "./components/BoardList";
import ListPage from "./components/ListPage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityPosts } from "../../store/communitySlice/communitySlice";
import FreeboardPage from "./FreeboardPage";

function Livestock() {
  const dispatch = useDispatch();
  const { livestockContents } = useSelector((state) => state.communitySlice);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("최신순");
  const [filteredContents, setFilteredContents] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      fetchCommunityPosts({
        communityType: "livestock",
        queryOptions: {
          conditions: [
            { field: "communityType", operator: "==", value: "livestock" },
          ],
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    let results = livestockContents;

    if (searchQuery) {
      results = results.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    let sortedResults = [...results];
    if (sortOption === "추천순") {
      sortedResults = sortedResults.sort((a, b) => b.like - a.like);
    } else if (sortOption === "최신순") {
      sortedResults = sortedResults.sort((a, b) => b.createdAt - a.createdAt);
    }
    setFilteredContents(sortedResults);
  }, [livestockContents, searchQuery, sortOption]);

  const handleNewBoardClick = () => {
    navigate("/My_Farm_Board_NewBoard");
  };

  const handleBackToList = () => {
    setSelectedItem(null);
  };

  const handleOpenBoard = (item) => {
    navigate(`/My_Farm_Board_Community/${item.id}`);
  };

  return (
    <div className="page">
      <ListPage variant="livestock">
        <form className={styles.form}>
          <input
            placeholder="검색으로 게시글 찾기"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.search}>
            <img src={searchImg} alt="검색" />
          </button>
          <button className={styles.new} onClick={handleNewBoardClick}>
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

        <p>총 {filteredContents.length}개 게시물</p>
        <BoardList items={filteredContents} onItemClick={handleOpenBoard} />
      </ListPage>
    </div>
  );
}

export default Livestock;
