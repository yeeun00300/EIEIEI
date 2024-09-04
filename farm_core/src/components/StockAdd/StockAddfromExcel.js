import React from "react";
import styles from "./StockAddfromExcel.module.scss";
function StockAddfromExcel({ item }) {
  console.log(item);

  return (
    <div className="page">
      <table className={styles.table}>
        <thead>
          <tr>
            {Object.keys(item).map((key) => (
              <th key={key} className={styles.th}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.values(item).map((value, index) => (
              <td key={index} className={styles.td}>
                {Array.isArray(value) ? (
                  <table className={styles.nestedTable}>
                    <tbody>
                      {value.map((subItem, subIndex) => (
                        <tr key={subIndex}>
                          {Object.entries(subItem).map(([subKey, subValue]) => (
                            <>
                              <th key={subKey} className={styles.th}>
                                {subKey}
                              </th>
                              <td key={subKey + subIndex} className={styles.td}>
                                {subValue}
                              </td>
                            </>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  value.toString()
                )}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default StockAddfromExcel;
