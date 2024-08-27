import React, { useEffect } from "react";
import styles from "./DiseaseState.module.scss";

function DiseaseState() {
  const apiKey =
    "ef47786d3eabcb9f87d0c7d3b301f869312d4cf9af878855b06ed3c153a53290";
  const getDiseaseInfo = async (lat, lon) => {
    await fetch(
      //   `http://211.237.50.150:7080/openapi/API_KEY=${apiKey}/TYPE=json/API_URL=Grid_20151204000000000316_1/START_INDEX=1/END_INDEX=5`
      `211.237.50.150:7080/openapi/ef47786d3eabcb9f87d0c7d3b301f869312d4cf9af878855b06ed3c153a53290/json/Grid_20151204000000000316_1/1/5`
    )
      .then((response) => {
        // console.log(response);
        // return response.json();
      })
      .then((json) => {
        // console.log(json);
      });
  };
  useEffect(() => {
    getDiseaseInfo();
  }, []);

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
    {
      ROW_NUM: 30002,
      ICTSD_OCCRRNC_NO: "00113730",
      LKNTS_NM: "결핵병",
      FARM_NM: "강신근",
      FARM_LOCPLC_LEGALDONG_CODE: "4683033024",
      FARM_LOCPLC: "전라남도 영암군 신북면 갈곡리",
      OCCRRNC_DE: "20150817",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 3,
      DGNSS_ENGN_CODE: "6460724",
      DGNSS_ENGN_NM: "전남 축산위생사업소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30003,
      ICTSD_OCCRRNC_NO: "00113772",
      LKNTS_NM: "결핵병",
      FARM_NM: "노인태",
      FARM_LOCPLC_LEGALDONG_CODE: "4122031029",
      FARM_LOCPLC: "경기도 평택시 진위면 가곡리",
      OCCRRNC_DE: "20150824",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 1,
      DGNSS_ENGN_CODE: "6410598",
      DGNSS_ENGN_NM: "경기도축산위생연구소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30004,
      ICTSD_OCCRRNC_NO: "00113844",
      LKNTS_NM: "결핵병",
      FARM_NM: "홍성효",
      FARM_LOCPLC_LEGALDONG_CODE: "4155036024",
      FARM_LOCPLC: "경기도 안성시 양성면 추곡리",
      OCCRRNC_DE: "20150820",
      LVSTCKSPC_CODE: "412003",
      LVSTCKSPC_NM: "소-육우",
      OCCRRNC_LVSTCKCNT: 2,
      DGNSS_ENGN_CODE: "6410601",
      DGNSS_ENGN_NM: "경기 남부지소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30005,
      ICTSD_OCCRRNC_NO: "00113846",
      LKNTS_NM: "결핵병",
      FARM_NM: "문춘웅",
      FARM_LOCPLC_LEGALDONG_CODE: "4713025626",
      FARM_LOCPLC: "경상북도 경주시 건천읍 화천리",
      OCCRRNC_DE: "20150826",
      LVSTCKSPC_CODE: "412004",
      LVSTCKSPC_NM: "소-젖소",
      OCCRRNC_LVSTCKCNT: 12,
      DGNSS_ENGN_CODE: "6470192",
      DGNSS_ENGN_NM: "경북 동부지소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30006,
      ICTSD_OCCRRNC_NO: "00113918",
      LKNTS_NM: "브루셀라병",
      FARM_NM: "서인갑",
      FARM_LOCPLC_LEGALDONG_CODE: "4874037021",
      FARM_LOCPLC: "경상남도 창녕군 계성면 명리",
      OCCRRNC_DE: "20150727",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 2,
      DGNSS_ENGN_CODE: "6481102",
      DGNSS_ENGN_NM: "경남 동부지소",
      CESSATION_DE: "20150727",
    },
    {
      ROW_NUM: 30007,
      ICTSD_OCCRRNC_NO: "00113921",
      LKNTS_NM: "결핵병",
      FARM_NM: "문영재",
      FARM_LOCPLC_LEGALDONG_CODE: "4874037026",
      FARM_LOCPLC: "경상남도 창녕군 계성면 봉산리",
      OCCRRNC_DE: "20150826",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 3,
      DGNSS_ENGN_CODE: "6481102",
      DGNSS_ENGN_NM: "경남 동부지소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30008,
      ICTSD_OCCRRNC_NO: "00113926",
      LKNTS_NM: "결핵병",
      FARM_NM: "김만수",
      FARM_LOCPLC_LEGALDONG_CODE: "4782037041",
      FARM_LOCPLC: "경상북도 청도군 매전면 남양리",
      OCCRRNC_DE: "20150827",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 13,
      DGNSS_ENGN_CODE: "6470189",
      DGNSS_ENGN_NM: "경북 가축위생시험소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30009,
      ICTSD_OCCRRNC_NO: "00113952",
      LKNTS_NM: "결핵병",
      FARM_NM: "연성흠",
      FARM_LOCPLC_LEGALDONG_CODE: "4374531027",
      FARM_LOCPLC: "충청북도 증평군 도안면 도당리",
      OCCRRNC_DE: "20150828",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 1,
      DGNSS_ENGN_CODE: "6430089",
      DGNSS_ENGN_NM: "충북 축산위생연구소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30010,
      ICTSD_OCCRRNC_NO: "00102882",
      LKNTS_NM: "결핵병",
      FARM_NM: "이방웅",
      FARM_LOCPLC_LEGALDONG_CODE: "4423039035",
      FARM_LOCPLC: "충청남도 논산시 양촌면 명암리",
      OCCRRNC_DE: "20150117",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 1,
      DGNSS_ENGN_CODE: "6410598",
      DGNSS_ENGN_NM: "경기도축산위생연구소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30011,
      ICTSD_OCCRRNC_NO: "00102883",
      LKNTS_NM: "결핵병",
      FARM_NM: "한일",
      FARM_LOCPLC_LEGALDONG_CODE: "4148025626",
      FARM_LOCPLC: "경기도 파주시 법원읍 삼방리",
      OCCRRNC_DE: "20150121",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 1,
      DGNSS_ENGN_CODE: "6410598",
      DGNSS_ENGN_NM: "경기도축산위생연구소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30012,
      ICTSD_OCCRRNC_NO: "00102884",
      LKNTS_NM: "브루셀라병",
      FARM_NM: "최삼도",
      FARM_LOCPLC_LEGALDONG_CODE: "4713025322",
      FARM_LOCPLC: "경상북도 경주시 안강읍 사방리",
      OCCRRNC_DE: "20150122",
      LVSTCKSPC_CODE: "412004",
      LVSTCKSPC_NM: "소-젖소",
      OCCRRNC_LVSTCKCNT: 3,
      DGNSS_ENGN_CODE: "6470192",
      DGNSS_ENGN_NM: "경북 동부지소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30013,
      ICTSD_OCCRRNC_NO: "00102935",
      LKNTS_NM: "결핵병",
      FARM_NM: "이행도",
      FARM_LOCPLC_LEGALDONG_CODE: "4683035026",
      FARM_LOCPLC: "전라남도 영암군 도포면 영호리",
      OCCRRNC_DE: "20150108",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 33,
      DGNSS_ENGN_CODE: "6460724",
      DGNSS_ENGN_NM: "전남 축산위생사업소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30014,
      ICTSD_OCCRRNC_NO: "00102936",
      LKNTS_NM: "결핵병",
      FARM_NM: "이양수",
      FARM_LOCPLC_LEGALDONG_CODE: "4683031028",
      FARM_LOCPLC: "전라남도 영암군 덕진면 금강리",
      OCCRRNC_DE: "20150108",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 22,
      DGNSS_ENGN_CODE: "6460724",
      DGNSS_ENGN_NM: "전남 축산위생사업소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30015,
      ICTSD_OCCRRNC_NO: "00102937",
      LKNTS_NM: "결핵병",
      FARM_NM: "조영식",
      FARM_LOCPLC_LEGALDONG_CODE: "4683035026",
      FARM_LOCPLC: "전라남도 영암군 도포면 영호리",
      OCCRRNC_DE: "20150109",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 4,
      DGNSS_ENGN_CODE: "6460724",
      DGNSS_ENGN_NM: "전남 축산위생사업소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30016,
      ICTSD_OCCRRNC_NO: "00102938",
      LKNTS_NM: "결핵병",
      FARM_NM: "정평수",
      FARM_LOCPLC_LEGALDONG_CODE: "4683035026",
      FARM_LOCPLC: "전라남도 영암군 도포면 영호리",
      OCCRRNC_DE: "20150109",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 1,
      DGNSS_ENGN_CODE: "6460724",
      DGNSS_ENGN_NM: "전남 축산위생사업소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30017,
      ICTSD_OCCRRNC_NO: "00102939",
      LKNTS_NM: "결핵병",
      FARM_NM: "정정선덕진축사",
      FARM_LOCPLC_LEGALDONG_CODE: "4683025028",
      FARM_LOCPLC: "전라남도 영암군 영암읍 용흥리",
      OCCRRNC_DE: "20150110",
      LVSTCKSPC_CODE: "412002",
      LVSTCKSPC_NM: "소-한우",
      OCCRRNC_LVSTCKCNT: 2,
      DGNSS_ENGN_CODE: "6460724",
      DGNSS_ENGN_NM: "전남 축산위생사업소",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30018,
      ICTSD_OCCRRNC_NO: "00102974",
      LKNTS_NM: "구제역",
      FARM_NM: "피그넷",
      FARM_LOCPLC_LEGALDONG_CODE: "4375034029",
      FARM_LOCPLC: "충청북도 진천군 백곡면 사송리",
      OCCRRNC_DE: "20150107",
      LVSTCKSPC_CODE: "413098",
      LVSTCKSPC_NM: "돼지-비분류",
      OCCRRNC_LVSTCKCNT: 8,
      DGNSS_ENGN_CODE: "1543082",
      DGNSS_ENGN_NM: "구제역진단과",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30019,
      ICTSD_OCCRRNC_NO: "00102975",
      LKNTS_NM: "고병원성 조류인플루엔자",
      FARM_NM: "한성농장",
      FARM_LOCPLC_LEGALDONG_CODE: "4150025030",
      FARM_LOCPLC: "경기도 이천시 장호원읍 나래리",
      OCCRRNC_DE: "20150126",
      LVSTCKSPC_CODE: "415003",
      LVSTCKSPC_NM: "닭-산란계",
      OCCRRNC_LVSTCKCNT: 6,
      DGNSS_ENGN_CODE: "1543084",
      DGNSS_ENGN_NM: "조류질병과",
      CESSATION_DE: "",
    },
    {
      ROW_NUM: 30020,
      ICTSD_OCCRRNC_NO: "00102976",
      LKNTS_NM: "고병원성 조류인플루엔자",
      FARM_NM: "최철규",
      FARM_LOCPLC_LEGALDONG_CODE: "4165036023",
      FARM_LOCPLC: "경기도 포천시 영중면 거사리",
      OCCRRNC_DE: "20150126",
      LVSTCKSPC_CODE: "415003",
      LVSTCKSPC_NM: "닭-산란계",
      OCCRRNC_LVSTCKCNT: 10,
      DGNSS_ENGN_CODE: "1543084",
      DGNSS_ENGN_NM: "조류질병과",
      CESSATION_DE: "",
    },
  ];

  return (
    <div className={styles.DiseaseState}>
      {diseaseInfo.map((item, idx) => {
        return (
          <div key={idx} className={styles.diseaseState}>
            <h2>
              ⁎ {item.LKNTS_NM} ( {item.LVSTCKSPC_NM} )
              <span> {item.OCCRRNC_DE}</span>
            </h2>
            <h3>
              {item.DGNSS_ENGN_NM} : <span>{item.FARM_LOCPLC}</span>
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
      ;
    </div>
  );
}

export default DiseaseState;
