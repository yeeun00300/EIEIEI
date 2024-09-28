import React, { useState, useEffect } from "react";
import styles from "./CommentItem.module.scss";
import { updateComment, deleteComment, db } from "../../../firebase";
import { useParams } from "react-router-dom";
import siremImg from "../../../img/신고하기.png";
import DeclareModal from "./DeclareModal";
import { reportComment } from "../../../store/communitySlice/communitySlice";
import { useDispatch } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";

function CommentItem({
  id,
  nickname,
  subContent,
  email,
  refreshComments,
  profileImage,
  subCreatedAt,
  subDeclareState,
}) {
  const { id: postId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(subContent);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasReported, setHasReported] = useState(false);
  const dispatch = useDispatch();
  const localEmail = localStorage.getItem("email");

  // const createdAtDate = subCreatedAt?.toDate
  //   ? subCreatedAt.toDate()
  //   : new Date();

  useEffect(() => {
    setUpdatedContent(subContent);
  }, [subContent]);

  useEffect(() => {
    checkReportStatus();
  }, [postId, id, localEmail]);

  const checkReportStatus = async () => {
    const reportRef = doc(db, "reports", `${localEmail}_${id}`);
    const reportSnap = await getDoc(reportRef);

    if (reportSnap.exists()) {
      setHasReported(true);
    } else {
      setHasReported(false);
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
      alert("이미 신고한 댓글입니다.");
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
      return;
    }

    dispatch(reportComment({ postId, commentId: id, reason }));

    const reportRef = doc(db, "reports", `${localEmail}_${id}`);
    await setDoc(reportRef, {
      email: localEmail,
      commentId: id,
      reason,
    });

    setHasReported(true);
    refreshComments();
    setIsModalOpen(false);
  };
  // 날짜 형식으로 변환하는 함수
  const formatDate = (date) => {
    if (!date) return "";
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("ko-KR", options).format(date);
  };

  // subCreatedAt을 Date 객체로 변환하고 포맷팅
  return (
    <div className={styles.container}>
      {/* subDeclareState에 따른 조건부 렌더링 */}
      {subDeclareState === "black" ? (
        <p className={styles.blockedComment}>차단된 댓글입니다.</p>
      ) : (
        <>
          <div className={styles.profileSection}>
            <img
              className={styles.profileImage}
              src={profileImage}
              alt={`${nickname}의 프로필`}
            />
            <strong className={styles.nickname}>{nickname}</strong>
          </div>
          <span className={styles.date}>{formatDate(subCreatedAt)}</span>

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
                      className="globalEditBtn"
                      onClick={() => setIsEditing(true)}
                    >
                      수정하기
                    </button>
                    <button className="globalDeleteBtn" onClick={handleDelete}>
                      삭제하기
                    </button>
                  </>
                )}
              </div>
            </>
          )}
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
