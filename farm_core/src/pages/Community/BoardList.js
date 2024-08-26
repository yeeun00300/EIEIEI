import React from "react";
import FreeboardItem from "./FreeboardItem";
import styles from "./BoardList.module.scss";

function BoardList({ items }) {
  return (
    <div className={styles.boardList}>
      {items.map((item) => (
        <FreeboardItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default BoardList;
