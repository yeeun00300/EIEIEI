import React from "react";
import styles from "./CCTVandAnimalInfo.module.scss";
import cattle1 from "../../video/cattle.mp4";
import krCow from "../../video/korea_cow2.mp4";
import krCow2 from "../../video/krCow1.mp4";
import Chick from "../../video/Chick.mp4";
import swine from "../../video/swine.mp4";
import {
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
} from "@mui/x-charts";
import krCowIcon from "../../img/한우얼굴.png";

function CCTVandAnimalInfo({ onClick }) {
  return (
    <>
      <div className={styles.liveStockInfoBox}>
        <div className={styles.cctvBox}>
          <video src={krCow} autoPlay loop muted className={styles.cctv} />
          <video src={krCow2} autoPlay loop muted className={styles.cctv} />
        </div>
        <div className={styles.dataBox}>
          <div>
            <img className={styles.icon} src={krCowIcon} alt="" />
          </div>
          <div>Data2: 농장 이름, 위치</div>
          <div>
            Data3: 가축 수
            <button onClick={() => onClick("chart1")}>차트 보기</button>
          </div>
          <div>
            Data4: 사료/물 소비량
            <button onClick={() => onClick("chart2")}>차트 보기</button>
          </div>
          <div>
            Data5: 온도/습도
            <button onClick={() => onClick("chart3")}>차트 보기</button>
          </div>
          <div>
            Data6: 생산량
            <button onClick={() => onClick("chart4")}>차트 보기</button>
          </div>
          <div>
            Data7: 건강상태
            <button onClick={() => onClick("chart5")}>차트 보기</button>
          </div>
          <div>
            Data8: 백신 및 접종기록
            <button onClick={() => onClick("chart6")}>차트 보기</button>
          </div>
          <div>
            Data9: 폐사율
            <button onClick={() => onClick("chart7")}>차트 보기</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CCTVandAnimalInfo;
