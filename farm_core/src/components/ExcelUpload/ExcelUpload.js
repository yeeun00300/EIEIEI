import React, { useState } from "react";
import { uploadExcelAndSaveData } from "../../firebase";
import styles from "./ExcelUpload.module.scss";

function ExcelUpload(props) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileUpload = async () => {
    if (!file) {
      alert("파일을 선택해주세요");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      await uploadExcelAndSaveData(file, "stock");
      alert("파일이 성공적으로 업로드 및 저장 되었습니다.");
    } catch (error) {
      console.error("파일 업로드 중 오류 발생 : ", error);
      alert("파일 업로드 중 오류 발생");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={(e) => setFile(e.target.files[0])}
        className={styles.fileInput}
      />
      <button
        onClick={handleFileUpload}
        disabled={uploading}
        // className={styles.uploadButton}
        className="globalEditBtn"
      >
        {uploading ? "업로드 중..." : "저장하기"}
      </button>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
}

export default ExcelUpload;
