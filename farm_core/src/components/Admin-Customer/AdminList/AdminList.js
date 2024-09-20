import React, { useEffect, useState } from "react";
import styles from "./AdminList.module.scss";
import FilterGrid from "../../Grid/FilterGrid";
function AdminList({ title, columns, rows }) {
  // const [search, setSearch] = useState("");
  // useEffect(() => {}, [search]);
  return (
    <>
      {/* <div className={styles.AdminList}> */}
      <h2>{title}</h2>
      {/* <ul>
          <li>{description}</li>
        </ul>
      </div> */}
      <FilterGrid rows={rows} columns={columns} height={800} pageSize={13} />
    </>
  );
}

export default AdminList;
