import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addComment, getComments } from "../../../firebase";

function CommentSection() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(id);
      setComments(fetchedComments);
    };

    fetchComments();
  }, [id]);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const comment = {
      author: "User Email", // 실제 사용자 이메일로 변경
      content: newComment,
    };

    await addComment(id, comment);
    setNewComment("");
    const updatedComments = await getComments(id);
    setComments(updatedComments);
  };

  return (
    <div>
      <h2>댓글</h2>
      <div>
        {comments.map((comment) => (
          <div key={comment.id}>
            <p>
              <strong>{comment.author}</strong>: {comment.content}
            </p>
          </div>
        ))}
      </div>
      <textarea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="댓글을 입력하세요..."
      />
      <button onClick={handleAddComment}>댓글 추가</button>
    </div>
  );
}

export default CommentSection;
