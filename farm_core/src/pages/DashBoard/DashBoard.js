import React, { useEffect, useState } from "react";
import styles from "./DashBoard.module.scss";
import { LineChart } from "@mui/x-charts/LineChart";
import { json } from "react-router";
import LineChart01 from "../../components/Chart/LineChart01";

const dataset = [
  { x: 1, y: 0.8 },
  { x: 2, y: 1.2 },
  { x: 3, y: 2.6 },
  { x: 5, y: 3.6 },
  { x: 8, y: 4.8 },
  { x: 10, y: 5.8 },
  { x: 12, y: 7 },
];
const initializeData = {
  main: { humidity: 0, temp_max: 0, temp_min: 0 },
  weather: [{ description: "" }],
};

function DashBoard() {
  // 날씨 state
  const [weatherData, setWeatherData] = useState(initializeData);
  const APIkey = "6e3669d9ce0d4e84eddd41c90c38ab37";

  const success = (position) => {
    const latitude = 36.328799;
    const longitude = 127.4230707;
    // const latitude = position.coords.latitude;
    // const longitude = position.coords.longitude;

    const weatherResult = getWeather(latitude, longitude);
  };

  const getWeather = async (lat, lon) => {
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=kr`
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        // console.log(json);
        // const { name, rain, weather, wind } = json;
        // console.log(name, rain, weather, wind);
        setWeatherData(json);
      });
  };

  // const { humidity, temp_max, temp_min } = main;
  const {
    main: { humidity, temp_max, temp_min, temp },
    weather,
  } = weatherData;
  const { description } = weather[0];

  const newTime = new Date();
  const yyyymmdd = newTime.toISOString().split("T")[0].replaceAll("-", "");
  const getTime1 = newTime.toISOString().split("T")[1].split(":")[0];
  const getTime2 = newTime.toISOString().split("T")[1].split(":")[1];
  const finalTime = yyyymmdd + getTime1 + getTime2;
  const BeforeHour = String(getTime1 - 1);
  const finalTimeB =
    yyyymmdd +
    (BeforeHour.length <= 1 ? 0 + BeforeHour : BeforeHour) +
    getTime2;
  const openUrl = `https://apihub.kma.go.kr/api/typ01/url/wrn_inf_rpt.php?tmfc1=${finalTimeB}&tmfc2=${finalTime}&disp=0&help=1&authKey=i9aTpajSSUyWk6Wo0hlMnw`;
  const openWindow = () => {
    window.open(openUrl, "_blank", "width=600, height=600");
  };
  // console.log(finalTime, finalTimeB);

  // 기상 특보
  function callJsonApi(url, saveFilePath) {
    // Text API 호출 함수
    fetch(url) // fetch를 통해 API 호출
      .then((response) => response.text()) // 응답을 JSON으로 변환
      .then((data) => {
        console.log(data); // 데이터 출력
        // saveFilePath를 사용하여 데이터를 저장하거나 추가적인 처리를 수행할 수 있습니다.
        // saveFilePath;
      })
      .catch((error) => {
        console.error("API 호출 중 오류가 발생했습니다:", error);
        // 오류 처리를 수행할 수 있습니다.
      });
  }

  // 사용 예시
  const apiUrl = `/api1/api/typ01/url/wrn_inf_rpt.php?tmfc1=${finalTimeB}&tmfc2=${finalTime}&disp=0&help=1&authKey=i9aTpajSSUyWk6Wo0hlMnw`;
  // "https://apihub.kma.go.kr/api/json?authKey=i9aTpajSSUyWk6Wo0hlMnw";
  const savePath = "/path/to/save/file.json";
  callJsonApi(apiUrl, savePath);

  // openUrl 내용 가져오기
  function callOpenUrl() {
    // openUrl의 내용을 fetch API로 호출
    fetch(openUrl)
      .then((response) => response.text())
      .then((data) => {
        const newEncoder = new TextEncoder();
        const bytes = newEncoder.encode("한");
        console.log(bytes);

        const binaryArray = Array.from(bytes, (byte) => {
          return byte.toString(2);
        });
        const binaryString = binaryArray.join(" ");

        const textDecoder = new TextDecoder("euc-kr");

        // console.log(binaryString);

        console.log(textDecoder.decode(data)); // openUrl의 내용을 console.log로 출력
      })
      .catch((error) => {
        console.error("openUrl 호출 중 오류가 발생했습니다:", error);
        // 오류 처리를 수행할 수 있습니다.
      });
  }

  useEffect(() => {
    success();
    callJsonApi();
  }, []);

  return (
    <>
      <h1>날씨</h1>
      <p>{description}</p>
      <h1>현재 온도</h1>
      <p> {temp}℃ </p>
      {/* <p>최소 : {temp_min}℃ </p>
      <p>최대 : {temp_max}℃ </p> */}
      <h1>습도</h1>
      <p>최대 : {humidity}% </p>
      <button onClick={openWindow()}>특보 정보</button>
      <h1>체중</h1>
      <LineChart01
        dataset={dataset}
        color={"#78909c"}
        xInterval={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        yInterval={[1, 3, 5, 7, 9, 11]}
        height={200}
        width={800}
      />
      {/* <LineChart
        dataset={dataset}
        xAxis={[
          {
            dataKey: "x",
            tickInterval: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          },
        ]}
        yAxis={[{ tickInterval: [1, 3, 5, 7, 9, 11] }]}
        series={[{ dataKey: "y", color: "#78909c" }]}
        height={200}
        width={800}
        margin={{ left: 30, right: 30, top: 30, bottom: 30 }}
        grid={{ horizontal: true }}
        // loading={true}
        // grid={{ vertical: true, horizontal: true }}
      /> */}
    </>
  );
}

export default DashBoard;
