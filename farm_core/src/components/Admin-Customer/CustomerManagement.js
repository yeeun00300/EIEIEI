import React from "react";
import styles from "./CustomerManagement.module.scss";
import AdminList from "./AdminList/AdminList";

function CustomerManagement() {
  return (
    <div className={styles.CustomerManagement}>
      <AdminList title={"공지사항"} />
      <AdminList title={"자유게시판"} />
      <AdminList title={"커뮤니티"} />
    </div>
  );
}

export default CustomerManagement;
