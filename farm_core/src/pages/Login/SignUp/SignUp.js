import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { getUserAuth } from "../../../firebase";
import Address from "./../../../api/address/Address";
import logoImg from "./../../../img/TitleLogo.png";
import { FaRegUser } from "react-icons/fa";
import { doc, setDoc } from "firebase/firestore";

// const [popup, setPopup] = useState(false);
// const [enroll_company, setEnroll_company] = useState({
//   address: "",
// });
function SignUp({ auth, db }) {
  //   const { handleSubmit, register } = useForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        name: data.name,
        id: data.id,
        address: data.address,
        email: data.email,
      });
    } catch (error) {
      console.error("Error registering user: ", error);
    }
  };

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm({
  //   mode: "onChange",
  // });

  // console.log(errors);

  // 주소찾기
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
    <div className={styles.main}>
      <img className={styles.logo} src={logoImg} />
      <h2>Farm Core</h2>
      <h3>회원가입</h3>
      <form onClick={handleSubmit(onSubmit)}>
        <div className={styles.name}>
          <div className={styles.img}>
            <FaRegUser />
          </div>
          <input placeholder="이름을 입력해주세요." type="text" />
        </div>
        <div>
          아이디
          <input placeholder="ID를 입력해주세요." />
          <button>중복확인</button>
        </div>
        <div>
          비밀번호
          <input placeholder="대소문자,숫자 조합 8~16자 이내" type="password" />
        </div>
        <div>
          비밀번호 확인
          <input placeholder="위 비밀번호와 동일하게 입력해주세요." />
        </div>
        <div>
          이메일
          <input placeholder="Email을 입력해주세요" type="email" />
        </div>
        <div>
          주소
          <input
            className="user_enroll_text"
            placeholder="주소"
            type="text"
            required={true}
            name="address"
            onChange={handleInput}
            value={enroll_company.address}
          />
          <button onClick={handleComplete}>우편번호 찾기</button>
          <div>
            <input placeholder="상세주소를 입력해주세요." />
          </div>
          {popup && (
            <Address
              company={enroll_company}
              setcompany={setEnroll_company}
            ></Address>
          )}
        </div>
        <div className={styles.button}>
          <button>회원가입</button>
          <button>취소</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
