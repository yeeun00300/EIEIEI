import React from "react";
import styles from "./StockAddfromExcel.module.scss";

const order = [
  "ActivityLevel",
  "AnimalID",
  "AnimalLocation",
  "AnimalType",
  "BarnNumber",
  "BirthDate",
  "DiseasesAndTreatments",
  "EggProduction",
  "EntryDate",
  "EstrusStatus",
  "FeedIntake",
  "Gender",
  "GrowthRate",
  "IsolationStatus",
  "MilkProduction",
  "NumberOfBirths",
  "PregnancyDate",
  "Size",
  "Temperature",
  "Vaccination",
  "WaterIntake",
  "Weight",
  "출산 예정일",
];

function StockAddfromExcel({ item }) {
  // item이 객체일 경우 처리
  if (typeof item !== "object" || item === null) {
    return <p>Invalid data</p>;
  }

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            {order.map((key) => (
              <th key={key} className={styles.th}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {order.map((key) => (
              <td key={key} className={styles.td}>
                {Array.isArray(item[key]) ? (
                  <table className={styles.nestedTable}>
                    <tbody>
                      {item[key].map((subItem, subIndex) => (
                        <tr key={subIndex}>
                          {Object.entries(subItem).map(([subKey, subValue]) => (
                            <React.Fragment key={subKey}>
                              <th className={styles.th}>{subKey}</th>
                              <td className={styles.td}>{subValue}</td>
                            </React.Fragment>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  item[key]?.toString() || "X"
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default StockAddfromExcel;
