import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCardInfo } from "../../store/myPageSlice/paymentSlice";
import styles from "./RegularPayment.module.scss";
import { MdPayment } from "react-icons/md";
import logoImg from "../../img/TitleLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { SiKakaotalk } from "react-icons/si";
import * as PortOne from "https://cdn.portone.io/v2/browser-sdk.esm.js";
import { addPaymentHistory, updateDatas } from "../../firebase";
import kroDate from "../../utils/korDate";

function RegularPayment() {
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);

  console.log(kroDate());
  const requestPayment = async () => {
    if (PortOne && userInfo && userInfo.length > 0) {
      const customerEmail = userInfo[0].email;
      const customerName = userInfo[0].name;
      const customerphone = userInfo[0].phone;
      const uniquePaymentId = `test-${Date.now()}`;
      const payDate = kroDate();
      console.log(payDate);

      const docId = userInfo[0].docId;

      console.log("결제 요청 - 이메일:", customerEmail);
      console.log("결제 요청 - 이름:", customerName);
      console.log("결제 요청 - 폰:", customerphone);

      // window.PortOne.requestPayment({
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

      console.log(response);
      if (response && response.txId) {
        console.log("결제 성공:", payDate);
        await addPaymentHistory("users", docId, {
          paymentDate: payDate,
          amount: 1000,
          paymentId: response.paymentId,
        });
      } else {
        console.error("결제 날짜 없음 :");
      }
    } else {
      console.error("PortOne SDK is not loaded or userInfo is missing.");
    }
  };

  // const requestKakaoPay = () => {
  //   if (PortOne && userInfo && userInfo.length > 0) {
  //     const customerEmail = userInfo[0].email;
  //     const customerName = userInfo[0].name;
  //     const customerphone = userInfo[0].phone;
  //     const uniquePaymentId = `test-${Date.now()}`;

  //     console.log("결제 요청 - 이메일:", customerEmail);
  //     console.log("결제 요청 - 이름:", customerName);
  //     console.log("결제 요청 - 폰:", customerphone);

  //     PortOne.requestPayment({
  //       storeId: "store-8ead5501-fb96-4f25-a67c-2c9f4d8fed3a",
  //       paymentId: uniquePaymentId,
  //       orderName: "EIEIEI 프로그램 정기구독",
  //       totalAmount: 1000,
  //       currency: "KRW",
  //       channelKey: "channel-key-350b5e06-e6cb-4058-8bed-6ceb73c3db04",
  //       payMethod: "EASY_PAY",
  //       easyPay: {},
  //       customer: {
  //         phoneNumber: customerphone,
  //         fullName: customerName,
  //         email: customerEmail,
  //       },
  //       redirectURL: "localhost:3000/",
  //       onSuccess: (response) => {
  //         console.log("카카오페이 결제 성공 응답:", response);
  //         setResponse(response);
  //         if (response && response.cardNumber) {
  //           dispatch(
  //             setCardInfo({
  //               cardNumber: response.cardNumber,
  //               cardType: response.cardType,
  //             })
  //           );
  //         } else {
  //           console.error("카드 정보가 응답에 없습니다:", response);
  //         }
  //       },
  //       onFailure: (error) => {
  //         console.error("카카오페이 결제 실패 응답:", error);
  //       },
  //     });
  //   }
  // };

  return (
    <div className="page">
      <div className={styles.mainbox}>
        <div className={styles.logoImgBox}>
          <img src={logoImg} className={styles.logoImg} />
          <h1>FarmCore</h1>
        </div>

        <h1 className={styles.title}>정기 구독 서비스</h1>
        <div className={styles.fcContent}>
          <h2>
            FarmCore의 모든 것을
            <br /> 간단한 조작으로 즐기세요.
          </h2>
        </div>
        <div>
          <h2>
            내 안에 작은 기계. FarmCore의 Aplication을 통해
            <br />
            원터치로 축사에 모든 장비를 관리하세요.{" "}
          </h2>
        </div>
        <div className={styles.subscriptionOptions}>
          <div className={styles.option}>
            <div className={styles.iconTextBox}>
              <MdPayment />
              <h2>기본 패키지</h2>
            </div>
            <p className={styles.price}>₩10,000 / 월</p>
            <p className={styles.description}>
              기본 패키지 설명: 기본적인 모든 기능을 포함합니다.
            </p>
            <button onClick={requestPayment} className={styles.button}>
              <FontAwesomeIcon icon={faCreditCard} /> PortOne 결제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegularPayment;
