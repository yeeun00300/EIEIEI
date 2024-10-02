import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import styles from "./Payment.module.scss";
import { useSelector } from "react-redux";

function Payment() {
  const users = useSelector((state) => state.userInfoEditSlice.userInfo);
  const [remainingTime, setRemainingTime] = useState("");
  const [open, setOpen] = useState(false); // 모달 열기 상태 추가
  const [currentPaymentDate, setCurrentPaymentDate] = useState("");

  const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return "N/A";
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };
  console.log(users);
  const formatAmount = (amount) => {
    if (amount === undefined || amount === null) return "₩0";
    return `₩${amount.toLocaleString()}`;
  };

  const calculateRemainingTime = (paymentDate) => {
    // paymentDate 형식을 ISO 8601 형식으로 변환
    const formattedPaymentDate = new Date(
      paymentDate
        .replace(/(\d{4}):(\d{2}):(\d{2})/, "$1-$2-$3")
        .replace(" ", "T")
    );

    const nextPaymentDate = new Date(formattedPaymentDate);
    nextPaymentDate.setMonth(nextPaymentDate.getMonth() + 1);
    nextPaymentDate.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정

    const now = new Date();
    now.setHours(0, 0, 0, 0); // 현재 날짜도 시간을 00:00:00으로 설정

    const timeDiff = nextPaymentDate - now;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysRemaining > 0) {
      return `만료일까지 ${daysRemaining}일 남음`;
    } else if (daysRemaining === 0) {
      return "오늘 결제일";
    } else {
      return "결제일이 지났습니다.";
    }
  };

  const handleCheckRemainingTime = (paymentDate) => {
    const timeLeft = calculateRemainingTime(paymentDate);
    setRemainingTime(timeLeft);
    setCurrentPaymentDate(paymentDate); // 현재 결제일 설정
    setOpen(true); // 모달 열기
  };

  const handleClose = () => {
    setOpen(false); // 모달 닫기
  };

  return (
    <div className="container">
      <Typography variant="h5" className={styles.title}>
        결제 내역
      </Typography>
      {users.length > 0 ? (
        <TableContainer className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>결제 이메일</TableCell>
                <TableCell>결제일</TableCell>
                <TableCell>결제 금액</TableCell>
                <TableCell>결제 이메일</TableCell>
                <TableCell>핸드폰 번호</TableCell>
                <TableCell>남은 기간 확인</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) =>
                user.paymentHistory.map((payment, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{payment.paymentDate || "N/A"}</TableCell>
                    <TableCell>{formatAmount(payment.amount)}</TableCell>
                    <TableCell>{payment.paymentId || "N/A"}</TableCell>
                    <TableCell>
                      {formatPhoneNumber(user.phone) || "N/A"}
                    </TableCell>
                    <TableCell>
                      <button
                        className={styles.checkButton}
                        onClick={() =>
                          handleCheckRemainingTime(payment.paymentDate)
                        }
                      >
                        남은 사용 기간 확인
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1">사용자가 없습니다.</Typography>
      )}

      {/* 모달 추가 */}
      <Dialog
        open={open}
        onClose={handleClose}
        disableAutoFocus
        disableEnforceFocus
      >
        <DialogTitle>남은 기간 확인</DialogTitle>
        <DialogContent>
          <Typography>
            {currentPaymentDate
              ? `결제일: ${currentPaymentDate}, ${remainingTime}`
              : "결제일을 찾을 수 없습니다."}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Payment;
