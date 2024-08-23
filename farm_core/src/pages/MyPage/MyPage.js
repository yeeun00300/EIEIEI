import React from "react";
import styles from "./MyPage.module.scss";
import { FaAngleDoubleRight } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import Card from "./Card/Card";
import ListItem from "@mui/material/ListItem";
const dataObj = {
  UserInfo: { label: "회원정보수정", path: "UserInfo" },
  myCommunity: { label: "내 게시글", path: "MyCommunity" },
  question: { label: "1:1 문의하기", path: "question" },
  payment: { label: "결제내역", path: "payment" },
};

function MyPage() {
  return (
    <div className="page">
      <div className="container">
        <div className={styles.wrapper}>
          <div className={styles.user}>
            <h3>ID님 환영합니다.</h3>
            <div>
              <button>로그아웃</button>
            </div>
          </div>
          <div className={styles.lists}>
            <Link to="/UserInfo">
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
