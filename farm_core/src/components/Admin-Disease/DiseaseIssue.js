import React, { useEffect, useState } from "react";
import {
  cow_diagnosis,
  pork_diagnosis,
  chicken_diagnosis,
} from "../../utils/Disease";
import DiseaseIssueItem from "./DiseaseIssueItem/DiseaseIssueItem";
import styles from "./DiseaseIssue.module.scss";
import Search from "../../pages/Admin/components/Search";
import { getDatas } from "../../firebase";
import Alarm from "../Alarm/Alarm";

function DiseaseIssue() {
  const [search, setSearch] = useState("");
  const [diseaseAlarm, setDiseaseAlarm] = useState([]);
  const handleLoad = async () => {
    const query = ("send", "==", "true");
    try {
      const result = await getDatas("diseaseInfo", query);
      // console.log(result);
      setDiseaseAlarm(result);
    } catch (error) {}
  };
  useEffect(() => {
    handleLoad();
  }, [search]);
  return (
    <div className={styles.DiseaseAlarm}>
      {/* <Search setSearch={setSearch} /> */}
      {/* <DiseaseIssueItem itemArr={cow_diagnosis} />
      <DiseaseIssueItem itemArr={chicken_diagnosis} />
      <DiseaseIssueItem itemArr={pork_diagnosis} /> */}
      {diseaseAlarm?.map((item) => {
        const now = new Date();
        const newTime = now.getTime();
        const {
          diseaseTypes,
          count,
          diseases,
          locale,
          send,
          docId,
          createdAt,
        } = item;
        const reDiseaseItem = {
          ...item,
          updatedAt: newTime,
        };
        return (
          <Alarm
            title={locale}
            // time={weatherDate}
            // description={weatherDescription}
            collectionName={"diseaseInfo"}
            reSend={send}
            reSendContext={reDiseaseItem}
            docId={docId}
            key={createdAt}
            diseaseTypes={diseaseTypes}
            diseases={diseases}
            type="disease"
          />
        );
      })}
    </div>
  );
}

export default DiseaseIssue;
