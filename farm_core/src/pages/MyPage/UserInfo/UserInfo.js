import React from "react";
import styles from "./UserInfo.module.scss";
import img from "../../../img/person.png";
import { Outlet } from "react-router-dom";
function UserInfo(props) {
  return (
    <div className="page">
      <div className="container">
        <h1>My Page</h1>
        <hr />
        <div className={styles.wrapper}>
          <div className={styles.userInfo}>
            <div className={styles.profile}>
              프로필 사진: <img src={img} />
            </div>
            <div>
              이름 : <input />
            </div>
            <div>
              생년월일 : <input type="date" />
            </div>
            <div>
              전화번호 : <input />
            </div>
            <div>주소 : </div>
            <div className={styles.buttons}>
              <button className={styles.google}>Google로그인하기</button>
              <button className={styles.naver}>Naver로그인하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
