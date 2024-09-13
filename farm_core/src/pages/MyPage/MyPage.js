import React, { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link, Outlet, useParams } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import { useDispatch, useSelector } from "react-redux";
import userInfoEditSlice, {
  fetchUser,
} from "./../../store/userInfoEditSlice/UserInfoEditSlice";
import { startEditingUser } from "../../store/myPageSlice/userEditSlice";
import UserInfo from "./UserInfo/UserInfo";
import Question from "./Question/Question";
import MyCommunity from "./MyCommunity/MyCommunity";
import Payment from "./Payment/Payment";
import { fetchLogin } from "../../store/checkLoginSlice/checkLoginSlice";
import { useFetchCollectionData, useFetchUser } from "../../firebase";
const dataObj = {
  UserInfo: { label: "회원정보수정" },
  myCommunity: { label: "내 게시글" },
  question: { label: "1:1 문의하기" },
  payment: { label: "결제내역" },
};

function MyPage() {
  const [activeComponent, setActiveComponent] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);
  console.log(userInfo);
  useFetchCollectionData("users");

  const handleComponentChange = (componentName) => {
    // If the same component is clicked again, do nothing
    if (activeComponent === componentName) return;

    setActiveComponent(componentName);
  };

  console.log(userInfo[0]);
  return (
    <div className="page">
      <div>
        <div className={styles.wrapper}>
          <div className={styles.user}>
            <h3>{userInfo[0]?.name}님 환영합니다.</h3>
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
