import React, { useEffect, useState } from "react";
import styles from "./AdminStock.module.scss";
import Sort from "../../pages/Admin/components/Sort";
import Search from "../../pages/Admin/components/Search";
function AdminStock() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  useEffect(() => {}, [search, sort]);
  return (
    <div className={styles.AdminStock}>
      <div>가축 정보 리스트</div>
      <div>
        <Search setSearch={setSearch} />
        <div>등록기간 : </div>
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
      <div>
        가축 리스트
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default AdminStock;
