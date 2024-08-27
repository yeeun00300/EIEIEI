import React from "react";
import styles from "./CommentItem.module.scss";

function CommentItem({ author, content }) {
  return (
    <div className={styles.container}>
      <p>{author}</p>
      <p>{content}</p>
      <button>수정하기</button>
      <button>삭제하기</button>
    </div>
  );
}

export default CommentItem;
