import React, { useEffect, useState, useCallback } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styles from "./FreeboardPage.module.scss";
import ReactionButton from "./components/ReactionButton";
import sirenImg from "../../img/신고하기.png";
import CommentSection from "./components/CommentSection";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCommunityPost,
  fetchCommunityPosts,
  reportPost,
  updatePostReactions,
} from "../../store/communitySlice/communitySlice";
import DeclareModal from "./components/DeclareModal";

function FreeboardPage() {
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [userHasDisliked, setUserHasDisliked] = useState(false);
  const [isDeclareModalOpen, setIsDeclareModalOpen] = useState(false);
  const [userHasReported, setUserHasReported] = useState(false);

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
  const noticeContents = useSelector(
    (state) => state.communitySlice.noticeContents
  );
  const noticeItem = noticeContents.find((notice) => notice.id === id);

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
      const reportedPosts =
        JSON.parse(localStorage.getItem("reportedPosts")) || {};

      setUserHasLiked(likedPosts[id] === userEmail);
      setUserHasDisliked(dislikedPosts[id] === userEmail);
      setUserHasReported(reportedPosts[id] === userEmail);
    }
  }, [postData]);
  useEffect(() => {
    if (!postData) {
      console.log("postData가 없습니다. 데이터를 불러옵니다."); // 로그 추가
      const fetchPostData = async () => {
        try {
          const post = await dispatch(
            fetchCommunityPosts({
              communityType: "freeboard", // 혹은 livestock 등 적절한 타입 사용
              queryOptions: {
                conditions: [{ field: "id", operator: "==", value: id }],
              },
            })
          ).unwrap();
          if (post) {
            console.log("post 불러오기 성공:", post); // 데이터 성공 여부 확인
          }
        } catch (error) {
          console.error("게시물을 불러오는 중 오류가 발생했습니다.", error);
        }
      };

      fetchPostData();
    } else {
      console.log("postData:", postData); // postData 확인
    }
  }, [postData, dispatch, id]);
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
      like: (postData?.like || 0) + 1,
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
            updates: { dislike: (postData?.dislike || 0) - 1 },
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
      dislike: (postData?.dislike || 0) + 1,
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
            updates: { like: (postData?.like || 0) - 1 },
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
    if (userHasReported) {
      alert("이미 신고한 게시글입니다.");
      return;
    }

    setIsDeclareModalOpen(true);
  };

  const handleDeclareSubmit = async (reason) => {
    try {
      await dispatch(reportPost({ id, reason })).unwrap();
      alert("신고가 접수되었습니다.");

      const userEmail = localStorage.getItem("email");
      const reportedPosts =
        JSON.parse(localStorage.getItem("reportedPosts")) || {};
      reportedPosts[id] = userEmail;
      localStorage.setItem("reportedPosts", JSON.stringify(reportedPosts));

      setUserHasReported(true);
    } catch (error) {
      console.error("신고 처리 실패:", error);
    }

    setIsDeclareModalOpen(false);
  };

  if (!postData && !noticeItem) {
    return <div>게시물을 찾을 수 없습니다.</div>;
  }

  const dataToRender = postData || noticeItem; // postData가 없으면 noticeItem 사용
  const isAuthor = dataToRender.email === localStorage.getItem("email");

  return (
    <div className="page">
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.content}>
            <div className={styles.details}>
              {dataToRender.stockType && (
                <div className={styles.stockType}>
                  축산 관리 커뮤니티 &gt;
                  {getStockTypeInKorean(dataToRender.stockType)}
                </div>
              )}
              {dataToRender.imgUrl && (
                <img
                  src={dataToRender.imgUrl}
                  alt={dataToRender.title}
                  className={styles.image}
                />
              )}
              <h1 className={styles.title}>{dataToRender.title}</h1>
              <p className={styles.contentText}>{dataToRender.content}</p>
              <p
                className={styles.metadata}
              >{`작성자: ${dataToRender.authorNickName}`}</p>
              <p className={styles.metadata}>
                {`작성일: ${
                  dataToRender.createdAt
                    ? new Date(dataToRender.createdAt).toLocaleDateString()
                    : "N/A"
                }`}
              </p>
              <p className={styles.metadata}>
                {`수정일: ${
                  dataToRender.updatedAt
                    ? new Date(dataToRender.updatedAt).toLocaleDateString()
                    : "N/A"
                }`}
              </p>
              {isAuthor && (
                <div className={styles.buttonGroup}>
                  <button className="globalEditBtn" onClick={handleUpdate}>
                    수정하기
                  </button>
                  <button className="globalDeleteBtn" onClick={handleDelete}>
                    삭제하기
                  </button>
                </div>
              )}
              {!noticeItem && (
                <>
                  {" "}
                  <button
                    className={styles.reportButton}
                    onClick={noticeItem ? null : handleDeclareClick}
                    disabled={!!noticeItem}
                  >
                    <img src={sirenImg} alt="신고하기" />
                    <span className={styles.reportText}>신고하기</span>
                  </button>
                  <div className={styles.reactions}>
                    <ReactionButton
                      type="like"
                      onClick={noticeItem ? null : handleLike}
                      count={dataToRender.like}
                      active={userHasLiked}
                      disabled={!!noticeItem}
                    />
                    <ReactionButton
                      type="dislike"
                      onClick={noticeItem ? null : handleDislike}
                      count={dataToRender.dislike}
                      active={userHasDisliked}
                      disabled={!!noticeItem}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          <CommentSection id={id} />
        </div>
      </div>
      {isDeclareModalOpen && (
        <DeclareModal
          onClose={() => setIsDeclareModalOpen(false)}
          onSubmit={handleDeclareSubmit}
        />
      )}
    </div>
  );
}

export default FreeboardPage;
