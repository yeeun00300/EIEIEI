import React, { useEffect, useState } from "react";
import styles from "./AdminStock.module.scss";
import Sort from "../../pages/Admin/components/Sort";
import Search from "../../pages/Admin/components/Search";
import DateRangePickerValue from "../../pages/Admin/components/DateRangePickerValue";
function AdminStock() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  useEffect(() => {}, [search, sort]);
  return (
    <div className={styles.AdminStock}>
      <div className={styles.AdminUtil}>
        <div>가축 정보 리스트</div>
        <Search setSearch={setSearch} />
        <DateRangePickerValue />
        <Sort
          title="농장 종류별 :"
          name="stock"
          setSort={setSort}
          sort={sort}
          sortArr={[
            { id: "k-beef", value: "한우", htmlFor: "k-beef" },
            { id: "dairy", value: "낙농", htmlFor: "dairy" },
            { id: "pork", value: "양돈", htmlFor: "pork" },
            { id: "chicken", value: "육계", htmlFor: "chicken" },
            { id: "layer", value: "산란계", htmlFor: "layer" },
          ]}
        />
      </div>
      <div className={styles.AdminList}>
        가축 리스트
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default AdminStock;
