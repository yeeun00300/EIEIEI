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
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

  // 카카오 소셜 로그인
  useEffect(() => {
    const kakaoKey = "cb502fd50b617f7bae9c2c04c8d5bf24"; // 카카오 JavaScript 키
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }
  }, []);

  // 카카오 로그인
  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      success: function (authObj) {
        console.log("카카오 로그인 성공:", authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
            console.log("사용자 정보:", response);
            // 카카오 로그인 성공 시 처리할 로직 추가
            // navigator("/");
          },
          fail: function (error) {
            console.error("사용자 정보 요청 실패:", error);
          },
        });
      },
      fail: function (err) {
        console.error("카카오 로그인 실패:", err);
      },
    });
  };
  const handleKakaoLogout = () => {
    if (window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(() => {
        console.log("카카오 로그아웃 성공");
        // 로그아웃 후 처리할 로직 추가
      });
    } else {
      console.log("로그인 상태가 아닙니다.");
    }
  };

  // 구글

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("구글 로그인 성공:", user);
      // 로그인 성공 시 처리할 로직 추가
    } catch (error) {
      console.error("구글 로그인 실패:", error);
    }
  };

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
          <button className={styles.google} onClick={handleGoogleLogin}>
            구글로 로그인
          </button>
        </div>
        <div>
          <button
            className={styles.kakao}
            type="button"
            onClick={handleKakaoLogin}
          >
            카카오로 로그인
          </button>
          <button onClick={handleKakaoLogout}>카카오 로그아웃</button>
        </div>
        <Link to={"/SignUp"}>
          <button className={styles.signup}>회원가입</button>
        </Link>
        <button>아이디 찾기</button>
        <button>비밀번호 찾기</button>
      </div>
    </div>
  );
}

export default Login;
