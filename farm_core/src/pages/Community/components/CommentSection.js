import React, { useState } from "react";
import styles from "./CommentSection.module.scss";
import CommentList from "./CommentList";

function CommentSection() {
  const [comments, setComments] = useState([
    { author: "사용자1", content: "어서오세요!" },
    { author: "사용자2", content: "환영합니다!" },
  ]);

  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { author: "나", content: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div className={styles.commentSection}>
      <h2>댓글</h2>
      <div className={styles.commentForm}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={handleAddComment}>댓글 작성</button>
      </div>
      <CommentList comments={comments} />
    </div>
  );
}

export default CommentSection;
