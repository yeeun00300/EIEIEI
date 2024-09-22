import React from "react";
import styles from "./Search.module.scss";
import searchImg from "../../../img/돋보기.png";

function Search({ setSearch, placeholder = "검색어를 입력해 주세요!" }) {
  const handleChange = (e) => {
    const search = e.target.value;
    setSearch(search);
  };
  return (
    <div className={styles.Search}>
      <span>
        <img src={searchImg} />
      </span>
      <input placeholder={placeholder} onChange={handleChange} />
    </div>
  );
}

export default Search;
