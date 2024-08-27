import React from "react";
import styles from "./BoardList.module.scss";
import NoticeItem from "./NoticeItem";
import FreeBoardItem from "./FreeboardItem";

function BoardList({ items, notices }) {
  return (
    <div className={styles.boardList}>
      {notices.map((notice) => (
        <NoticeItem key={notices.id} data={notice} />
      ))}
      {items.map((item) => (
        <FreeBoardItem key={item.id} data={item} />
      ))}
    </div>
  );
}

export default BoardList;
