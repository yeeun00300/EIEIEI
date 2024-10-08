import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import {
  createCommunityPost,
  fetchCommunityPosts,
  updateCommunityPost,
} from "../../../store/communitySlice/communitySlice";
import { uploadImage } from "../../../firebase";
import ImageUploader from "../../../pages/Community/components/ImageUploader";
import styles from "./NoticeAdd.module.scss";

function NoticeAdd({ setOpen }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState("notice");
  const [livestockType, setLivestockType] = useState(""); // 축산 유형 상태
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

    let imageUrl = postData?.imgUrl; // 기존 이미지를 우선 사용

    // 이미지가 새로 선택된 경우에만 업로드
    if (image && typeof image !== "string") {
      try {
        imageUrl = await uploadImage("community/", image);
        setOpen(false);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
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
      notice: "true",
      communityType: "notice",
      authorNickName: userNickName,
      email: email,
    };

    // console.log("제출할 데이터 객체:", dataObj); // 데이터 객체 확인

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
              {
                field: "communityType",
                operator: "==",
                value: selectedBoard,
              },
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
    <div className={styles.NoticeAdd}>
      <h2>{postData ? "게시물 수정하기" : "새 글 쓰기"}</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.group}>
          {/* <label htmlFor="boardType">게시판 선택</label>
          <select
            id="boardType"
            value={selectedBoard}
            onChange={(e) => setSelectedBoard(e.target.value)}
            required
          >
            <option value="freeboard">공지사항</option>
            <option value="livestock">축산 관리 커뮤니티</option>
          </select> */}
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
        <button type="submit" className="submitBtn">
          {postData ? "수정하기" : "공지 등록하기"}
        </button>
        <button
          type="button"
          onClick={() => {
            navigate(-1);
            setOpen(false);
          }}
        >
          취소하기
        </button>
      </form>
    </div>
  );
}

export default NoticeAdd;
