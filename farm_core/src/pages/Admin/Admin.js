import React from "react";
import styles from "./Admin.module.scss";
import { Divider } from "@mui/material/Divider";

function Admin() {
  return (
    <div className={styles.AdminPage}>
      <div className={styles.AdminTitle}>
        <h1>관리자페이지</h1>
        <button>홈페이지로 돌아가기</button>
      </div>
      <div className={styles.AdminContainer}>
        <div className={styles.AdminNav}>
          <ul className={styles.AdminNavList}>
            <li>회원 관리</li>
            <li>기상 관리</li>
            <li>질병 관리</li>
            <li>게시판 관리</li>
            <li>알림 관리</li>
          </ul>
        </div>
        <div className={styles.AdminWrapper}>Wrapper</div>
      </div>
    </div>
  );
}

export default Admin;
