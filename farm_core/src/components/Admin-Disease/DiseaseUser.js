import React from "react";
import styles from "./DiseaseUser.module.scss";

function DiseaseUser() {
  const diseaseInfo = [
    {
      ROW_NUM: 30000,
      ICTSD_OCCRRNC_NO: "00113728",
      LKNTS_NM: "결핵병",
      FARM_NM: "황우석",
      FARM_LOCPLC_LEGALDONG_CODE: "4161034024",
      FARM_LOCPLC: "경기도 광주시 퇴촌면 영동리",
      OCCRRNC_DE: "20150824",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 1,
      DGNSS_ENGN_CODE: "6410601",
      DGNSS_ENGN_NM: "경기 남부지소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30001,
      ICTSD_OCCRRNC_NO: "00113729",
      LKNTS_NM: "결핵병",
      FARM_NM: "이춘호",
      FARM_LOCPLC_LEGALDONG_CODE: "4617035025",
      FARM_LOCPLC: "전라남도 나주시 동강면 장동리",
      OCCRRNC_DE: "20150731",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 5,
      DGNSS_ENGN_CODE: "6460724",
      DGNSS_ENGN_NM: "전남 축산위생사업소",
      CESSATION_DE: "",
    },
  ];
  return (
    <div className={styles.DiseaseUser}>
      {/* <Search setSearch={setSearch} /> */}
      {diseaseInfo.map((item, idx) => {
        return (
          <div key={idx} className={styles.diseaseState}>
            <h2>
              ⁎ {item.LKNTS_NM} ( {item.LVSTCKSPC_NM} )
              <span> {item.OCCRRNC_DE}</span>
            </h2>
            <h3>
              {item.FARM_NM} : <span>{item.FARM_LOCPLC}</span>
            </h3>
            {/* <div>{item.LVSTCKSPC_NM}</div>
            <div>{item.CESSATION_DE}</div> */}
            {/* 
            <div>{item.ICTSD_OCCRRNC_NO}</div>
            <div>{item.FARM_NM}</div>
            <div>{item.FARM_LOCPLC_LEGALDONG_CODE}</div>
            <div>{item.LVSTCKSPC_CODE}</div>
            <div>{item.OCCRRNC_LVSTCKCNT}</div>
            <div>{item.DGNSS_ENGN_CODE}</div> */}
          </div>
        );
      })}
    </div>
  );
}

export default DiseaseUser;
