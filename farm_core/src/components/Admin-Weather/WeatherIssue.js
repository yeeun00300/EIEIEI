import React, { useEffect, useState } from "react";
import styles from "./WeatherIssue.module.scss";
import Search from "../../pages/Admin/components/Search";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherIssueContent } from "../../store/weatherSlice/weatherSlice";
import { addDatas, getDatas } from "../../firebase";

function WeatherIssue() {
  const dispatch = useDispatch();
  const { weatherIssueContent } = useSelector((state) => state.weatherSlice);
  const [search, setSearch] = useState("");
  const [dateList, setDateList] = useState([]);
  const now = new Date();
  const createdAt = now.getTime();
  const today = now.toISOString("kr").split("T")[0].replaceAll("-", "");
  const beforeDay2 =
    now.toISOString("kr").split("T")[0].replaceAll("-", "") - 3;
  const apiKey =
    "3enTQKFbdwp7mY5McRmHelO8xxgi4LDBLefpQOsKT06WUGR3F4IhllVUPd90RuALzzzNTQuQfCGvK70tMyjJVA%3D%3D";
  // const apiKey1 =
  //   "3enTQKFbdwp7mY5McRmHelO8xxgi4LDBLefpQOsKT06WUGR3F4IhllVUPd90RuALzzzNTQuQfCGvK70tMyjJVA==";
  // const apiKey2 = "i9aTpajSSUyWk6Wo0hlMnw"; //기상청

  const getWeatherContent = async () => {
    await fetch(
      `http://apis.data.go.kr/1360000/WthrWrnInfoService/getWthrWrnMsg?serviceKey=${apiKey}&numOfRows=100&pageNo=1&dataType=JSON&stnId=108&fromTmFc=${beforeDay2}&toTmFc=${today}`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch(setWeatherIssueContent(json.response.body.items.item));
      });
  };

  const getWeatherData = async () => {
    const query = ("send", "==", "true");
    const result = await getDatas("weatherInfo", query);
    const dateResult = result.map((data) => {
      return data;
    });
    setDateList(dateResult);
  };
  const handleSendData = async (weatherIssueItem) => {
    await addDatas("weatherInfo", weatherIssueItem);
    alert("전송이 완료되었습니다.");
    setDateList((prevList) => [...prevList, weatherIssueItem]); // Add new item to dateList
  };

  useEffect(() => {
    getWeatherContent();
    getWeatherData();
  }, []);

  return (
    <div className={styles.WeatherIssue}>
      <Search setSearch={setSearch} />

      {weatherIssueContent.map((item, idx) => {
        const { t1, t2, t6, tmFc, other } = item;
        const year = `${tmFc}`.substring(0, 4);
        const month = `${tmFc}`.substring(4, 6);
        const day = `${tmFc}`.substring(6, 8);
        const hour = `${tmFc}`.substring(8, 10);
        const minute = `${tmFc}`.substring(10);
        const weatherIssueTitle = `${t2}`.substring(3).split(":")[0];
        const weatherIssueArea = `${t2}`.substring(3).split(":")[1];

        const weatherIssueDate = `${year}-${month}-${day} ${hour}:${minute}`;
        const weatherIssueItem = {
          weatherIssue: weatherIssueTitle,
          weatherDate: weatherIssueDate,
          weatherDescription: other,
          createdAt: createdAt,
          send: true,
        };
        const matchedData = dateList.find(
          (data) => data.weatherDate === weatherIssueDate
        );

        return (
          <>
            {matchedData ? (
              <></>
            ) : (
              <>
                <ul key={tmFc}>
                  <li>
                    <h2>
                      {t1} <span>{weatherIssueDate}</span>
                    </h2>
                    <h4>{`${weatherIssueTitle} - ${weatherIssueArea}`}</h4>
                    <h4>{other}</h4>

                    <button onClick={() => handleSendData(weatherIssueItem)}>
                      전송하기
                    </button>
                  </li>
                </ul>
              </>
            )}
          </>
        );
      })}
    </div>
  );
}

export default WeatherIssue;
