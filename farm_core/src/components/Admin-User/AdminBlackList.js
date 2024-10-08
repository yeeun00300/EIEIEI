import React, { useEffect, useState } from "react";
import styles from "./AdminBlackList.module.scss";
import Search from "../../pages/Admin/components/Search";
import DateRangePickerValue from "../../pages/Admin/components/DateRangePickerValue";

function AdminBlackList() {
  const [search, setSearch] = useState("");
  useEffect(() => {}, [search]);
  return (
    <div className={styles.AdminBlackList}>
      <div className={styles.AdminUtil}>
        <div>차단된 회원</div>
        <Search setSearch={setSearch} />
        <DateRangePickerValue />
        {/* <div>
          회원별 회원/탈퇴회원 :
          <input type="radio" id="user" name="member" value="회원" />
          <label for="user">회원</label>
          <input type="radio" id="deleteUser" name="member" value="탈퇴회원" />
          <label for="deleteUser">탈퇴회원</label>
        </div> */}
        {/* <div>
          가축별 :
          <input type="radio" id="k-beef" name="stock" value="한우" />
          <label for="k-beef">한우</label>
          <input type="radio" id="dairy" name="stock" value="낙농" />
          <label for="dairy">낙농</label>
          <input type="radio" id="pork" name="stock" value="양돈" />
          <label for="pork">양돈</label>
          <input type="radio" id="chicken" name="stock" value="육계" />
          <label for="chicken">육계</label>
          <input type="radio" id="layer" name="stock" value="산란계" />
          <label for="layer">산란계</label>
        </div> */}
      </div>
      <div className={styles.AdminList}>
        회원 리스트
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  );
}

export default AdminBlackList;
