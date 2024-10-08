import React, { useEffect, useState } from "react";
import styles from "./Livestock.module.scss";
import searchImg from "../../img/돋보기.png";
import BoardList from "./components/BoardList";
import ListPage from "./components/ListPage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityPosts } from "../../store/communitySlice/communitySlice";

function Livestock() {
  const dispatch = useDispatch();
  const { livestockContents } = useSelector((state) => state.communitySlice);
  const { noticeContents } = useSelector((state) => state.communitySlice);

  const [sortOption, setSortOption] = useState("최신순");
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [selectedStockType, setSelectedStockType] = useState("");
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

    dispatch(
      fetchCommunityPosts({
        communityType: "notice",
        queryOptions: {
          conditions: [
            { field: "communityType", operator: "==", value: "notice" },
          ],
        },
      })
    );
  }, [dispatch]);

  const handleNewBoardClick = () => {
    navigate("/My_Farm_Board_NewBoard");
  };

  const handleOpenBoard = (item) => {
    navigate(`/My_Farm_Board_Community/${item.id}`);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(keyword);
  };
  const handleStockTypeChange = (e) => {
    setSelectedStockType(e.target.value);
  };

  const getFilteredAndSortedContents = () => {
    let filteredContents = [...livestockContents];

    // stockType에 따른 필터링
    if (selectedStockType) {
      filteredContents = filteredContents.filter(
        (item) => item.stockType === selectedStockType
      );
    }

    // 검색어에 따른 필터링
    if (searchTerm) {
      filteredContents = filteredContents.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 정렬
    if (sortOption === "최신순") {
      filteredContents.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortOption === "추천순") {
      filteredContents.sort((a, b) => b.like - a.like);
    }
    const sortedNotices = [...noticeContents].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    return [...sortedNotices, ...filteredContents];
  };

  const filteredAndSortedContents = getFilteredAndSortedContents();

  // 보여줄 게시글을 제한
  const visibleContents = filteredAndSortedContents.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const notices = noticeContents;

  return (
    <div className="page">
      <ListPage variant="livestock">
        <div className={styles.controls}>
          <form className={styles.form} onSubmit={handleSearch}>
            <input
              placeholder="검색으로 게시글 찾기"
              value={keyword}
              onChange={handleKeywordChange}
              className={styles.searchInput}
            />
            <button className={styles.searchButton} type="submit">
              <img src={searchImg} alt="검색" />
            </button>
          </form>
          <button
            className="globalBtn"
            type="button"
            onClick={handleNewBoardClick}
          >
            새 글 쓰기
          </button>
          <select
            className={styles.selectBox}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="최신순">최신순</option>
            <option value="추천순">추천순</option>
          </select>
          <select
            className={styles.selectBox}
            value={selectedStockType}
            onChange={handleStockTypeChange}
          >
            <option value="">가축 종류</option>
            <option value="koreanCow">한우</option>
            <option value="dairyCow">낙농</option>
            <option value="pork">양돈</option>
            <option value="chicken">양계</option>
            <option value="eggChicken">산란계</option>
          </select>
        </div>

        <p className={styles.postCount}>
          총 {filteredAndSortedContents.length}개 게시물
        </p>

        <BoardList
          items={visibleContents} // 보여줄 게시글 제한
          onItemClick={handleOpenBoard}
          notices={notices}
        />

        {/* 더보기 버튼 */}
        {visibleCount < filteredAndSortedContents.length && (
          <button className={styles.showMoreButton} onClick={handleShowMore}>
            더보기
          </button>
        )}
      </ListPage>
    </div>
  );
}

export default Livestock;
