import React, { useState } from "react";
import styles from "./MyLiveStock.module.scss";
import Selected from "./Selected/Selected";
import CCTVandAnimalInfo from "../CCTVandAnimalInfo/CCTVandAnimalInfo";
import krCowIcon from "../../img/한우얼굴.png";
import diaryIcon from "../../img/낙농얼굴.png";
import pigIcon from "../../img/양돈얼굴.png";
import chickenIcon from "../../img/양계얼굴.png";
import henIcon from "../../img/산란계얼굴.png";

function MyLiveStock(props) {
  return (
    <div className="page">
      <div className={styles.container}>
        <div className={styles.icons}>
          <img className={styles.icon} src={krCowIcon} alt="" />
          <img className={styles.icon} src={diaryIcon} alt="" />
          <img className={styles.icon} src={pigIcon} alt="" />
          <img className={styles.icon} src={chickenIcon} alt="" />
          <img className={styles.icon} src={henIcon} alt="" />
        </div>
        <div className={styles.farmListInfo}>
          {/* farmList 정보 넣어서 표 만들곳 */}
          {/* 평균치 정보  */}
        </div>
        <Selected />
        <CCTVandAnimalInfo />
      </div>
    </div>
  );
}

export default MyLiveStock;
