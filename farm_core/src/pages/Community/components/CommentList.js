import React from "react";
import CommentItem from "./CommentItem";

function CommentList({ comments, refreshComments }) {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          id={comment.id}
          nickname={comment.nickname}
          subContent={comment.subContent}
          refreshComments={refreshComments} // 새로고침 함수 전달
        />
      ))}
    </div>
  );
}

export default CommentList;
