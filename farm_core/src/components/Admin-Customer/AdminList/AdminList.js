import React from "react";
import styles from "./AdminList.module.scss";
function AdminList({ title, description }) {
  return (
    <div className={styles.AdminList}>
      <h2>{title}</h2>
      <ul>
        <li>{description}</li>
      </ul>
    </div>
  );
}

export default AdminList;
