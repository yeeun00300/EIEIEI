import React from "react";
import styles from "./Alarm.module.scss";

function Alarm({ title, description, reSend }) {
  return (
    <ul className={styles.Alarm}>
      <li>
        {reSend ? <button>재전송하기</button> : <button>전송하기</button>}
        <h1>{title}</h1>
        <p>2024-08-27 00:00:00</p>
        <h3>{description}</h3>
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
