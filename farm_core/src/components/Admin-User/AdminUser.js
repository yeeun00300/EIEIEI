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

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 110,
      editable: true,
    },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      // sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  const rows = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

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
                  pageSize: 5,
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
