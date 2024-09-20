import React, { useEffect, useState } from "react";
import {
  cow_diagnosis,
  pork_diagnosis,
  chicken_diagnosis,
} from "../../utils/Disease";
import DiseaseIssueItem from "./DiseaseIssueItem/DiseaseIssueItem";
import styles from "./DiseaseIssue.module.scss";
import Search from "../../pages/Admin/components/Search";

function DiseaseIssue() {
  const [search, setSearch] = useState("");
  useEffect(() => {}, [search]);
  return (
    <div className={styles.DiseaseIssue}>
      <Search setSearch={setSearch} />
      <DiseaseIssueItem itemArr={cow_diagnosis} />
      <DiseaseIssueItem itemArr={chicken_diagnosis} />
      <DiseaseIssueItem itemArr={pork_diagnosis} />
    </div>
  );
}

export default DiseaseIssue;
