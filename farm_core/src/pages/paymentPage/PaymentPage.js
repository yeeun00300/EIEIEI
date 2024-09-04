import React from "react";

const data = {
  storeId: "store-88882013-866e-434f-8999-48de5e264888",
  paymentId: "paymentId_202305231417002",
  channelKey: "channel-key-7bf3b7dc-ff6a-77fc-b999-b3cb702e2663",
  orderName: "반팔 티셔츠 XL",
  totalAmount: 6000,
  currency: "CURRENCY_KRW",
  paymethod: "card",
};


function PaymentPage(props) {
  // const requestPayment = async () => {
  //   const response = await PortOne.requestPayment(data);
  //   console.log(response);
  // };
  return (
    <div>
      <button>결제</button>
    </div>
  );
}

export default PaymentPage;
