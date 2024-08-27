import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setError,
  setIsLoading,
  setNotLogin,
  setPassword,
  setUsername,
} from "../../store/loginSlice/loginSlice";
import { getAuth } from "firebase/auth";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const [userId, setUserId] = useState("");

  const { username, password, isLoading, notLogin } = useSelector(
    (state) => state.loginSlice
  );
  console.log(notLogin);

  const localStorageUserId = localStorage.getItem("id");

  const handleLogin = (e) => {
    // console.log(e.target.value);

    localStorage.setItem("id", userId);
    dispatch(setNotLogin(false));
    if (localStorageUserId) {
      alert("로그인 성공");

      dispatch(setNotLogin(false));

      navigate("/");
    } else {
      dispatch(setError("아이디 또는 비밀번호가 틀렸습니다"));
      return false;
    }
  };

  const handleChange = (e) => {
    dispatch(setUsername(e.target.value));
    setUserId(e.target.value);
  };

  // setTimeout(() => {});

  useEffect(() => {
    // const storeUserId = lacalStorage.getItem("id");
    // if (storeUserId) {
    // dispatch({  });
    // }
  }, [localStorageUserId]);
  // localStorage.getItem("id");

  // const userId = () => {
  //   localStorage.getItem("id");
  // };

  return (
    <div className={styles.container}>
      <h1>로그인</h1>
      <label>
        아이디
        {/* <input value={userId} onChange={handleChange} /> */}
        <input onChange={handleChange} />
        {/* <input onClick={handleClick} /> */}
      </label>
      <label>
        비밀번호
        <input
          type="password"
          onClick={(e) => dispatch(setPassword(e.target.value))}
        />
      </label>
      <div>
        <div>
          <button onClick={handleLogin}>로그인 하기</button>
        </div>
        <div>
          <button className={styles.google}>구글로 로그인</button>
        </div>
        <div>
          <button className={styles.kakao}>카카오로 로그인</button>
        </div>
        <Link to={"/SignUp"}>
          <button>회원가입</button>
        </Link>
        <button>아이디 찾기</button>
        <button>비밀번호 찾기</button>
      </div>
    </div>
  );
}

export default Login;
