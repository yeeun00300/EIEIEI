import React, { useState } from "react";
import styles from "./NewBoardPage.module.scss";
import { useDispatch } from "react-redux";
import { createCommunityPost } from "../../store/communitySlice/communitySlice";
import ImageUploader from "./components/ImageUploader";
import { uploadImage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";

function NewBoardPage({ onCancel }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
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
      };
      await dispatch(
        createCommunityPost({ collectionName: "community", dataObj })
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
