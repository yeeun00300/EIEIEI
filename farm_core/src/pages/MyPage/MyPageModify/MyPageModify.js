import React from "react";
import styles from "./MyPage.module.scss";
// import img from "../../img/TitleLogo.png";
import img from "../../img/person.png";
function MyPageModify(props) {
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
            <div>이름 : 김경문</div>
            <div>생년월일 : 1990.06.13</div>
            <div>전화번호 : 010-1111-1111</div>
            <div>주소 : 대전광역시 유성구 관평동 한신에스메가 334호</div>
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

export default MyPageModify;
