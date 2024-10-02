import React from "react";
import styles from "./CCTVAnimal.module.scss";
import cattle from "../../../video/cattle2.mp4";
import cattle2 from "../../../video/cattle3.mp4";
import krCow from "../../../video/korea_cow2.mp4";
import krCow2 from "../../../video/krCow1.mp4";
import Chick from "../../../video/Chick.mp4";
import Chick2 from "../../../video/poultry.mp4";
import pig from "../../../video/pig.mp4";
import pig2 from "../../../video/swine.mp4";
import hen from "../../../video/hen1.mp4";
import hen2 from "../../../video/hen2.mp4";

function CCTVAnimal({ stockType }) {
  // const farm_stockType = useSelector(
  //   (state) => state.AddLiveStockSlice.farm_stockType
  // );
  // console.log("Farm Stock Type from Redux: ", farm_stockType);
  const stockTypeCCTVAnimal = () => {
    switch (stockType) {
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
        );
    }
  };

  return <> {stockTypeCCTVAnimal()}</>;
}

export default CCTVAnimal;
