import React, { useState } from "react";
import styles from "./DeclareModal.module.scss";

function DeclareModal({ onClose, onSubmit }) {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!reason) {
      alert("신고 사유를 입력해 주세요.");
      return;
    }
    onSubmit(reason);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>게시물 신고하기</h2>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="신고 사유를 입력하세요."
        />
        <div className={styles.actions}>
          <button onClick={handleSubmit}>신고하기</button>
          <button onClick={onClose}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default DeclareModal;
