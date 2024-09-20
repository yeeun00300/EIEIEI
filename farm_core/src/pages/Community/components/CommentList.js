import React from "react";
import CommentItem from "./CommentItem";

function CommentList({ comments, refreshComments }) {
  return (
    <div>
      {comments.map((comment) => (
        <CommentItem
          key={comment.docId}
          id={comment.id}
          nickname={comment.nickname}
          subContent={comment.subContent}
          email={comment.email}
          profileImage={comment.profileImage}
          subCreatedAt={comment.subCreatedAt}
          subDeclareReason={comment.subDeclareReason}
          subDeclareCount={comment.subDeclareCount}
          subDeclareState={comment.subDeclareState}
          refreshComments={refreshComments}
        />
      ))}
    </div>
  );
}

export default CommentList;
