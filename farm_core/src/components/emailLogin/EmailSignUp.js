import React from "react";
import { useDispatch } from "react-redux";
import { getUserAuth, joinUser } from "../../firebase";
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
      console.log("Creating/updating user with UID:", user.uid);
      // await joinUser(user.uid, user.email);
      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );
      navigate("/SignUp");
    } catch (error) {
      console.log(error);
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
