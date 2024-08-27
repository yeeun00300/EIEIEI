import React, { useEffect } from "react";
import styles from "./MyPage.module.scss";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link, Outlet, useParams } from "react-router-dom";
import Card from "./Card/Card";
import ListItem from "@mui/material/ListItem";
import { useDispatch, useSelector } from "react-redux";
import userInfoEditSlice, {
  fetchUser,
} from "./../../store/userInfoEditSlice/UserInfoEditSlice";
const dataObj = {
  UserInfo: { label: "회원정보수정", path: "UserInfo" },
  myCommunity: { label: "내 게시글", path: "MyCommunity" },
  question: { label: "1:1 문의하기", path: "question" },
  payment: { label: "결제내역", path: "payment" },
};

function MyPage() {
  const { id } = useParams();
  const userId = Number(id);
  // const API_KEY = "6NBSX27F-6NBS-6NBS-6NBS-6NBSX27F4W";

  // const ASF = fetch(
  //   `/api2/sm/apis.do?apiKey=${API_KEY}&layer=A2SM_LvstckIctsd7&style=A2SM_LvstckIctsd7`
  // ).then((response) => {
  //   console.log(response.json());
  //   return response;
  // });

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userInfoEditSlice);
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
            <Link to={`/UserInfo${id}`}>
              <Card>
                회원정보 수정
                <span>
                  <FaAngleDoubleRight className={styles.click} />
                </span>
              </Card>
            </Link>
            <Link to="/MyCommunity">
              <Card>
                내 게시글
                <span>
                  <FaAngleDoubleRight className={styles.click} />
                </span>
              </Card>
            </Link>
            <Link to="/question">
              <Card>
                1:1 문의하기
                <span>
                  <FaAngleDoubleRight className={styles.click} />
                </span>
              </Card>
            </Link>
            <Link to="/payment">
              <Card>
                결제 내역
                <span>
                  <FaAngleDoubleRight className={styles.click} />
                </span>
              </Card>
            </Link>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MyPage;
