import React from "react";
import CommentItem from "./CommentItem";

function CommentList({ comments }) {
  return (
    <div>
      {comments.map((comment, index) => (
        <CommentItem
          key={index}
          author={comment.author}
          content={comment.content}
        />
      ))}
    </div>
  );
}

export default CommentList;
