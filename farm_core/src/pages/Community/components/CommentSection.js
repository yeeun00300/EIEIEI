import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addComment, getComments } from "../../../firebase";
import { useSelector } from "react-redux";
import CommentList from "./CommentList";
import styles from "./CommentSection.module.scss";

function CommentSection() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const nickname = useSelector(
    (state) => state.checkLoginSlice.checkLogin.nickname
  );

  const fetchComments = async () => {
    const fetchedComments = await getComments(id);
    setComments(fetchedComments);
  };

  useEffect(() => {
    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const comment = {
      nickname: nickname, // 사용자 닉네임
      subContent: newComment,
    };

    await addComment(id, comment);
    setNewComment("");
    fetchComments();
  };

  return (
    <div className={styles.commentSection}>
      <h2>댓글</h2>
      {/* CommentList에 comments와 refreshComments 전달 */}
      <CommentList comments={comments} refreshComments={fetchComments} />

      <div className={styles.textareaContainer}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <button onClick={handleAddComment}>댓글 추가</button>
      </div>
    </div>
  );
}

export default CommentSection;
