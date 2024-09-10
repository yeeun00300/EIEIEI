import React, { useEffect, useState } from "react";
import styles from "./AdminUser.module.scss";
import Search from "../../pages/Admin/components/Search";
import Sort from "../../pages/Admin/components/Sort";
import DateRangePickerValue from "../../pages/Admin/components/DateRangePickerValue";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../../store/checkLoginSlice/checkLoginSlice";

function AdminUser() {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.checkLoginSlice);
  console.log(userList);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const queryOptions = {};
  useEffect(() => {
    dispatch(
      fetchUserList({ collectionName: "users", queryOptions: queryOptions })
    );
  }, [search, sort]);
  return (
    <div className={styles.AdminUser}>
      <div className={styles.AdminUtil}>
        <div>회원 정보 리스트</div>
        <Search setSearch={setSearch} />
        <div className={styles.datePicker}>
          <DateRangePickerValue />
        </div>
        <Sort
          title="회원별 회원/탈퇴회원 :"
          name="member"
          setSort={setSort}
          sortArr={[
            { id: "user", value: "회원", htmlFor: "user" },
            { id: "deleteUser", value: "탈퇴 회원", htmlFor: "deleteUser" },
            { id: "blackUser", value: "차단된 회원", htmlFor: "blackUser" },
          ]}
        />
        {/* <div>
          회원별 회원/탈퇴회원 :
          <input type="radio" id="user" name="member" value="회원" />
          <label htmlFor="user">회원</label>
          <input type="radio" id="deleteUser" name="member" value="탈퇴회원" />
          <label htmlFor="deleteUser">탈퇴회원</label>
        </div> */}
        {/* <Sort
          title="농장 종류별 :"
          name="stock"
          setSort={setSort}
          sortArr={[
            { id: "k-beef", value: "한우", htmlFor: "k-beef" },
            { id: "dairy", value: "낙농", htmlFor: "dairy" },
            { id: "pork", value: "양돈", htmlFor: "pork" },
            { id: "chicken", value: "육계", htmlFor: "chicken" },
            { id: "layer", value: "산란계", htmlFor: "layer" },
          ]}
        /> */}
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

export default AdminUser;
