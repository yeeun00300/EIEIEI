import React from "react";
import styles from "./FreeboardItem.module.scss";
import { FaRegThumbsUp, FaRegThumbsDown } from "react-icons/fa";

function FreeBoardItem({ item, onItemClick }) {
  const handleClick = () => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.freeboardItem}>
        {item.imgUrl && <img src={item.imgUrl} alt="게시물" />}
        <div className={styles.content}>
          <a className={styles.title} onClick={handleClick}>
            {item.title}
          </a>
          <p className={styles.description}>{item.content}</p>
          <div>
            {item.declareReason && (
              <p>
                <strong>신고 사유:</strong> {item.declareReason}
              </p>
            )}
            {item.declareState && (
              <p>
                <strong>신고 상태:</strong> {item.declareState}
              </p>
            )}
            {item.declareCount > 0 && (
              <p>
                <strong>신고 횟수:</strong> {item.declareCount}
              </p>
            )}
          </div>
          <p>{`작성자: ${item.user}`}</p>
          <p>
            {`작성일: ${
              item.createdAt
                ? new Date(item.createdAt).toLocaleDateString()
                : "N/A"
            }`}
          </p>
          <p>
            {`수정일: ${
              item.updatedAt
                ? new Date(item.updatedAt).toLocaleDateString()
                : "N/A"
            }`}
          </p>
          <p>{`가축 종류: ${item.stockType || "N/A"}`}</p>
          <div className={styles.reactions}>
            <FaRegThumbsUp />
            <span>{item.like || 0}</span>
            <FaRegThumbsDown />
            <span>{item.dislike || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FreeBoardItem;
