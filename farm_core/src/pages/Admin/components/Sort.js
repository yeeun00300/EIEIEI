import React from "react";
import styles from "./Sort.module.scss";

function Sort({ title, name, sortArr, setSort }) {
  const handleChoice = (e) => {
    const target = e.target.value;
    setSort(target);
  };
  return (
    <div className={styles.Sort}>
      {title}
      {sortArr.map((sort, idx) => {
        const { id, value, htmlFor } = sort;
        return (
          <>
            <input
              type="radio"
              id={id}
              name={name}
              value={value}
              key={idx}
              onClick={handleChoice}
            />
            <label htmlFor={htmlFor} key={idx + 10}>
              {value}
            </label>
          </>
        );
      })}
    </div>
  );
}

export default Sort;
