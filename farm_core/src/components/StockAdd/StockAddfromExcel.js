import React from "react";
import styles from "./StockAddfromExcel.module.scss";

const order = [
  "stockType",
  "variety",
  "farmId",
  "stockId",
  "farmAddress",
  "incomingDate",
  "sex",
  "size",
  "weight",
  "birthDate",
  "feed",
  "drink",
  "activity",
  "temp",
  "isolation",
  "mating(bool)",
  "pregnantDate",
  "vaccine",
  "disease",
  "breedCount",
  "birthDate",
  "expectedBirthDate",
  "milk",
  "deceased(bool)",
  "eggProduction",
];

function StockAddfromExcel({ items }) {
  if (!Array.isArray(items)) {
    return <p>Invalid data</p>;
  }

  const renderTableHeader = () => (
    <thead>
      <tr>
        {order.map((key) => (
          <th key={key} className={styles.th}>
            {key}
          </th>
        ))}
      </tr>
    </thead>
  );

  const renderTableBody = () => (
    <tbody>
      {items.map((item, rowIndex) => (
        <tr key={rowIndex}>
          {order.map((key) => (
            <td key={key} className={styles.td}>
              {Array.isArray(item[key]) ? (
                <div>
                  {item[key].map((subItem, subIndex) => {
                    // Convert object to string
                    const subItemString = Object.entries(subItem)
                      .map(([type, date]) => `${type}: ${date}`)
                      .join(", ");
                    return <p key={subIndex}>{subItemString || "X"}</p>;
                  })}
                </div>
              ) : (
                item[key]?.toString() || "X"
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );

  return (
    <table className={styles.table}>
      {renderTableHeader()}
      {renderTableBody()}
    </table>
  );
}

export default StockAddfromExcel;
