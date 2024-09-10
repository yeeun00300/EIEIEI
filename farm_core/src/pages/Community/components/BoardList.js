import React from "react";
import styles from "./BoardList.module.scss";
import NoticeItem from "./NoticeItem";
import FreeBoardItem from "./FreeboardItem";

function BoardList({ items, notices, onItemClick }) {
  return (
    <div className={styles.boardList}>
      {/* notices 배열을 통해 NoticeItem 컴포넌트 렌더링 */}
      {/* {notices.map((notice) => (
        <NoticeItem key={notice.id} notice={notice} />
      ))} */}

      {/* items 배열을 통해 FreeBoardItem 컴포넌트 렌더링 */}
      {items.map((item) => (
        <FreeBoardItem key={item.id} item={item} onItemClick={onItemClick} />
      ))}
    </div>
  );
}
export default BoardList;
