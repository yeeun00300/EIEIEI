import React, { useState } from "react";
import styles from "./MyLiveStock.module.scss";
import Selected from "./Selected/Selected";
import CCTVandAnimalInfo from "../CCTVandAnimalInfo/CCTVandAnimalInfo";
import krCowIcon from "../../img/한우얼굴.png";
import diaryIcon from "../../img/낙농얼굴.png";
import pigIcon from "../../img/양돈얼굴.png";
import chickenIcon from "../../img/양계얼굴.png";
import henIcon from "../../img/산란계얼굴.png";
import BiLineChart from "../Chart/BiLineChart";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

function MyLiveStock(props) {
  const [farm, setFarm] = useState("");

  const handleChange = (event) => {
    setFarm(event.target.value);
  };
  return (
    <div className="page">
      <div className={styles.container}>
        <div className={styles.myFarmInfoBox}>
          <div className={styles.selectDiv}>
            <h3>축사 선택</h3>
            <select className={styles.selectBox}>
              <option>예은이네 1농장</option>
              <option>예은이네 2농장</option>
              <option>예은이네 3농장</option>
              <option>예은이네 4농장</option>
            </select>
            <button>확인</button>
          </div>
          <div className={styles.cctv}>
            <CCTVandAnimalInfo />
          </div>
        </div>
        <div className={styles.farmInfoBox}>
          <div className={styles.farmListInfo}>
            <h3>전체 평균 데이터</h3>
            <table className={styles.styledTable}>
              <thead>
                <tr>
                  <th>농장 이름</th>
                  <th>총 개체 수</th>
                  <th>평균 무게</th>
                  <th>질병 발생 비율(1달)</th>
                  <th>격리 개체 수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>예은이네 1농장</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                </tr>
                <tr>
                  <td>예은이네 2농장</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                </tr>
                <tr>
                  <td>예은이네 3농장</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                  <td>6000</td>
                </tr>
                <tr className={styles.active}>
                  <td>총 합계</td>
                  <td>5150</td>
                  <td>5150</td>
                  <td>5150</td>
                  <td>5150</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h3>축사 데이터 확인</h3>
            <BiLineChart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyLiveStock;
