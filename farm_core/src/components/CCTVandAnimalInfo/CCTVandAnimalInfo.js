import React from "react";
import styles from "./CCTVandAnimalInfo.module.scss";
import cattle from "../../video/cattle2.mp4";
import cattle2 from "../../video/cattle3.mp4";
import krCow from "../../video/korea_cow2.mp4";
import krCow2 from "../../video/krCow1.mp4";
import Chick from "../../video/Chick.mp4";
import Chick2 from "../../video/poultry.mp4";
import pig from "../../video/pig.mp4";
import pig2 from "../../video/swine.mp4";
import hen from "../../video/hen1.mp4";
import hen2 from "../../video/hen2.mp4";
import {
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
} from "@mui/x-charts";
import krCowIcon from "../../img/한우얼굴.png";
import cattleIcon from "../../img/낙농얼굴.png";
import pigIcon from "../../img/양돈얼굴.png";
import chickIcon from "../../img/양계얼굴.png";
import henIcon from "../../img/산란계얼굴.png";

function CCTVandAnimalInfo({ onClick, farmData, length }) {
  const { farmAddress, farmName, farm_stockType } = farmData;
  //stockTypeCCTV 구분
  const stockTypeCCTV = () => {
    switch (farm_stockType) {
      case "한우":
        return (
          <div className={styles.cctvBox}>
            <video src={krCow} autoPlay loop muted className={styles.cctv} />
            <video src={krCow2} autoPlay loop muted className={styles.cctv} />
          </div>
        );
      case "낙농":
        return (
          <div className={styles.cctvBox}>
            <video src={cattle} autoPlay loop muted className={styles.cctv} />
            <video src={cattle2} autoPlay loop muted className={styles.cctv} />
          </div>
        );
      case "산란계":
        return (
          <div className={styles.cctvBox}>
            <video src={hen} autoPlay loop muted className={styles.cctv} />
            <video src={hen2} autoPlay loop muted className={styles.cctv} />
          </div>
        );
      case "양돈":
        return (
          <div className={styles.cctvBox}>
            <video src={pig} autoPlay loop muted className={styles.cctv} />
            <video src={pig2} autoPlay loop muted className={styles.cctv} />
          </div>
        );
      case "육계":
        return (
          <div className={styles.cctvBox}>
            <video src={Chick} autoPlay loop muted className={styles.cctv} />
            <video src={Chick2} autoPlay loop muted className={styles.cctv} />
          </div>
        );
      default:
        return (
          <div className={styles.cctvBox}>
            <div>가축 정보가 없습니다</div>
          </div>
        ); // 기본
    }
  };

  //stockTypeIcon 구분
  const stockTypeIcon = () => {
    switch (farm_stockType) {
      case "한우":
        return <img className={styles.icon} src={krCowIcon} alt="" />;
      case "낙농":
        return <img className={styles.icon} src={cattleIcon} alt="" />;
      case "산란계":
        return <img className={styles.icon} src={henIcon} alt="" />;
      case "양돈":
        return <img className={styles.icon} src={pigIcon} alt="" />;
      case "육계":
        return <img className={styles.icon} src={chickIcon} alt="" />;
      default:
        return <div>가축 정보가 없습니다.</div>; // 기본
    }
  };

  return (
    <>
      <div className={styles.liveStockInfoBox}>
        {stockTypeCCTV()}
        <div className={styles.dataBox}>
          <div>{stockTypeIcon()}</div>
          <div>
            <p>{farmName}</p>
            <p>{farmAddress}</p>
          </div>
          <div>
            <p>
              가축 수
              <br />
              {length}
            </p>
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
