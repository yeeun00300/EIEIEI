import React, { useEffect } from "react";

function PaymentPage() {
  useEffect(() => {
    // 포트원 SDK를 로드
    const script = document.createElement("script");
    script.src = "https://cdn.portone.io/v2/browser-sdk.js";
    script.async = true;
    document.body.appendChild(script);

    // 카카오페이 SDK를 로드
    const kakaoScript = document.createElement("script");
    kakaoScript.src = "https://developers.kakao.com/sdk/js/kakao.js";
    kakaoScript.async = true;
    document.body.appendChild(kakaoScript);

    return () => {
      document.body.removeChild(script);
      document.body.removeChild(kakaoScript);
    };
  }, []);

  const requestPortOnePay = () => {
    if (window.PortOne) {
      window.PortOne.requestPayment({
        storeId: "store-8ead5501-fb96-4f25-a67c-2c9f4d8fed3a",
        paymentId: "testm0njbmb3",
        orderName: "EIEIEI 프로그램 정기구독",
        totalAmount: 1000,
        currency: "KRW",
        channelKey: "channel-key-e8e7f8a7-dcff-4957-b7d4-d4f9143f34bc",
        payMethod: "CARD",
        customer: {
          fullName: "김경문",
          phoneNumber: "010-9911-9051",
          email: "kmjnh34@gmail.com",
        },
      });
    } else {
      console.error("PortOne SDK is not loaded.");
    }
  };

  const requestKakaoPay = () => {
    window.PortOne.requestPayment({
      storeId: "store-8ead5501-fb96-4f25-a67c-2c9f4d8fed3a",
      paymentId: "testm0oq5kll",
      orderName: "EIEIEI 프로그램 정기구독",
      totalAmount: 1000,
      currency: "KRW",
      channelKey: "channel-key-350b5e06-e6cb-4058-8bed-6ceb73c3db04",
      payMethod: "EASY_PAY",
      easyPay: {},
      customer: {
        fullName: "김경문",
        phoneNumber: "010-9911-9051",
        email: "kmjnh34@gmail.com",
      },
    });
  };

  return (
    <div>
      <h1>결제 페이지</h1>
      <button onClick={requestPortOnePay}>KG 이니시스 결제하기</button>
      <button onClick={requestKakaoPay}>카카오페이 결제하기</button>
    </div>
  );
}

export default PaymentPage;
