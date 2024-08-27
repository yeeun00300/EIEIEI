import React from "react";
import {
  cattle_diagnosis,
  swine_diagnosis,
  poultry_diagnosis,
} from "../../utils/Disease";
import DiseaseIssueItem from "./DiseaseIssueItem/DiseaseIssueItem";
import styles from "./DiseaseIssue.module.scss";

function DiseaseIssue() {
  return (
    <div className={styles.DiseaseIssue}>
      <DiseaseIssueItem itemArr={cattle_diagnosis} />
      <DiseaseIssueItem itemArr={swine_diagnosis} />
      <DiseaseIssueItem itemArr={poultry_diagnosis} />
    </div>
  );
}

export default DiseaseIssue;
