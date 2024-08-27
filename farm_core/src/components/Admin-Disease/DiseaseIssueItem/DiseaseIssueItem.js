import React from "react";

function DiseaseIssueItem({ itemArr }) {
  return (
    <>
      {itemArr.map((item, idx) => {
        const { diseaseName, symptoms, diagnosisTool, therapy } = item;
        return (
          <ul key={idx}>
            <li>
              <h2>{diseaseName}</h2>
              <h3>{symptoms}</h3>
              <h4>{diagnosisTool}</h4>
              <h4>{therapy}</h4>
            </li>
          </ul>
        );
      })}
    </>
  );
}

export default DiseaseIssueItem;
