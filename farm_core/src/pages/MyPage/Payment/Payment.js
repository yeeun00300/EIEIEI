// Payment.js

import React, { useEffect } from "react";
import styles from "./Payment.module.scss";
import RegularPayment from "./../../RegularPayment/RegularPayment";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import userInfoEditSlice, {
  fetchUser,
} from "./../../../store/userInfoEditSlice/UserInfoEditSlice";
import checkLoginSlice, {
  fetchUserList,
} from "./../../../store/checkLoginSlice/checkLoginSlice";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserAuth, useFetchCollectionData } from "../../../firebase";

function Payment(props) {
  useFetchCollectionData("users");
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userInfoEditSlice.userInfo);
  // const userInfo = user[0];
  // console.log(userInfo);

  // const rows = [
  //   { id: 1, payEmail: "email", paymentDate: "2024-09-01", amount: 10000 },
  //   { id: 2, paymentDate: "2024-08-15", amount: 50000 },
  // ];

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "N/A";
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const formatAmount = (amount) => {
    if (amount === undefined || amount === null) return "₩0";
    return `₩${amount.toLocaleString()}`; // 숫자를 천 단위로 구분하여 문자열로 변환
  };

  const rows = users.flatMap((user, idx) =>
    user.paymentHistory.map((payment, paymentIdx) => ({
      id: `${idx + 1}`, // 유니크 ID
      payEmail: user.email,
      paymentDate: payment.paymentDate || "N/A",
      amount: formatAmount(payment.amount) || 0,
      paymentId: payment.paymentId || "N/A",
      phone: formatPhoneNumber(user.phone) || "N/A",
    }))
  );

  console.log(rows);

  const columns = [
    {
      field: "id",
      headerName: "회차",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "payEmail",
      headerName: "결제 이메일",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "paymentDate",
      headerName: "결제일",
      width: 250,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "결제 금액",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "paymentId",
      headerName: "결제 아이디",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "phone",
      headerName: "결제 핸드폰 번호",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
  ];

  return (
    <div className="container">
      <div className={styles.dataGridContainer}>
        <div className={styles.dataGrid}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            sortingOrder={["asc", "desc"]}
          />
        </div>
      </div>
      {/* <RegularPayment /> */}
    </div>
  );
}

export default Payment;
