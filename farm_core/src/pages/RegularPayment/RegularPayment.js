import React, { useEffect } from "react";
import styles from "./RegularPayment.module.scss";
import { useDispatch, useSelector } from "react-redux";
import userSlice, { setUser } from "./../../store/userSlice/userSlice";
import userInfoEditSlice, {
  fetchUser,
} from "./../../store/userInfoEditSlice/UserInfoEditSlice";
import { MdPayment } from "react-icons/md";
import logoImg from "../../img/TitleLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { SiKakaotalk } from "react-icons/si";

function RegularPayment(props) {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);

  const email = localStorage.getItem("email");

  // 사용자 정보를 가져오는 useEffect
  useEffect(() => {
    if (email) {
      const queryOptions = {
        conditions: [
          {
            field: "email",
            operator: "==",
            value: email,
          },
        ],
      };
      dispatch(fetchUser({ collectionName: "users", queryOptions }));
    }
  }, [dispatch, email]);

  // userInfo 업데이트 후 확인
  useEffect(() => {
    if (userInfo) {
      console.log("사용자 정보:", userInfo);
      console.log("이메일:", userInfo[0].email);
    }
  }, [userInfo]);

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

  const requestPayment = (provider) => {
    if (window.PortOne && userInfo.length > 0) {
      const customerEmail = userInfo[0].email;
      const customerName = userInfo[0].name;

      console.log("결제 요청 - 이메일:", customerEmail);
      console.log("결제 요청 - 이름:", customerName);
      window.PortOne.requestPayment({
        storeId: "store-8ead5501-fb96-4f25-a67c-2c9f4d8fed3a",
        paymentId: "testm0njbmb3",
        orderName: "EIEIEI 프로그램 정기구독",
        totalAmount: 1000,
        currency: "KRW",
        channelKey: "channel-key-e8e7f8a7-dcff-4957-b7d4-d4f9143f34bc",
        payMethod: "CARD",
        customer: {
          phoneNumber: "010-9911-9051",
          fullName: customerName,
          email: customerEmail,
        },
      });
    } else {
      console.error("PortOne SDK is not loaded.");
    }
  };
  const requestKakaoPay = () => {
    if (window.PortOne && userInfo.length > 0) {
      const customerEmail = userInfo[0].email;
      const customerName = userInfo[0].name;

      console.log("결제 요청 - 이메일:", customerEmail);
      console.log("결제 요청 - 이름:", customerName);
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
          phoneNumber: "010-9911-9051",
          fullName: customerName,
          email: customerEmail,
        },
      });
    }
  };
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
            <button onClick={requestKakaoPay} className={styles.button}>
              <SiKakaotalk /> 카카오페이 결제
            </button>
          </div>
          {/* 추가적인 패키지 옵션은 여기에 추가하세요 */}
        </div>
      </div>
    </div>
  );
}

export default RegularPayment;
