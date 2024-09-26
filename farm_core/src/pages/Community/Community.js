import React, { useEffect, useState } from "react";
import styles from "./Community.module.scss";
import searchImg from "../../img/돋보기.png";
import BoardList from "./components/BoardList";
import ListPage from "./components/ListPage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityPosts } from "./../../store/communitySlice/communitySlice";
import CO2Control from "../../components/ControlPanels/CO2Control";
import Auction from "../../components/auction/Auction";
import TempControl from "../../components/ControlPanels/TempControl";
import AMControl from "../../components/ControlPanels/AMControl";
import MonthPractice from "../../components/diseaseMonth/MonthPractice";

function Community() {
  const dispatch = useDispatch();
  const { communityContents } = useSelector((state) => state.communitySlice);
  const { noticeContents } = useSelector((state) => state.communitySlice);
  const [sortOption, setSortOption] = useState("최신순");
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(6); // 한 번에 보여줄 게시글 수
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
    navigate(`/My_Farm_Board_FreeBoard/${item.id}`);
  };

  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(keyword);
  };

  const getFilteredAndSortedContents = () => {
    // communityContents 필터링 및 정렬
    let filteredContents = [...communityContents];

    // 검색어에 따른 필터링
    if (searchTerm) {
      filteredContents = filteredContents.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 정렬 (최신순 또는 추천순)
    if (sortOption === "최신순") {
      filteredContents.sort((a, b) => b.createdAt - a.createdAt);
    } else if (sortOption === "추천순") {
      filteredContents.sort((a, b) => b.like - a.like);
    }

    // notice 게시글은 항상 최상단에 위치하게 설정
    const sortedNotices = [...noticeContents].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    // notice 게시글을 최상단에 붙여서 반환
    return [...sortedNotices, ...filteredContents];
  };

  const filteredAndSortedContents = getFilteredAndSortedContents();

  // 보여줄 게시글을 제한
  const visibleContents = filteredAndSortedContents.slice(0, visibleCount);

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 6); // 게시글 6개씩 더 보기
  };

  // notice 게시글 필터링
  const notices = noticeContents;

  return (
    <div className="page">
      <ListPage variant="freeBoard">
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
            className={styles.newButton}
            type="button"
            onClick={handleNewBoardClick}
          >
            새 글 쓰기
          </button>
          <select
            className={styles.sortSelect}
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="최신순">최신순</option>
            <option value="추천순">추천순</option>
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
      <MonthPractice />
      <CO2Control />
      <AMControl />
    </div>
  );
}

export default Community;
