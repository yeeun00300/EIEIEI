import React from "react";
import styles from "./Alarm.module.scss";
import { deleteDatas, updateDatas } from "../../firebase";

function Alarm({
  title,
  description,
  reSend,
  time,
  reSendContext,
  collectionName,
  docId,
  diseaseTypes,
  diseases,
  type,
}) {
  return (
    <ul className={styles.Alarm}>
      {!type ? (
        <li>
          {reSend ? (
            <div className={styles.AlarmBtn}>
              <button
                onClick={() => {
                  deleteDatas(collectionName, docId);
                  alert("삭제 되었습니다.");
                }}
              >
                삭제하기
              </button>
              <button
                onClick={() => {
                  updateDatas(collectionName, docId, reSendContext);
                  alert("재전송 되었습니다.");
                }}
              >
                재전송하기
              </button>
            </div>
          ) : (
            <button>전송하기</button>
          )}
          <h2>
            {title}

            <span>{time}</span>
          </h2>
          <h4>{description}</h4>
        </li>
      ) : (
        <li>
          {reSend ? (
            <div className={styles.diseaseAlarmBtn}>
              <button
                onClick={() => {
                  deleteDatas(collectionName, docId);
                  alert("삭제 되었습니다.");
                }}
              >
                삭제하기
              </button>
              <button
                onClick={() => {
                  updateDatas(collectionName, docId, reSendContext);
                  alert("재전송 되었습니다.");
                }}
              >
                재전송하기
              </button>
            </div>
          ) : (
            <button>전송하기</button>
          )}
          <h2>
            {title}

            {/* <span>{time}</span> */}
          </h2>
          <p>
            가축 종류 :
            {diseaseTypes?.map((type) => (
              <span>{` ${type} `}</span>
            ))}
          </p>
          <p>
            질병 :
            {diseases?.map((type) => (
              <span>{` ${type} `}</span>
            ))}
          </p>
        </li>
      )}
    </ul>
  );
}

export default Alarm;
