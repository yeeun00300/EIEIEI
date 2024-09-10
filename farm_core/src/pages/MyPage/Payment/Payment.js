// Payment.js

import React from "react";
import styles from "./Payment.module.scss";
import RegularPayment from "./../../RegularPayment/RegularPayment";
import { useSelector } from "react-redux";

function Payment(props) {
  const { cardInfo } = useSelector((state) => state.paymentSlice);
  console.log(cardInfo);
  return (
    <div className="page">
      <div className={styles.wrapper}>
        <h1>이용중인 정기결제</h1>
        <div className={styles.box}>
          <div>
            <div className={styles.wrapper}>
              <div className={styles.gap}>
                <h3>FarmCore</h3>
                <h5 className={styles.user}>
                  OOO <span>고객님</span>
                </h5>
              </div>
              <div className={styles.test}>
                <ul>
                  <li>등록일</li>
                  <li>결제정보</li>
                  <li>다음 결제일</li>
                </ul>
                <ul>
                  <li>2024.10.04</li>
                  <li>
                    {cardInfo
                      ? `국민카드 ${cardInfo.cardNumber.replace(
                          /.(?=....)/g,
                          "*"
                        )}`
                      : "정보 없음"}
                  </li>
                  <li>2024.11.04</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <RegularPayment />
      </div>
    </div>
  );
}

export default Payment;
