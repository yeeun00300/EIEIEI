import React, { useState } from "react";
import styles from "./MyLiveStock.module.scss";
import Selected from "./Selected/Selected";
import CCTVandAnimalInfo from "../CCTVandAnimalInfo/CCTVandAnimalInfo";
function MyLiveStock(props) {
  return (
    <div className={styles.container}>
      <Selected />
      <CCTVandAnimalInfo />
      <div className={styles.boarder}>
        <div>
          <p>현재 온도 : 28.5</p>
          <p>추천 세팅 : 31.5</p>
          <button>적용</button>
        </div>
        <div>
          <p>현재 습도 : 55%</p>
          <p>추천 세팅 : 70%</p>
          <button>적용</button>
        </div>
        <div>
          <p>사료량 : 구역당 1kg</p>
          <p>추천 세팅 : 1.2kg</p>
          <button>적용</button>
        </div>
        <div>
          <p>환기시스템 : off</p>
          <p>추천 세팅 : on</p>
          <button>적용</button>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button>축사 추가 하기</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <button>축사 삭제 하기</button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default MyLiveStock;
