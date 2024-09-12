import React, { useState } from "react";
import styles from "./NewBoardPage.module.scss";
import { useDispatch } from "react-redux";
import { createCommunityPost } from "../../store/communitySlice/communitySlice";
import ImageUploader from "./components/ImageUploader";

function NewBoardPage({ onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState("freeboard"); // 기본값은 자유게시판
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataObj = {
        title,
        content,
        imgUrl: image,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        like: 0,
        dislike: 0,
        declareReason: "",
        declareState: "",
        declareCount: 0,
        stockType: "",
        notice: false,
        communityType: selectedBoard,
      };

      // 선택한 게시판에 따라 데이터 전송
      await dispatch(
        createCommunityPost({
          collectionName: selectedBoard,
          dataObj,
        })
      );

      setTitle("");
      setContent("");
      setImage(null);
      onCancel();
    } catch (error) {
      console.error("새 글 등록 실패:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>새 글 쓰기</h2>
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
          <ImageUploader onImageUpload={(file) => setImage(file)} />
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요."
            required
          ></textarea>
        </div>
        <button type="submit" className="submitBtn">
          글 등록하기
        </button>
        <button type="button" onClick={onCancel}>
          취소하기
        </button>
      </form>
    </div>
  );
}

export default NewBoardPage;
