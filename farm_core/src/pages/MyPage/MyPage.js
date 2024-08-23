import React from "react";
import styles from "./MyPage.module.scss";
import img from "../../img/person.png";
import { FaAngleDoubleRight } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
function MyPage() {
  return (
    <div className="page">
      <div className="container">
        <div className={styles.wrapper}>
          <h1 className={styles.title}>회원정보</h1>
          <div className={styles.profile}>
            <div>
              <img src={img} />
              <p>홍길동</p>
            </div>
          </div>
          <div className={styles.info}>
            <FaBars />
            <span>내정보 수정하기</span>
            <FaAngleDoubleRight />
          </div>
          <div className={styles.info}>
            <FaBars />
            <span>1:1 문의하기</span>
            <FaAngleDoubleRight />
          </div>
          <div className={styles.info}>
            <FaBars />
            <span>결제 하러가기</span>
            <FaAngleDoubleRight />
          </div>
          <div className={styles.info}>
            <FaBars />
            <span>결제 내역 보기</span>
            <FaAngleDoubleRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
