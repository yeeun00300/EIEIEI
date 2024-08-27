import React, { useState } from "react";
import styles from "./NewBoardPage.module.scss";
import ImageUploader from "./components/ImageUploader";

function NewBoardPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 제출 로직 작성 (예: 서버에 데이터 보내기)
    console.log("Title:", title);
    console.log("Content:", content);
    console.log("Iamge:", image);
    // 폼 초기화
    setTitle("");
    setContent("");
    setImage(null);
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
        <button>취소하기</button>
      </form>
    </div>
  );
}

export default NewBoardPage;
