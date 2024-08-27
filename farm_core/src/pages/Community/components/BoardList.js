import React from "react";
import FreeboardItem from "./FreeboardItem";
import styles from "./BoardList.module.scss";
import NoticeItem from "./NoticeItem";

function BoardList({ items, notices }) {
  return (
    <div className={styles.boardList}>
      {notices.map((notice) => (
        <NoticeItem key={notices.id} data={notice} />
      ))}
      {items.map((item) => (
        <FreeboardItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default BoardList;
