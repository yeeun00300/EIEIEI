import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./FreeboardPage.module.scss";
import ReactionButton from "./components/ReactionButton";
import sirenImg from "../../img/신고하기.png";
import CommentSection from "./components/CommentSection";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommunityPost,
  updatePostReactions,
} from "../../store/communitySlice/communitySlice";
import { updateCommunityDatas } from "../../firebase";
import DeclareModal from "./components/DeclareModal";

function FreeboardPage() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [userHasDisliked, setUserHasDisliked] = useState(false);
  const [isDeclareModalOpen, setIsDeclareModalOpen] = useState(false);

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
        return null;
    }
  };

  const isFreeBoard = location.pathname.includes("My_Farm_Board_FreeBoard");
  const communityType = isFreeBoard ? "freeboard" : "livestock";

  const contents = useSelector((state) =>
    isFreeBoard
      ? state.communitySlice.communityContents
      : state.communitySlice.livestockContents
  );

  const postData = contents.find((post) => post.id === id);

  useEffect(() => {
    if (postData) {
      const userEmail = localStorage.getItem("email");
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};
      const dislikedPosts =
        JSON.parse(localStorage.getItem("dislikedPosts")) || {};

      setUserHasLiked(likedPosts[id] === userEmail);
      setUserHasDisliked(dislikedPosts[id] === userEmail);
    }
  }, [postData]);

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

  const handleLike = useCallback(async () => {
    if (userHasLiked || userHasDisliked) return;

    const userEmail = localStorage.getItem("email");
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts")) || {};

    if (likedPosts[id] === userEmail) {
      alert("이미 좋아요를 누르셨습니다.");
      return;
    }

    const updates = {
      like: postData.like + 1,
    };

    try {
      await dispatch(
        updatePostReactions({ id, updates, communityType })
      ).unwrap();
      setUserHasLiked(true);
      likedPosts[id] = userEmail;
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      if (userHasDisliked) {
        await dispatch(
          updatePostReactions({
            id,
            updates: { dislike: postData.dislike - 1 },
            communityType,
          })
        ).unwrap();
        setUserHasDisliked(false);
      }
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
    }
  }, [userHasLiked, userHasDisliked, postData, dispatch, id, communityType]);

  const handleDislike = useCallback(async () => {
    if (userHasDisliked || userHasLiked) return;

    const userEmail = localStorage.getItem("email");
    const dislikedPosts =
      JSON.parse(localStorage.getItem("dislikedPosts")) || {};

    if (dislikedPosts[id] === userEmail) {
      alert("이미 싫어요를 누르셨습니다.");
      return;
    }

    const updates = {
      dislike: postData.dislike + 1,
    };

    try {
      await dispatch(
        updatePostReactions({ id, updates, communityType })
      ).unwrap();
      setUserHasDisliked(true);
      dislikedPosts[id] = userEmail;
      localStorage.setItem("dislikedPosts", JSON.stringify(dislikedPosts));
      if (userHasLiked) {
        await dispatch(
          updatePostReactions({
            id,
            updates: { like: postData.like - 1 },
            communityType,
          })
        ).unwrap();
        setUserHasLiked(false);
      }
    } catch (error) {
      console.error("싫어요 업데이트 실패:", error);
    }
  }, [userHasLiked, userHasDisliked, postData, dispatch, id, communityType]);

  const handleDeclareClick = () => {
    setIsDeclareModalOpen(true);
  };

  const handleDeclareSubmit = async (reason) => {
    const updates = {
      declareReason: reason,
      declareState: "reported",
      declareCount: (postData.declareCount || 0) + 1,
    };
    try {
      await updateCommunityDatas(id, updates);
      alert("신고가 접수되었습니다.");
    } catch (error) {
      console.error("신고 처리 실패:", error);
    }
    setIsDeclareModalOpen(false);
  };

  if (!postData) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const isAuthor = postData.email === localStorage.getItem("email"); // 작성자 확인

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.details}>
            {postData.stockType && ( // stockType이 있을 때만 렌더링
              <div className={styles.stockType}>
                축산 관리 커뮤니티 &gt;{" "}
                {getStockTypeInKorean(postData.stockType)}
              </div>
            )}
            {postData.imgUrl && (
              <img
                src={postData.imgUrl}
                alt={postData.title}
                className={styles.image}
              />
            )}
            <h1 className={styles.title}>{postData.title}</h1>
            <p className={styles.contentText}>{postData.content}</p>
            <p
              className={styles.metadata}
            >{`작성자: ${postData.authorNickName}`}</p>
            <p className={styles.metadata}>
              {`작성일: ${
                postData.createdAt
                  ? new Date(postData.createdAt).toLocaleDateString()
                  : "N/A"
              }`}
            </p>
            <p className={styles.metadata}>
              {`수정일: ${
                postData.updatedAt
                  ? new Date(postData.updatedAt).toLocaleDateString()
                  : "N/A"
              }`}
            </p>
            {isAuthor && ( // 작성자일 때만 수정 및 삭제 버튼 표시
              <div className={styles.buttonGroup}>
                <button className={styles.button} onClick={handleUpdate}>
                  수정하기
                </button>
                <button className={styles.button} onClick={handleDelete}>
                  삭제하기
                </button>
              </div>
            )}
            <div className={styles.siren}>
              <button
                className={styles.reportButton}
                onClick={handleDeclareClick}
              >
                <img src={sirenImg} alt="신고하기" />
              </button>
              <span className={styles.reportText}>신고하기</span>
            </div>
            <div className={styles.reactions}>
              <ReactionButton
                type="like"
                onClick={handleLike}
                count={postData.like}
                active={userHasLiked}
              />
              <ReactionButton
                type="dislike"
                onClick={handleDislike}
                count={postData.dislike}
                active={userHasDisliked}
              />
            </div>
          </div>
        </div>
        <div className={styles.commentSectionWrapper}>
          <CommentSection postId={id} />
        </div>
        {isDeclareModalOpen && (
          <DeclareModal
            onClose={() => setIsDeclareModalOpen(false)}
            onSubmit={handleDeclareSubmit}
          />
        )}
      </div>
    </div>
  );
}

export default FreeboardPage;
