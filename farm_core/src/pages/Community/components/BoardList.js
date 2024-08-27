import React from "react";
import styles from "./BoardList.module.scss";
import NoticeItem from "./NoticeItem";
import FreeBoardItem from "./FreeboardItem";

function BoardList({ items, renderItem, notices }) {
  return (
    <div className={styles.boardList}>
      {/* notices 배열을 통해 NoticeItem 컴포넌트 렌더링 */}
      {notices.map((notice) => (
        <NoticeItem key={notice.id} notice={notice} />
      ))}

      {/* items 배열을 통해 FreeBoardItem 컴포넌트 렌더링 */}
      {items.map((item) => (
        <FreeBoardItem key={item.id} item={item} />
      ))}
    </div>

    // <div className={styles.boardList}>
    //   {notices.map((notice) => renderItem(notice))}
    //   {items.map((item) => renderItem(item))}
    // </div>

    // <div className={styles.boardList}>
    //   {notices.map((notice) => (
    //     <NoticeItem key={notices.id} data={notice} />
    //   ))}
    //   {items.map((item) => (
    //     <FreeBoardItem key={item.id} data={item} />
    //   ))}
    // </div>
  );
}

export default BoardList;
