import React from "react";
import { useDispatch } from "react-redux";
import { getUserAuth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../store/userSlice/userSlice";
import Form from "../../pages/Login/Form/Form";

function EmailLogin(props) {
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return <Form title={"로그인"} getDataForm={handleLogin} />;
}

export default EmailLogin;
