import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./NewBoardPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createCommunityPost,
  fetchCommunityPosts,
  updateCommunityPost,
} from "../../store/communitySlice/communitySlice";
import ImageUploader from "./components/ImageUploader";
import { uploadImage } from "../../firebase";

function NewBoardPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState("freeboard");
  const [livestockType, setLivestockType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중인지 여부 상태

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { postData } = location.state || {}; // Retrieve postData from location state

  const userNickName =
    useSelector((state) => state.checkLoginSlice.checkLogin.nickname) ||
    "닉네임 없음";

  const email = useSelector((state) => state.checkLoginSlice.checkLogin.email);

  useEffect(() => {
    if (postData) {
      setTitle(postData.title || "");
      setContent(postData.content || "");
      setImage(postData.imgUrl || null); // 기존 이미지 URL을 설정
      setSelectedBoard(postData.communityType || "freeboard");
      setLivestockType(postData.stockType || "");
    }
  }, [postData]);

  const mapLivestockType = (type) => {
    switch (type) {
      case "한우":
        return "koreanCow";
      case "낙농":
        return "dairyCow";
      case "양돈":
        return "pork";
      case "양계":
        return "chicken";
      case "산란계":
        return "eggChicken";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    // 이미지가 없을 경우 alert를 띄우고 제출 중단
    if (!image && !postData?.imgUrl) {
      alert("이미지를 등록해야 합니다.");
      setIsSubmitting(false);
      return; // 함수 종료
    }

    let imageUrl = postData?.imgUrl; // 기존 이미지를 우선 사용

    // 이미지가 새로 선택된 경우에만 업로드
    if (image && typeof image !== "string") {
      try {
        imageUrl = await uploadImage("community/", image);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        setIsSubmitting(false);
        return; // 업로드 실패 시 함수 종료
      }
    }
    const dataObj = {
      title,
      content,
      imgUrl: imageUrl, // 새 이미지가 없으면 기존 이미지 URL 사용
      createdAt: postData?.createdAt || new Date().getTime(),
      updatedAt: new Date().getTime(),
      like: postData?.like || 0,
      dislike: postData?.dislike || 0,
      declareReason: postData?.declareReason || "",
      declareState: postData?.declareState || "",
      declareCount: postData?.declareCount || 0,
      stockType: mapLivestockType(livestockType),
      notice: postData?.notice || false,
      communityType: selectedBoard,
      authorNickName: userNickName,
      email: email,
    };

    try {
      if (postData) {
        // 기존 포스트 업데이트
        await dispatch(
          updateCommunityPost({
            id: postData.id,
            updates: dataObj,
            imgUrl: imageUrl, // 업데이트된 이미지 URL 전달
          })
        ).unwrap();
      } else {
        // 새 포스트 생성
        await dispatch(
          createCommunityPost({
            communityType: selectedBoard,
            dataObj,
          })
        ).unwrap();
      }

      // 포스트 목록 새로고침
      await dispatch(
        fetchCommunityPosts({
          communityType: selectedBoard,
          queryOptions: {
            conditions: [
              { field: "communityType", operator: "==", value: selectedBoard },
            ],
          },
        })
      );

      // 페이지 이동
      if (selectedBoard === "freeboard") {
        navigate("/My_Farm_Board_FreeBoard");
      } else if (selectedBoard === "livestock") {
        navigate("/My_Farm_Board_Community");
      }

      // 상태 초기화
      setTitle("");
      setContent("");
      setImage(null);
    } catch (error) {
      console.error("게시글 등록 또는 수정 실패:", error);
    }
  };
  return (
    <div className="page">
      <div className={styles.container}>
        <h2>{postData ? "게시물 수정하기" : "새 글 쓰기"}</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.group}>
            <label htmlFor="boardType">게시판 선택</label>
            <select
              id="boardType"
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value)}
              required
            >
              <option value="freeboard">자유게시판</option>
              <option value="livestock">축산 관리 커뮤니티</option>
            </select>
          </div>
          {selectedBoard === "livestock" && (
            <div className={styles.group}>
              <label htmlFor="livestockType">축산 업종 선택</label>
              <select
                id="livestockType"
                value={livestockType}
                onChange={(e) => setLivestockType(e.target.value)}
                required
              >
                <option value="한우">한우</option>
                <option value="낙농">낙농</option>
                <option value="양돈">양돈</option>
                <option value="양계">양계</option>
                <option value="산란계">산란계</option>
              </select>
            </div>
          )}
          <div className={styles.group}>
            <label htmlFor="title">제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력해 주세요."
              required
            />
          </div>
          <div className={styles.group}>
            <label htmlFor="content">내용</label>
            <ImageUploader
              onImageUpload={(file) => setImage(file)}
              existingImageUrl={postData?.imgUrl} // 기존 이미지 URL을 전달
            />
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력해 주세요."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="squareGlobalBtn"
            disabled={isSubmitting}
          >
            {postData ? "수정하기" : "글 등록하기"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="squareGlobalDeleteBtn"
          >
            취소하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewBoardPage;
