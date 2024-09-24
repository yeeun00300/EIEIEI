import React, { useState, useEffect } from "react";
import styles from "./CommentItem.module.scss";
import { updateComment, deleteComment, db } from "../../../firebase";
import { useParams } from "react-router-dom";
import siremImg from "../../../img/신고하기.png";
import DeclareModal from "./DeclareModal";
import { reportComment } from "../../../store/communitySlice/communitySlice";
import { useDispatch } from "react-redux";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";

function CommentItem({
  id,
  nickname,
  subContent,
  email,
  refreshComments,
  profileImage,
  subCreatedAt,
}) {
  const { id: postId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(subContent);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasReported, setHasReported] = useState(false); // 신고 여부 상태
  const dispatch = useDispatch();
  const localEmail = localStorage.getItem("email");

  const createdAtDate = subCreatedAt?.toDate
    ? subCreatedAt.toDate()
    : new Date();

  useEffect(() => {
    setUpdatedContent(subContent);
  }, [subContent]);

  useEffect(() => {
    checkReportStatus(); // 컴포넌트가 마운트될 때 신고 여부 확인
  }, [postId, id, localEmail]);

  const checkReportStatus = async () => {
    const reportRef = doc(db, "reports", `${localEmail}_${id}`);
    const reportSnap = await getDoc(reportRef);

    if (reportSnap.exists()) {
      setHasReported(true); // 이미 신고한 경우
    } else {
      setHasReported(false); // 신고하지 않은 경우
    }
  };

  const handleUpdate = async () => {
    if (!updatedContent.trim()) return;

    try {
      const commentRef = doc(db, "community", postId, "comments", id);
      await updateComment(commentRef, { subContent: updatedContent });
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
    if (hasReported) {
      alert("이미 신고한 댓글입니다."); // 신고한 경우 알림
      return;
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const handleSubmitReport = async (reason) => {
    if (!id) {
      console.error("Invalid comment ID");
      return; // ID가 유효하지 않을 경우 함수 종료
    }

    // 신고 처리 로직
    dispatch(reportComment({ postId, commentId: id, reason }));

    // 신고 이력 저장
    const reportRef = doc(db, "reports", `${localEmail}_${id}`);
    await setDoc(reportRef, {
      email: localEmail,
      commentId: id,
      reason,
      timestamp: new Date(),
    });

    // 상태 업데이트
    setHasReported(true);
    refreshComments();
    setIsModalOpen(false);
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
