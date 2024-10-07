import React, { useState } from "react";
import styles from "./MyPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./../../store/userInfoEditSlice/UserInfoEditSlice";
import UserInfo from "./UserInfo/UserInfo";
import Question from "./Question/Question";
import MyCommunity from "./MyCommunity/MyCommunity";
import Payment from "./Payment/Payment";
import { useFetchCollectionData } from "../../firebase";
const dataObj = {
  UserInfo: { label: "회원정보수정" },
  myCommunity: { label: "내 게시글" },
  question: { label: "1:1 문의하기" },
  payment: { label: "결제내역" },
};

function MyPage() {
  const [activeComponent, setActiveComponent] = useState(null);
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);
  console.log(userInfo);

  useFetchCollectionData("users", fetchUser); // 데이터 로딩

  const handleComponentChange = (componentName) => {
    if (activeComponent === componentName) return;
    setActiveComponent(componentName);
  };

  if (!userInfo[0] || userInfo[0].length === 0) {
    return <div>로딩 중...</div>; // 데이터가 로딩될 때까지 대기
  }

  return (
    <div className="page">
      <div>
        <div className={styles.wrapper}>
          <div className={styles.user}>
            <h3>{userInfo[0].name}님 환영합니다.</h3>
          </div>
          <div className={styles.lists}>
            {Object.keys(dataObj).map((key) => (
              <div
                key={key}
                className={styles.listItem}
                onClick={() => handleComponentChange(key)}
              >
                {dataObj[key].label}
              </div>
            ))}
          </div>
        </div>
        {activeComponent === "UserInfo" && <UserInfo />}
        {activeComponent === "myCommunity" && <MyCommunity />}
        {activeComponent === "question" && <Question />}
        {activeComponent === "payment" && <Payment />}
      </div>
    </div>
  );
}

export default MyPage;
