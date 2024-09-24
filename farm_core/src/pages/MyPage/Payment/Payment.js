import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import styles from "./Payment.module.scss";
import RegularPayment from "./../../RegularPayment/RegularPayment";
import { useSelector } from "react-redux";
import AddLiveStock from "../../../components/addLiveStock/AddLiveStock";
import MyStockAddPage from "./../../MyStockAddPage/MyStockAddPage";

function Payment() {
  const users = useSelector((state) => state.userInfoEditSlice.userInfo);

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "N/A";
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const formatAmount = (amount) => {
    if (amount === undefined || amount === null) return "₩0";
    return `₩${amount.toLocaleString()}`;
  };

  return (
    <div className="container">
      <div className={styles.cardContainer}>
        {" "}
        {/* 스타일 적용 */}
        {users.map((user) =>
          user.paymentHistory.map((payment, idx) => (
            <Card key={idx} className={styles.customCard}>
              {" "}
              {/* customCard 스타일 적용 */}
              <CardContent className={styles.cardContent}>
                {" "}
                {/* cardContent 스타일 적용 */}
                <Typography variant="h6" className={styles.cardTitle}>
                  {" "}
                  {/* cardTitle 스타일 적용 */}
                  결제 이메일: {user.email}
                </Typography>
                <Typography variant="body1">
                  결제일: {payment.paymentDate || "N/A"}
                </Typography>
                <Typography variant="body1" className={styles.cardPrice}>
                  {" "}
                  {/* cardPrice 스타일 적용 */}
                  결제 금액: {formatAmount(payment.amount)}
                </Typography>
                <Typography variant="body1">
                  결제 아이디: {payment.paymentId || "N/A"}
                </Typography>
                <Typography variant="body1">
                  핸드폰 번호: {formatPhoneNumber(user.phone) || "N/A"}
                </Typography>
              </CardContent>
              <div className={styles.cardActions}>
                {" "}
                {/* cardActions 스타일 적용 */}
                <button className={styles.subscribeButton}>
                  {" "}
                  {/* subscribeButton 스타일 적용 */}
                  정기 결제 구독
                </button>
              </div>
            </Card>
          ))
        )}
      </div>

      <AddLiveStock />
      <MyStockAddPage />
    </div>
  );
}

export default Payment;
