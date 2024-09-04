import React, { useEffect, useState } from "react";
import styles from "./WeatherIssue.module.scss";
import Search from "../../pages/Admin/components/Search";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherIssueContent } from "../../store/weatherSlice/weatherSlice";

function WeatherIssue() {
  const dispatch = useDispatch();
  const { weatherIssueContent } = useSelector((state) => state.weatherSlice);
  const [search, setSearch] = useState("");
  const now = new Date();
  const today = now.toISOString("kr").split("T")[0].replaceAll("-", "");
  const beforeDay2 =
    now.toISOString("kr").split("T")[0].replaceAll("-", "") - 2;
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
  useEffect(() => {
    getWeatherContent();
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
        return (
          <ul key={idx}>
            <li>
              <h2>
                {t1} <span>{`${year}-${month}-${day} ${hour}:${minute}`}</span>
              </h2>
              <h4>{t2}</h4>
              <h4>{other}</h4>
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default WeatherIssue;
