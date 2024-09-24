import React, { useState } from "react";
import styles from "./DeclareModal.module.scss";
import sirenImg from "../../../img/신고하기.png";

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
        <div className={styles.modalHeader}>
          <img src={sirenImg} alt="신고 아이콘" className={styles.sirenImage} />
          <h2>신고하기</h2>
        </div>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="신고 사유를 입력하세요."
          className={styles.textarea}
        />
        <div className={styles.actions}>
          <button onClick={handleSubmit} className={styles.submitButton}>
            신고하기
          </button>
          <button onClick={onClose} className={styles.cancelButton}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeclareModal;
