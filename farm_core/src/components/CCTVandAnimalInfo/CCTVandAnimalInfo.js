import React from "react";
import styles from "./CCTVandAnimalInfo.module.scss";
import cattle1 from "../../video/cattle.mp4";
import Chick from "../../video/Chick.mp4";
import swine from "../../video/swine.mp4";
import {
  GaugeContainer,
  GaugeReferenceArc,
  GaugeValueArc,
} from "@mui/x-charts";

function CCTVandAnimalInfo(props) {
  return (
    <>
      <div className={styles.liveStockInfoBox}>
        <div className={styles.dataBox}>
          <div>Data1: 소는 귀엽다</div>
          <div>Data2: 소는 잘먹는다</div>
          <div>Data3: 소는 맛있다</div>
          <div>Data4: 이렇게 쓰는게 맞나</div>
        </div>
        <div className={styles.cctvBox}>
          <video src={cattle1} autoPlay loop muted className={styles.cctv} />
        </div>
      </div>
      {/* <div className={styles.liveStockInfoBox}>
        <div className={styles.dataBox}>
          <div>Data1: 소는 귀엽다</div>
          <div>Data2: 소는 잘먹는다</div>
          <div>Data3: 소는 맛있다</div>
          <div>Data4: 이렇게 쓰는게 맞나</div>
        </div>
        <div className={styles.cctvBox}>
          <video src={Chick} autoPlay loop muted className={styles.cctv} />
        </div>
      </div>
      <div className={styles.liveStockInfoBox}>
        <div className={styles.dataBox}>
          <div>Data1: 소는 귀엽다</div>
          <div>Data2: 소는 잘먹는다</div>
          <div>Data3: 소는 맛있다</div>
          <div>Data4: 이렇게 쓰는게 맞나</div>
        </div>
        <div className={styles.cctvBox}>
          <video src={swine} autoPlay loop muted className={styles.cctv} />
        </div>
      </div> */}
    </>
  );
}

export default CCTVandAnimalInfo;
