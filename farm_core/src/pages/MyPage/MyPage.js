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
import FilterGrid from "../../components/Grid/FilterGrid";
const dataObj = {
  UserInfo: { label: "회원정보수정", path: "UserInfo" },
  myCommunity: { label: "내 게시글", path: "MyCommunity" },
  question: { label: "1:1 문의하기", path: "question" },
  payment: { label: "결제내역", path: "payment" },
};

function MyPage() {
  const { id } = useParams();
  const userId = Number(id);
  const [user, setUser] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);
  const isEditingUser = useSelector((state) => state.user.isEditingUser);
  useEffect(() => {
    const queryOptions = [{ condition: "id", operator: "==", value: userId }];
    dispatch(fetchUser({ collectionName: "users", queryOptions }))
      .unwrap()
      .then((result) => {
        console.log("불러온 유저 정보:", result); // 불러온 유저 정보 로그
      })
      .catch((error) => {
        console.error("유저 정보 불러오기 에러:", error); // 에러 로그
      });
  }, [dispatch, userId]);

  const handleComponentChange = (componentName) => {
    if (activeComponent === componentName) {
      setActiveComponent(null);
    } else {
      setActiveComponent(componentName);
    }
  };

  return (
    <div className="page">
      <div>
        <div className={styles.wrapper}>
          <div className={styles.user}>
            <h3>ID님 환영합니다.</h3>
            <div>
              <button>로그아웃</button>
            </div>
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
          <FilterGrid />
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
