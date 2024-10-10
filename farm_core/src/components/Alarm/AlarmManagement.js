import React, { useEffect, useState } from "react";
import Alarm from "./Alarm";
import { getDatas } from "../../firebase";
import { useSelector } from "react-redux";
import styles from "./AlarmManagement.module.scss";

function AlarmManagement({ reSend, sort }) {
  // const [sort, setSort] = useState("전부");
  const [weatherIssueAlarm, setWeatherIssueAlarm] = useState([]);
  const [search, setSearch] = useState("");
  const { onWeatherIssueAlarm } = useSelector((state) => state.weatherSlice);
  const handleLoad = async () => {
    const query = ("send", "==", "true");
    try {
      const result = await getDatas("weatherInfo", query);
      setWeatherIssueAlarm(result);
    } catch (error) {}
  };
  useEffect(() => {
    handleLoad();
  }, [onWeatherIssueAlarm]);

  return (
    <div className={styles.weatherAlarm}>
      {weatherIssueAlarm.map((item) => {
        const now = new Date();
        const newTime = now.getTime();
        const {
          weatherDate,
          weatherDescription,
          weatherIssue,
          send,
          createdAt,
          docId,
        } = item;
        // 알림 업데이트
        const reWeatherIssueItem = {
          weatherIssue: weatherIssue,
          weatherDate: weatherDate,
          weatherDescription: weatherDescription,
          createdAt: createdAt,
          updatedAt: newTime,
          send: true,
        };
        return (
          <Alarm
            title={weatherIssue}
            time={weatherDate}
            description={weatherDescription}
            collectionName={"weatherInfo"}
            reSend={send}
            reSendContext={reWeatherIssueItem}
            docId={docId}
            key={createdAt}
          />
        );
      })}
    </div>
  );
}

export default AlarmManagement;
