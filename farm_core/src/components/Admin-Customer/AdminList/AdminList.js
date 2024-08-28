import React, { useEffect, useState } from "react";
import styles from "./AdminList.module.scss";
import Search from "../../../pages/Admin/components/Search";
function AdminList({ title, description }) {
  // const [search, setSearch] = useState("");
  // useEffect(() => {}, [search]);
  return (
    <>
      {/* <Search setSearch={setSearch} /> */}
      <div className={styles.AdminList}>
        <h2>{title}</h2>
        <ul>
          <li>{description}</li>
        </ul>
      </div>
    </>
  );
}

export default AdminList;
