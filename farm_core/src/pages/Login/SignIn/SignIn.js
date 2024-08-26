import React from "react";
import styles from "./SignIn.module.scss";

function SignIn() {
  return (
    <div className={styles.container}>
      <h1>로그인</h1>
      <label>
        아이디
        <input />
      </label>
      <label>
        비밀번호
        <input />
      </label>
      <div>
        <div>
          <button className={styles.google}>구글로 로그인</button>
        </div>
        <div>
          <button className={styles.kakao}>카카오로 로그인</button>
        </div>
        <button>회원가입</button>
        <button>아이디 찾기</button>
        <button>비밀번호 찾기</button>
      </div>
    </div>
  );
}

export default SignIn;
