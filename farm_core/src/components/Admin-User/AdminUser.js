import React, { useEffect, useState } from "react";
import styles from "./AdminUser.module.scss";
// import Search from "../../pages/Admin/components/Search";
// import Sort from "../../pages/Admin/components/Sort";
// import DateRangePickerValue from "../../pages/Admin/components/DateRangePickerValue";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserList } from "../../store/checkLoginSlice/checkLoginSlice";
// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
import FilterGrid from "../Grid/FilterGrid";
import Search from "../../pages/Admin/components/Search";
import { useParams } from "react-router";
import { updateDatas } from "../../firebase";

function AdminUser() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(""); // 검색 상태
  const [blackState, setBlackState] = useState({});
  const [secessionState, setSecessionState] = useState({});
  // const [blackState, setBlackState] = useState("a");
  // const [secessionState, setSecessionState] = useState("b");

  const { userList } = useSelector((state) => state.checkLoginSlice);
  // const [search, setSearch] = useState("");
  // const [sort, setSort] = useState("");
  const stateDict = {
    green: " ",
    black: "차단",
  };
  const handleBlack = async (email, black) => {
    try {
      // userList가 존재하는지 체크
      if (!userList || userList.length === 0) {
        alert("유저 리스트가 없습니다.");
        return;
      }

      const filterUser = userList?.filter((user) => user.email === email)[0];

      // filterUser가 null 또는 undefined인지 체크
      if (!filterUser) {
        alert("해당 유저를 찾을 수 없습니다.");
        return;
      }

      const selectDocId = filterUser.docId;
      const blackState = filterUser.blackState;
      setBlackState({
        blackState: filterUser.blackState,
        email: filterUser.email,
      });
      const blackOn = { ...filterUser, blackState: "black" };
      const blackOff = { ...filterUser, blackState: "green" };

      if (blackState === "black") {
        // await 키워드를 사용하여 업데이트 결과를 기다림
        await updateDatas("users", selectDocId, blackOff);
        alert(`${filterUser.email} - 차단을 해체하였습니다.`);
      } else {
        // await 키워드를 사용하여 업데이트 결과를 기다림
        await updateDatas("users", selectDocId, blackOn);
        alert(`${filterUser.email} - 차단 하였습니다.`);
      }
    } catch (error) {
      console.log("차단 처리 중 오류 발생:", error);
      alert("차단 처리 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (email, secession) => {
    try {
      // console.log("Delete row with email:", email);
      if (!userList || userList.length === 0) {
        alert("유저 리스트가 없습니다.");
        return;
      }

      const filterUser = userList?.filter((user) => user.email === email)[0];

      if (!filterUser) {
        alert("해당 유저를 찾을 수 없습니다.");
        return;
      }
      const selectDocId = filterUser.docId;
      const isActive = filterUser.isActive;
      setSecessionState({
        isActive: filterUser.isActive,
        email: filterUser.email,
      });
      const secessionOn = { ...filterUser, isActive: "N" };
      const secessionOff = { ...filterUser, isActive: "Y" };
      if (isActive == "N") {
        await updateDatas("users", selectDocId, secessionOff);
        alert(`${filterUser.email} - 탈퇴 해체하였습니다.`);
      } else {
        await updateDatas("users", selectDocId, secessionOn);
        alert(`${filterUser.email} - 탈퇴 하였습니다.`);
      }
    } catch (error) {
      console.log("차단 처리 중 오류 발생:", error);
      alert("차단 처리 중 오류가 발생했습니다.");
    }
  };
  // 검색 기능
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  // 검색된 데이터 필터링
  const filteredUser = userList.filter((item) =>
    Object.values(item).some((val) =>
      String(val).toLowerCase().includes(searchQuery)
    )
  );
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    // {
    //   field: "farmId",
    //   headerName: "Farm Id",
    //   width: 90,
    //   editable: true,
    // },
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
    {
      field: "black",
      headerName: "black",
      // type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "secession",
      headerName: "secession",
      // type: "number",
      width: 100,
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <div className={styles.userBtn}>
          <button
            onClick={() => handleBlack(params.row.email, params.row.black)}
            style={{
              marginRight: "10px",
              backgroundColor: "transparent",
              color: "#007bff",
              border: "none",
              cursor: "pointer",
              borderRadius: "12px",
            }}
            className={styles.blackBtn}
          >
            {params.row.black !== "차단" ? "블랙" : "블랙해제"}
          </button>
          <button
            onClick={() => handleDelete(params.row.email, params.row.secession)}
            style={{
              marginRight: "10px",
              backgroundColor: "transparent",
              color: "#dc3545",
              border: "none",
              cursor: "pointer",
              borderRadius: "12px",
            }}
            className={styles.deleteBtn}
          >
            {params.row.secession !== "secession" ? "탈퇴" : "탈퇴해제"}
          </button>
        </div>
      ),
    },
  ];

  const rows = filteredUser?.map((item, idx) => {
    const {
      address,
      email,
      name,
      uid,
      nickname,
      createdAt,
      blackState,
      isActive,
    } = item;
    const seconds = createdAt.seconds;
    const date = new Date(seconds * 1000);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const selectDate = `${year}-${month}-${day}`;
    const admin = uid ? "관리자" : " ";
    const secession = isActive == "Y" ? "" : "secession";
    return {
      id: idx + 1,
      // farmId: farm || "X",
      name: name,
      nickname: nickname || "X",
      email: email,
      address: address,
      createdAt: selectDate,
      admin: admin,
      secession: secession,
      black: stateDict[blackState],
    };
  });

  const queryOptions = {};
  useEffect(() => {
    dispatch(
      fetchUserList({ collectionName: "users", queryOptions: queryOptions })
    );
  }, [dispatch, blackState.blackState, secessionState.isActive]);

  return (
    <div className={styles.AdminUser}>
      <div className={styles.AdminUtil}>
        <div>회원 정보 리스트</div>
        <Search onChange={handleSearch} placeholder={"검색어를 입력하세요!"} />
        {/* <div className={styles.datePicker}>
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
        /> */}
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
        <div className={styles.AdminList}>
          <FilterGrid
            rows={rows}
            columns={columns}
            height={800}
            pageSize={13}
          />
          {/* <Box sx={{ height: 800, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 13,
                  },
                },
              }}
              pageSizeOptions={[10]}
              // checkboxSelection
              disableRowSelectionOnClick
            />
          </Box> */}
        </div>
      </div>
    </div>
  );
}

export default AdminUser;
