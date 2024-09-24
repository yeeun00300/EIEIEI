import React, { useEffect } from "react";
import styles from "./DeclareStateCard.module.scss";
import { useDispatch } from "react-redux";
import { reportPost } from "../../../store/communitySlice/communitySlice";
import Button from "react-bootstrap/esm/Button";

function DeclareStateCard({
  setOpen,
  email,
  authorNickName,
  title,
  content,
  declareCount,
  declareState,
  declareReason,
  id,
}) {
  const dispatch = useDispatch();
  const handleBlackClick = async (state) => {
    try {
      if (declareState == "reported") {
        await dispatch(
          reportPost({
            id: id,
            reason: declareReason,
            state: "black",
          })
        ).unwrap();
        setOpen(false);
      } else if (declareState == "checked") {
        await dispatch(
          reportPost({
            id: id,
            reason: declareReason,
            state: "black",
          })
        ).unwrap();
        setOpen(false);
      } else if (declareState == "black") {
        await dispatch(
          reportPost({
            id: id,
            reason: declareReason,
            state: "checked",
          })
        ).unwrap();
        setOpen(false);
      } else {
        await dispatch(
          reportPost({
            id: id,
            reason: declareReason,
            state: "reported",
          })
        ).unwrap();
        setOpen(false);
      }
    } catch (error) {
      console.error("좋아요 업데이트 실패:", error);
    }
  };

  return (
    <div className={styles.DeclareCard}>
      {/* <div className={styles.DeclareStateCard}>
        <div>{title}</div>
        <button className={styles.cancelBtn} onClick={() => setOpen(false)}>
          X
        </button>
        <div>
          {authorNickName} - (<span>{email}</span>)
        </div>
        <div>{content}</div>
        <div>신고 된 횟수 {declareCount}</div>
      </div> */}
      <div className={styles.DeclareList}>
        <div>신고사유</div>
        <ul>
          {declareReason ? (
            declareReason?.map((item, idx) => {
              return <li key={idx}>{item}</li>;
            })
          ) : (
            <div> 사유가 없음!</div>
          )}
        </ul>
      </div>
      <div className={styles.DeclareBtn}>
        {declareState == "black" ? (
          <Button onClick={handleBlackClick}>차단해체하기</Button>
        ) : (
          <Button onClick={handleBlackClick}>차단하기</Button>
        )}
      </div>
    </div>
  );
}

export default DeclareStateCard;
