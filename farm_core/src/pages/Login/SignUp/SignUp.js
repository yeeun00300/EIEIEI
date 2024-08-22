import React from "react";
import styles from "./SignUp.module.scss";

function SignUp() {
  return (
    <div>
      <p>회원가입</p>
      <div>
        이름 :
        <input />
      </div>
      <div>
        아이디 :
        <input />
      </div>
      <div>
        비밀번호 :
        <input />
      </div>
      <div>
        비밀번호 확인 :
        <input />
      </div>
      <div>
        이메일 :
        <input />
      </div>
      <div>
        주소 :
        <input />
      </div>
      <button>회원가입</button>
      <button>취소</button>
    </div>
  );
}

export default SignUp;
