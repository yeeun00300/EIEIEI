import React from "react";
import { useDispatch } from "react-redux";
import { getUserAuth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
} from "firebase/auth";
import { setUser } from "../../store/userSlice/userSlice"; // 사용자 상태 업데이트
import Form from "../../pages/Login/Form/Form";
import styles from "./EmailSignUp.module.scss";

function EmailSignUp(props) {
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleSignUpAndLogin = async (email, password) => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      if (signInMethods.length > 0) {
        alert("이미 가입된 이메일입니다.");
        navigate("/"); // 로그인 페이지로 이동
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      // 이메일 인증 링크 전송
      const actionCodeSettings = {
        url: "http://localhost:3000/verify-email", // 개발 환경 URL
        handleCodeInApp: true,
      };
      await sendEmailVerification(user, actionCodeSettings);

      // 상태 관리로만 사용자 정보를 업데이트
      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );

      alert("인증 링크가 발송 되었습니다. 확인해주세요.");
      navigate("/verify-email"); // 회원가입 완료 후 이동할 페이지
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("이미 가입된 이메일입니다.");
        navigate("/"); // 로그인 페이지로 이동
      } else {
        console.log("에러 발생: ", error); // 기타 에러를 로그로 출력
        alert("관리자 문의");
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h1>회원가입</h1>
        <Form title={"회원가입"} getDataForm={handleSignUpAndLogin} />
      </div>
    </div>
  );
}

export default EmailSignUp;
