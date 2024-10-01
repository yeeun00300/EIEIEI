import React, { useEffect, useState } from "react";
import {
  cow_diagnosis,
  pork_diagnosis,
  chicken_diagnosis,
} from "../../utils/Disease";
import DiseaseIssueItem from "./DiseaseIssueItem/DiseaseIssueItem";
import styles from "./DiseaseIssue.module.scss";
import Search from "../../pages/Admin/components/Search";
import { getDatas, getQuery } from "../../firebase";
import Alarm from "../Alarm/Alarm";
import { useCollectionData } from "react-firebase-hooks/firestore";

function DiseaseIssue() {
  const [search, setSearch] = useState("");
  const [diseaseAlarm, setDiseaseAlarm] = useState([]);

  // // 실시간 질병 알림
  const diseaseConditions = [];
  const diseaseOrderBys = [{ field: "createdAt", direction: "desc" }];
  const diseaseQ = getQuery("diseaseInfo", {
    conditions: diseaseConditions,
    orderBys: diseaseOrderBys,
  });
  const [diseaseInfo] = useCollectionData(diseaseQ);

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
  }, [search, diseaseInfo?.length]);
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
