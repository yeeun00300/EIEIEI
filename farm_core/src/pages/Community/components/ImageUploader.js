import React, { useState } from "react";
import styles from "./ImageUploader.module.scss";

function ImageUploader({ onImageUpload }) {
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        onImageUpload(file); // 부모 컴포넌트로 파일 전달
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={styles.imageUploader}>
      <label htmlFor="file-upload" className={styles.uploadLabel}>
        {previewImage ? (
          <img
            src={previewImage}
            alt="Preview"
            className={styles.imagePreview}
          />
        ) : (
          "이미지 등록하기"
        )}
      </label>
      <input
        type="file"
        id="file-upload"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ImageUploader;
