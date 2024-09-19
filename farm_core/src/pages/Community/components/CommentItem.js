import React, { useState } from "react";
import styles from "./CommentItem.module.scss";
import { updateComment, deleteComment } from "../../../firebase"; // 수정, 삭제 함수 import
import { useParams } from "react-router-dom";

function CommentItem({ id, nickname, subContent, refreshComments }) {
  const { id: postId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(subContent);

  // 댓글 수정 기능
  const handleUpdate = async () => {
    if (!updatedContent.trim()) return;

    try {
      console.log("수정하려는 댓글 ID:", id);

      await updateComment(postId, id, updatedContent);
      setIsEditing(false);
      refreshComments(); // 댓글 목록 새로고침
    } catch (error) {
      console.error("댓글 수정 중 오류:", error);
    }
  };

  // 댓글 삭제 기능
  const handleDelete = async () => {
    await deleteComment(postId, id);
    refreshComments(); // 댓글 목록 새로고침
  };

  return (
    <div className={styles.container}>
      <p>
        <strong>{nickname}</strong>
      </p>

      {isEditing ? (
        <>
          <textarea
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <button onClick={handleUpdate}>수정 완료</button>
        </>
      ) : (
        <>
          <p>{subContent}</p>
          <button onClick={() => setIsEditing(true)}>수정하기</button>
        </>
      )}

      <button onClick={handleDelete}>삭제하기</button>
    </div>
  );
}

export default CommentItem;
