import React, { useEffect, useState } from "react";
import styles from "./DiseaseUser.module.scss";
import {
  cow_diagnosis,
  chicken_diagnosis,
  pork_diagnosis,
} from "../../utils/Disease";
import Accordion from "react-bootstrap/Accordion";
import Sort from "../../pages/Admin/components/Sort";

function DiseaseUser() {
  const [sort, setSort] = useState("소");
  const [stockType, setStockType] = useState(cow_diagnosis);

  useEffect(() => {
    if (sort == "소") {
      setStockType(cow_diagnosis);
    } else if (sort == "돼지") {
      setStockType(pork_diagnosis);
    } else if (sort == "닭") {
      setStockType(chicken_diagnosis);
    }
  }, [stockType, sort]);
  return (
    <>
      <Sort
        title=""
        name="member"
        setSort={setSort}
        sortArr={[
          { id: "cow", value: "소", htmlFor: "cow" },
          { id: "pig", value: "돼지", htmlFor: "pig" },
          { id: "chicken", value: "닭", htmlFor: "chicken" },
        ]}
      />
      <div className={styles.DiseaseUser}>
        {stockType.map((item, idx) => {
          const { diseaseName, symptoms, diagnosisTool, therapy } = item;

          return (
            <Accordion defaultActiveKey="0" flush key={idx}>
              <Accordion.Item eventKey={idx}>
                <Accordion.Header>{diseaseName}</Accordion.Header>
                <Accordion.Body>
                  <p>
                    증상 : <span>{symptoms}</span>
                  </p>
                  <p>
                    치료 방법 : <span>{therapy}</span>
                  </p>
                  <p>
                    진단 방법 : <span>{diagnosisTool}</span>
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          );
        })}
      </div>
    </>
  );
}

export default DiseaseUser;
