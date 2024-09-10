import React, { useEffect, useState } from "react";
import styles from "./AdminUser.module.scss";
import Search from "../../pages/Admin/components/Search";
import Sort from "../../pages/Admin/components/Sort";
import DateRangePickerValue from "../../pages/Admin/components/DateRangePickerValue";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../../store/checkLoginSlice/checkLoginSlice";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

function AdminUser() {
  const dispatch = useDispatch();
  const { userList } = useSelector((state) => state.checkLoginSlice);
  // console.log(userList);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "farmId",
      headerName: "Farm Id",
      width: 90,
      editable: true,
    },
    {
      field: "name",
      headerName: "name",
      width: 100,
      editable: true,
    },
    {
      field: "nickname",
      headerName: "nickname",
      width: 100,
      editable: true,
    },
    {
      field: "email",
      headerName: "email",
      // type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "address",
      headerName: "address",
      // type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      type: "number",
      width: 140,
      editable: true,
    },
    {
      field: "admin",
      headerName: "admin",
      // type: "number",
      width: 100,
      editable: true,
    },
    // {
    //   field: "fullName",
    //   headerName: "Full name",
    //   description: "This column has a value getter and is not sortable.",
    //   // sortable: false,
    //   width: 160,
    //   valueGetter: (value, row) =>
    //     `${row.firstName || ""} ${row.lastName || ""}`,
    // },
  ];

  const rows = userList.map((item, idx) => {
    const { address, email, farm, name, uid, nickname, createdAt } = item;
    const seconds = createdAt.seconds; // 주어진 초
    const date = new Date(seconds * 1000); // 밀리초로 변환하여 Date 객체 생성
    const year = date.getFullYear(); // 연도
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월 (0부터 시작하므로 1 더해줌)
    const day = String(date.getDate()).padStart(2, "0"); // 일
    const selectDate = `${year}-${month}-${day}`;
    const admin = uid ? "O" : " ";
    return {
      id: idx,
      farmId: farm || "X",
      name: name,
      nickname: nickname || "X",
      email: email,
      address: address,
      createdAt: selectDate,
      admin: admin,
    };
  });

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
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 9,
                },
              },
            }}
            pageSizeOptions={[5]}
            // checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
    </div>
  );
}

export default AdminUser;
