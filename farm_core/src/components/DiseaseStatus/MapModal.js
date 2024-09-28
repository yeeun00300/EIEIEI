import React from "react";
import styles from "./MapModal.module.scss"; // 스타일 정의

const MapModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // 모달이 열려 있지 않으면 아무것도 렌더링하지 않음

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className="squareGlobalDeleteBtn" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default MapModal;
