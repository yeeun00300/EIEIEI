import React from "react";
import { useDispatch } from "react-redux";
import { checkUserInFirestore, getUserAuth, joinUser } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/userSlice/userSlice";
import Form from "../../pages/Login/Form/Form";

function EmailSignUp(props) {
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleSignUpAndLogin = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      if (user) {
        alert("이미 가입된 이메일입니다.");
        navigate("/"); // 로그인 페이지로 이동
        return;
      }

      localStorage.setItem("email", email);
      localStorage.setItem("uid", user.uid);

      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );
      navigate("/SignUp"); // 회원가입 완료 후 이동할 페이지
    } catch (error) {
      console.log(error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };
  return (
    <div className="container">
      <div className="form">
        <h1>회원가입</h1>
        <Form title={"회원가입"} getDataForm={handleSignUpAndLogin} />
      </div>
    </div>
  );
}

export default EmailSignUp;
