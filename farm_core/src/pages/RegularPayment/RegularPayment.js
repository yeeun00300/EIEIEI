import React from "react";

function RegularPayment(props) {
  const requestPayment = (provider) => {
    if (provider === "PortOne") {
      if (window.PortOne) {
        window.PortOne.requestPayment({
          storeId: "store-8ead5501-fb96-4f25-a67c-2c9f4d8fed3a",
          paymentId: "testm0njbmb3",
          orderName: "1달 정기 구독",
          totalAmount: 10000,
          currency: "KRW",
          channelKey: "channel-key-e8e7f8a7-dcff-4957-b7d4-d4f9143f34bc",
          payMethod: "CARD",
          customer: {
            fullName: "홍길동",
            phoneNumber: "010-0000-0000",
            email: "gildong@example.com",
          },
        });
      } else {
        console.error("PortOne SDK is not loaded.");
      }
    } else if (provider === "Kakao") {
      if (window.Kakao) {
        window.Kakao.init("YOUR_KAKAO_JS_KEY"); // 카카오 SDK 초기화
        window.Kakao.Pay.request({
          pg: "KAKAO",
          pay_method: "card",
          merchant_uid: `order_${new Date().getTime()}`,
          amount: 10000,
          name: "1달 정기 구독",
          buyer_name: "홍길동",
          buyer_tel: "010-0000-0000",
          buyer_email: "gildong@example.com",
          buyer_addr: "서울시 어딘가",
          buyer_postcode: "12345",
          m_redirect_url: "http://localhost:3000/",
        });
      } else {
        console.error("Kakao SDK is not loaded.");
      }
    }
  };
  return (
    <div className="page">
      <div className="subscription-card">
        <h1>정기 구독 서비스</h1>
        <p className="price">₩10,000 / 월</p>
        <p className="description">
          1개월 동안 모든 프리미엄 콘텐츠를 무제한으로 이용할 수 있습니다.
          언제든지 구독을 취소할 수 있습니다.
        </p>
        <div className="button-group">
          <button
            className="pay-button"
            onClick={() => requestPayment("PortOne")}
          >
            PortOne으로 결제하기
          </button>
          <button
            className="pay-button"
            onClick={() => requestPayment("Kakao")}
          >
            KakaoPay로 결제하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegularPayment;
