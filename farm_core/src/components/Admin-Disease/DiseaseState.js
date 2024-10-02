import React, { useEffect, useState } from "react";
import styles from "./DiseaseState.module.scss";
import { addDatas, getDatas } from "../../firebase";

const getCurrentMonth = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = ("0" + (today.getMonth() + 1)).slice(-2);
  return `${year}-${month}`;
};

function DiseaseState() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [dateList, setDateList] = useState([]);
  const now = new Date();
  const createdAt = now.getTime();

  const handleMonthChange = async (e) => {
    const monthDisplay = e.target.value;
    const month = e.target.value.replace("-", "");
    console.log(`Selected Month: ${month}`);
    setSelectedMonth(monthDisplay);

    const apiURL = `/api6/openapi/ef47786d3eabcb9f87d0c7d3b301f869312d4cf9af878855b06ed3c153a53290/json/Grid_20220621000000000615_1/1/5/?QRANT_COMPT_MT=${month}`;
    console.log(apiURL);

    try {
      const response = await fetch(apiURL);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      console.log("jsonData", jsonData);
      const rows = jsonData.Grid_20220621000000000615_1.row;
      console.log("rows", rows);

      const regionalData = rows.reduce((acc, row) => {
        const locale = row.CTPRVN_NM;
        const count = row.OCCRRNC_CNT;
        const animalType = row.LVSTCK_KIND_CD_NM;

        if (!acc[locale]) {
          acc[locale] = { count: 0, diseases: [], animalTypes: new Set() };
        }

        acc[locale].count += count;
        acc[locale].diseases.push(row.DISE_CD_NM);
        acc[locale].animalTypes.add(animalType);

        return acc;
      }, {});

      const formattedData = Object.entries(regionalData).map(
        ([locale, info]) => ({
          locale,
          count: info.count,
          diseases: info.diseases,
          animalTypes: Array.from(info.animalTypes),
        })
      );

      console.log("최종 데이터", formattedData);
      setData(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const apiKey =
  //   "ef47786d3eabcb9f87d0c7d3b301f869312d4cf9af878855b06ed3c153a53290";
  // const getDiseaseInfo = async (lat, lon) => {
  //   await fetch(
  //     //   `http://211.237.50.150:7080/openapi/API_KEY=${apiKey}/TYPE=json/API_URL=Grid_20151204000000000316_1/START_INDEX=1/END_INDEX=5`
  //     `http://211.237.50.150:7080/openapi/8ff445232570cefa9e0e97bd6c153f916d1adf5cd25b4f421a6e0d44b48d65fd/json/Grid_20220621000000000615_1/?QRANT_COMPT_MT=202208`
  //   )
  //     .then((response) => {
  //       // console.log(response);
  //       return response.json();
  //     })
  //     .then((json) => {
  //       console.log(json);
  //     });
  // };
  // useEffect(() => {
  //   getDiseaseInfo();
  // }, [search]);

  const getDiseaseData = async () => {
    const query = ("send", "==", "true");
    const result = await getDatas("diseaseInfo", query);
    const dateResult = result.map((data) => {
      return data;
    });
    setDateList(dateResult);
  };

  // 파이어베이스 저장
  const handleSendData = async (diseaseItem) => {
    await addDatas("diseaseInfo", diseaseItem);
    alert("전송이 완료되었습니다.");
    setDateList((prevList) => [...prevList, diseaseItem]); // Add new item to dateList
  };

  useEffect(() => {
    getDiseaseData();
  }, []);
  return (
    <div className={styles.DiseaseState}>
      <div className={styles.DiseaseCard}>
        <div className={styles.DiseaseDate}>
          <h1>월별 질병 데이터</h1>
          <input
            type="month"
            value={selectedMonth}
            // value={selectedMonth.slice(0, 4) + "-" + selectedMonth.slice(4)}
            onChange={handleMonthChange}
          />
        </div>
        <div className={styles.DiseaseContainer}>
          {data.map((item) => {
            const { animalTypes, count, diseases, locale } = item;
            const diseaseItem = {
              diseaseTypes: animalTypes,
              diseases: diseases,
              locale: locale,
              count: count,
              createdAt: createdAt,
              send: true,
            };
            const matchedData = dateList.find(
              (data) => data.diseases === diseases
            );
            return (
              <div key={item.id} className={styles.DiseaseItem}>
                <h2>{locale}</h2>
                <p>
                  가축 종류 :{" "}
                  {animalTypes.map((type) => (
                    <span>{` ${type} `}</span>
                  ))}
                </p>
                <p>
                  질병 :{" "}
                  {diseases.map((type) => (
                    <span>{` ${type} `}</span>
                  ))}
                </p>
                {matchedData ? (
                  <></>
                ) : (
                  <button
                    onClick={() => handleSendData(diseaseItem)}
                    className={styles.sendBtn}
                  >
                    전송하기
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DiseaseState;
