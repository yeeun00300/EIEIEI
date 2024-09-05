import React from "react";
import styles from "./Alarm.module.scss";
import { updateDatas } from "../../firebase";

function Alarm({
  title,
  description,
  reSend,
  time,
  reSendContext,
  collectionName,
  docId,
}) {
  const handleClick = () => {};
  return (
    <ul className={styles.Alarm}>
      <li>
        {reSend ? (
          <button
            onClick={() => {
              updateDatas(collectionName, docId, reSendContext);
              alert("재전송 되었습니다.");
            }}
          >
            재전송하기
          </button>
        ) : (
          <button>전송하기</button>
        )}
        <h2>
          {title}

          <span>{time}</span>
        </h2>
        <h4>{description}</h4>
      </li>
      {/* <li>
        <h1>{title}</h1>
        <p>2024-08-27 00:00:00</p>
        <h3>{description}</h3>
      </li> */}
    </ul>
  );
}

export default Alarm;
