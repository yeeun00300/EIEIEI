import React, { useEffect, useState } from "react";
import {
  cattle_diagnosis,
  swine_diagnosis,
  poultry_diagnosis,
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
      <DiseaseIssueItem itemArr={cattle_diagnosis} />
      <DiseaseIssueItem itemArr={swine_diagnosis} />
      <DiseaseIssueItem itemArr={poultry_diagnosis} />
    </div>
  );
}

export default DiseaseIssue;
