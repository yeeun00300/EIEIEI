import React, { useState } from "react";
import styles from "./CommentItem.module.scss";
import { updateComment, deleteComment } from "../../../firebase";
import { useParams } from "react-router-dom";
import siremImg from "../../../img/신고하기.png";
import DeclareModal from "./DeclareModal";

function CommentItem({
  id,
  nickname,
  subContent,
  email,
  refreshComments,
  profileImage,
  subCreatedAt,
  subDeclareReason,
  subDeclareCount,
  subDeclareState,
}) {
  const { id: postId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(subContent);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

  const localEmail = localStorage.getItem("email");

  const createdAtDate = subCreatedAt?.toDate
    ? subCreatedAt.toDate()
    : new Date();

  const handleUpdate = async () => {
    if (!updatedContent.trim()) return;
    try {
      await updateComment(postId, id, updatedContent);
      setIsEditing(false);
      refreshComments();
    } catch (error) {
      console.error("댓글 수정 중 오류:", error);
    }
  };

  const handleDelete = async () => {
    await deleteComment(postId, id);
    refreshComments();
  };

  const handleReport = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const handleSubmitReport = (reason) => {
    console.log("신고 사유:", reason);
    // 신고 사유 처리 로직 추가
    setIsModalOpen(false); // 신고 후 모달 닫기
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <img
          className={styles.profileImage}
          src={profileImage}
          alt={`${nickname}의 프로필`}
        />
        <strong className={styles.nickname}>{nickname}</strong>
      </div>

      <span className={styles.date}>{createdAtDate.toLocaleDateString()}</span>

      {isEditing ? (
        <>
          <textarea
            className={styles.textarea}
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.CommentButton} onClick={handleUpdate}>
              수정 완료
            </button>
            <button
              className={`${styles.CommentButton} ${styles.deleteButton}`}
              onClick={handleDelete}
            >
              삭제하기
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={styles.subContent}>{subContent}</p>
          <div className={styles.buttonContainer}>
            <button className={styles.reportButton} onClick={handleReport}>
              <img
                src={siremImg}
                alt="신고하기"
                className={styles.reportImage}
              />
              신고하기
            </button>
            {localEmail === email && (
              <>
                <button
                  className={styles.CommentButton}
                  onClick={() => setIsEditing(true)}
                >
                  수정하기
                </button>
                <button
                  className={`${styles.CommentButton} ${styles.deleteButton}`}
                  onClick={handleDelete}
                >
                  삭제하기
                </button>
              </>
            )}
          </div>
        </>
      )}

      {isModalOpen && (
        <DeclareModal
          onClose={handleModalClose}
          onSubmit={handleSubmitReport}
        />
      )}
    </div>
  );
}

export default CommentItem;
