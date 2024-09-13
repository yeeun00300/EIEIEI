import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./FreeboardPage.module.scss";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";
import sirenImg from "../../img/신고하기.png";
import CommentSection from "./components/CommentSection";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommunityPost } from "../../store/communitySlice/communitySlice"; // 불필요한 액션 제거

function FreeboardPage() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getStockTypeInKorean = (type) => {
    switch (type) {
      case "koreanCow":
        return "한우";
      case "dairyCow":
        return "낙농";
      case "pork":
        return "양돈";
      case "chicken":
        return "양계";
      case "eggChicken":
        return "산란계";
      default:
        return "";
    }
  };

  const isFreeBoard = location.pathname.includes("My_Farm_Board_FreeBoard");
  const communityType = isFreeBoard ? "freeboard" : "livestock";

  const { communityContents, livestockContents, isLoading } = useSelector(
    (state) => state.communitySlice
  );

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    const contents = isFreeBoard ? communityContents : livestockContents;
    const post = contents.find((post) => post.id === id);
    setPostData(post);
  }, [id, communityContents, livestockContents, isFreeBoard]);

  const handleUpdate = () => {
    navigate(`/My_Farm_Board_NewBoard/${id}`, { state: { postData } });
  };

  const handleDelete = async () => {
    try {
      await dispatch(
        deleteCommunityPost({ id, communityType, imgUrl: postData?.imgUrl })
      ).unwrap();
      const redirectPath = isFreeBoard
        ? "/My_Farm_Board_FreeBoard"
        : "/My_Farm_Board_Community";
      navigate(redirectPath);
    } catch (error) {
      console.error("게시물 삭제에 실패했습니다:", error);
    }
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  if (!postData) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="page">
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.stockType}>
            {getStockTypeInKorean(postData.stockType)}
          </div>
          {postData.imgUrl && (
            <img
              src={postData.imgUrl}
              alt={postData.title}
              className={styles.image}
            />
          )}
          <h1 className={styles.title}>{postData.title}</h1>
          <p className={styles.contentText}>{postData.content}</p>
          <p>{`작성자: ${postData.authorNickName}`}</p>
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
          <button onClick={handleUpdate}>수정하기</button>
          <button onClick={handleDelete}>삭제하기</button>
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
