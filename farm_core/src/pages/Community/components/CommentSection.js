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
  const email = useSelector((state) => state.checkLoginSlice.checkLogin.email);
  const profileImage = useSelector(
    (state) => state.checkLoginSlice.checkLogin.profileImages
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
      nickname: nickname,
      subContent: newComment,
      email: email,
      profileImage: profileImage,
      subDeclareCount: 0,
      subDeclareReason: "",
      subDeclareState: "",
    };

    await addComment(id, comment);

    // 댓글 추가 후 최신 댓글 목록을 가져옴
    fetchComments();
    setNewComment(""); // 입력 필드 초기화
  };

  return (
    <div className={styles.commentSection}>
      <h2>댓글</h2>
      <CommentList comments={comments} refreshComments={fetchComments} />

      <div className={styles.textareaContainer}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
          className={styles.commentText}
        />
        <button onClick={handleAddComment} className={styles.addComment}>
          댓글 추가
        </button>
      </div>
    </div>
  );
}

export default CommentSection;
