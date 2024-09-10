import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Question.module.scss";

function Question(props) {
  return (
    <div className="page">
      <div className={styles.contact}>
        <h2>연락처 및 문의</h2>
        <p>이메일: FarmCore@gmail.com</p>
        <p>전화번호: 070-7111-1020</p>
        <form>
          <div>
            카테고리
            <select>
              <option>한우</option>
              <option>낙농</option>
              <option>양계</option>
              <option>양돈</option>
            </select>
          </div>
          <div className={styles.title}>
            <p>이름 : </p>
            <input type="text" id="name" name="name" />
          </div>
          <div className={styles.box}>
            <p>문의 내용:</p>
            <textarea id="message" name="message"></textarea>
          </div>
          <button type="submit">저장하기</button>
          <button type="submit">삭제하기</button>
        </form>
      </div>
    </div>
  );
}

export default Question;
