import React, { useEffect, useState } from "react";
import styles from "./MyPage.module.scss";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link, Outlet, useParams } from "react-router-dom";
import Card from "./Card/Card";
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
const dataObj = {
  UserInfo: { label: "회원정보수정", path: "UserInfo" },
  myCommunity: { label: "내 게시글", path: "MyCommunity" },
  question: { label: "1:1 문의하기", path: "question" },
  payment: { label: "결제내역", path: "payment" },
};

function MyPage() {
  const [activeComponent, setActiveComponent] = useState(null);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);
  console.log(userInfo);
  const email = localStorage.getItem("email");

  useEffect(() => {
    const queryOptions = {
      conditions: [{ field: "email", operator: "==", value: email }],
    };
    dispatch(fetchUser({ collectionName: "users", queryOptions }));
  }, []);

  const handleComponentChange = (componentName) => {
    if (activeComponent === componentName) {
      setActiveComponent(null);
    } else {
      setActiveComponent(componentName);
    }
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
            <Card>
              회원정보 수정
              <button onClick={() => handleComponentChange("UserInfo")}>
                <span>
                  <FaAngleDoubleRight className={styles.click} />
                </span>
              </button>
            </Card>
            <Card>
              내 게시글
              <button onClick={() => handleComponentChange("MyCommunity")}>
                <span>
                  <FaAngleDoubleRight className={styles.click} />
                </span>
              </button>
            </Card>

            <Card>
              1:1 문의하기
              <button onClick={() => handleComponentChange("Question")}>
                <span>
                  <FaAngleDoubleRight className={styles.click} />
                </span>
              </button>
            </Card>

            <Card>
              결제 내역
              <button onClick={() => handleComponentChange("Payment")}>
                <span>
                  <FaAngleDoubleRight className={styles.click} />
                </span>
              </button>
            </Card>
          </div>
        </div>
        {activeComponent === "UserInfo" && <UserInfo />}
        {activeComponent === "MyCommunity" && <MyCommunity />}
        {activeComponent === "Question" && <Question />}
        {activeComponent === "Payment" && <Payment />}
      </div>
    </div>
  );
}

export default MyPage;
