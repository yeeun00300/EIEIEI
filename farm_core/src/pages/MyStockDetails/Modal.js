import React from "react";
import styles from "./Modal.module.scss";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null; // 모달이 열리지 않으면 아무 것도 렌더링하지 않음
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

export default Modal;
