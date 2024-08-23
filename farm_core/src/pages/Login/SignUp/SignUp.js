import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getUserAuth } from "../../../firebase";
import Address from "./../../../api/address/Address";

function SignUp() {
  // const auth = getUserAuth();
  // const signup = async () => {
  //   const user = await createUserWithEmailAndPassword(
  //     auth,
  //     "dadaw@vads.com",
  //     "231421"
  //   );
  //   console.log(user);
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   const {
  //     email: { value: email },
  //     password: { value: password },
  //   } = e.target;
  //   register(email, password);
  // };
  const [enroll_company, setEnroll_company] = useState({
    address: "",
  });

  const [popup, setPopup] = useState(false);

  const handleInput = (e) => {
    setEnroll_company({
      ...enroll_company,
      [e.target.name]: e.target.value,
    });
  };

  const handleComplete = (data) => {
    setPopup(!popup);
  };

  return (
    <div>
      <h3>회원가입</h3>
      <form>
        <div>
          이름 :
          <input placeholder="이름을 입력해주세요." type="name" />
        </div>
        <div>
          아이디 :
          <input placeholder="ID를 입력해주세요." />
          <button>중복확인</button>
        </div>
        <div>
          비밀번호 :
          <input placeholder="대소문자,숫자 조합 8~16자 이내" type="password" />
        </div>
        <div>
          비밀번호 확인 :
          <input placeholder="위 비밀번호와 동일하게 입력해주세요." />
        </div>
        <div>
          이메일 :
          <input placeholder="Email을 입력해주세요" type="email" />
        </div>
        <div>
          <input
            className="user_enroll_text"
            placeholder="주소"
            type="text"
            required={true}
            name="address"
            onChange={handleInput}
            value={enroll_company.address}
          />
          <div>
            <input placeholder="상세주소를 입력해주세요." />
          </div>
          <button onClick={handleComplete}>우편번호 찾기</button>
          {popup && (
            <Address
              company={enroll_company}
              setcompany={setEnroll_company}
            ></Address>
          )}
        </div>
        <button>회원가입</button>
        <button>취소</button>
      </form>
    </div>
  );
}

export default SignUp;
