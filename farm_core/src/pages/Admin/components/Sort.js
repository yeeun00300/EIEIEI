import React from "react";
import styles from "./Sort.module.scss";

function Sort({ title, name, sortArr, setSort, sort }) {
  const handleChoice = (e) => {
    const target = e.target.value;
    setSort(target);
  };
  return (
    <div className={styles.Sort}>
      {title}
      {sortArr.map((item, idx) => {
        const { id, value, htmlFor } = item;
        return (
          <>
            <input
              type="radio"
              id={id}
              name={name}
              value={value}
              key={id}
              onClick={handleChoice}
            />
            <label htmlFor={htmlFor} key={id + 10}>
              {value}
            </label>
          </>
        );
      })}
    </div>
  );
}

export default Sort;
