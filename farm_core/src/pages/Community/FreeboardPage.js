import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styles from "./FreeboardPage.module.scss";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import sirenImg from "../../img/신고하기.png";
import CommentSection from "./components/CommentSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommunityPosts } from "./../../store/communitySlice/communitySlice"; // 액션 가져오기

function FreeboardPage() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  // 커뮤니티 타입을 경로에 따라 결정
  const isFreeBoard = location.pathname.includes("My_Farm_Board_FreeBoard");
  const communityType = isFreeBoard ? "freeboard" : "livestock";

  // 게시물과 로딩 상태 가져오기
  const { communityContents, livestockContents, isLoading } = useSelector(
    (state) => state.communitySlice
  );

  const userNickName =
    useSelector((state) => state.checkLoginSlice.checkLogin.nickname) ||
    "닉네임 없음";

  const [postData, setPostData] = useState(null);

  // 컴포넌트 마운트 시 게시물 로딩
  useEffect(() => {
    if (
      (isFreeBoard && !communityContents.length) ||
      (!isFreeBoard && !livestockContents.length)
    ) {
      dispatch(
        fetchCommunityPosts({
          communityType, // communityType에 따라 데이터 가져오기
          queryOptions: {
            conditions: [
              { field: "communityType", operator: "==", value: communityType },
            ],
          },
        })
      );
    }
  }, [
    dispatch,
    communityType,
    communityContents.length,
    livestockContents.length,
    isFreeBoard,
  ]);

  // communityType에 따라 해당하는 게시물 리스트를 선택
  useEffect(() => {
    const contents = isFreeBoard ? communityContents : livestockContents;
    if (contents.length) {
      const post = contents.find((post) => post.id === id);
      setPostData(post);
    }
  }, [id, communityContents, livestockContents, isFreeBoard]);

  // 로딩 상태 처리
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  // 게시물 없을 때 처리
  if (!postData) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  // 게시물 렌더링
  return (
    <div className="page">
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {postData.imgUrl && (
            <img
              src={postData.imgUrl}
              alt={postData.title}
              className={styles.image}
            />
          )}
          <h1 className={styles.title}>{postData.title}</h1>
          <p className={styles.contentText}>{postData.content}</p>
          <p>{`작성자: ${userNickName}`}</p>
          <p>
            {`작성일: ${
              postData.createdAt
                ? new Date(postData.createdAt).toLocaleDateString()
                : "N/A"
            }`}
          </p>
          <p>
            {`수정일: ${
              postData.updatedAt
                ? new Date(postData.updatedAt).toLocaleDateString()
                : "N/A"
            }`}
          </p>
          <button>수정하기</button>
          <button>삭제하기</button>
          <div className={styles.siren}>
            <button>
              <img src={sirenImg} alt="신고하기" />
            </button>
            <span>신고하기</span>
          </div>
          <div className={styles.reactions}>
            <FaRegThumbsUp />
            <span>{postData.like || 0}</span>
            <FaRegThumbsDown />
            <span>{postData.dislike || 0}</span>
          </div>
        </div>
        <CommentSection />
      </div>
    </div>
  );
}

export default FreeboardPage;
