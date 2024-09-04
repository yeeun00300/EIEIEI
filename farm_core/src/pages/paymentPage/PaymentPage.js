import { channel } from "diagnostics_channel";
import React from "react";

function PaymentPage(props) {
  const requestPay = () => {
    PortOne.requestPayment({
      storeId: "store-8ead5501-fb96-4f25-a67c-2c9f4d8fed3a",
      paymentId: "testm0njbmb3",
      orderName: "EIEIEI",
      totalAmount: 1,
      currency: "KRW",
      channelKey: "channel-key-89835669-045b-4fbb-8108-c19b87217568",
      productType: "REAL",
      payMethod: "CARD",
    });
  };
  return (
    <div>
      <button onClick={requestPay}>결제</button>
    </div>
  );
}

export default PaymentPage;
