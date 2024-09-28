import React from "react";
import { MdPayment } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import logoImg from "../../img/TitleLogo.png";
import styles from "./RegularPayment.module.scss";
import { useSelector } from "react-redux";
import { addPaymentHistory } from "../../firebase";
import kroDate from "../../utils/korDate";
import * as PortOne from "https://cdn.portone.io/v2/browser-sdk.esm.js";

function RegularPayment() {
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);

  const requestPayment = async () => {
    if (PortOne && userInfo && userInfo.length > 0) {
      const customerEmail = userInfo[0].email;
      const customerName = userInfo[0].name;
      const customerphone = userInfo[0].phone;
      const uniquePaymentId = `test-${Date.now()}`;
      const payDate = kroDate();
      const docId = userInfo[0].docId;

      const response = await PortOne.requestPayment({
        storeId: "store-8ead5501-fb96-4f25-a67c-2c9f4d8fed3a",
        paymentId: uniquePaymentId,
        orderName: "EIEIEI 프로그램 정기구독",
        totalAmount: 1000,
        currency: "KRW",
        channelKey: "channel-key-e8e7f8a7-dcff-4957-b7d4-d4f9143f34bc",
        payMethod: "CARD",
        customer: {
          phoneNumber: customerphone,
          fullName: customerName,
          email: customerEmail,
        },
        redirectURL: "localhost:3000/",
      });

      if (response && response.txId) {
        await addPaymentHistory("users", docId, {
          paymentDate: payDate,
          amount: 1000,
          paymentId: response.paymentId,
        });
      } else {
        console.error("결제 실패");
      }
    } else {
      console.error("PortOne SDK is not loaded or userInfo is missing.");
    }
  };

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <img src={logoImg} className={styles.logoImg} alt="FarmCore Logo" />
          <h1 className={styles.logoTitle}>FarmCore</h1>
        </header>

        <div className={styles.mainbox}>
          <h1 className={styles.title}>스마트팜 구독 서비스</h1>
          <p className={styles.subtitle}>
            축사 관리 자동화의 혁신, FarmCore와 함께 하세요!
          </p>

          <div className={styles.subscriptionOptions}>
            <div className={styles.option}>
              <div className={styles.iconTextBox}>
                <MdPayment size={30} />
                <h2 className={styles.optionTitle}>기본 구독 패키지</h2>
              </div>
              <p className={styles.price}>₩10,000 / 월</p>
              <p className={styles.description}>
                실시간 환경 모니터링, 자동화 시스템 연동, 알림 서비스 제공
              </p>
              <button onClick={requestPayment} className={styles.button}>
                <FontAwesomeIcon icon={faCreditCard} /> 결제하기
              </button>
            </div>

            <div className={styles.benefits}>
              <h3>구독 혜택:</h3>
              <ul className={styles.benefitsList}>
                <li className={styles.benefitItem}>
                  <span className={styles.bulletPoint}>•</span> 실시간 축사 환경
                  모니터링
                </li>
                <li className={styles.benefitItem}>
                  <span className={styles.bulletPoint}>•</span> 자동 급이/급수
                  시스템 연동
                </li>
                <li className={styles.benefitItem}>
                  <span className={styles.bulletPoint}>•</span> 온도, 습도, 환기
                  제어
                </li>
                <li className={styles.benefitItem}>
                  <span className={styles.bulletPoint}>•</span> 이상 상황 알림
                  서비스
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.footnote}>
            <p>언제든 구독을 취소할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegularPayment;
