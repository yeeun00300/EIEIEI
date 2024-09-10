import React, { startTransition, useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {
  setEmail,
  setError,
  setIsLoading,
  setNotLogin,
  setPassword,
  setUsername,
} from "../../store/loginSlice/loginSlice";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Form from "./Form/Form";
import EmailLogin from "../../components/emailLogin/EmailLogin";
import EmailSignUp from "../../components/emailLogin/EmailSignUp";
import { checkUserInFirestore } from "../../firebase";

import kakaoImg from "../../img/kakao_login.png";
import googleImg from "../../img/google_login.png";

import googleSvg from "../../img/web_light_sq_SU.svg";

const { Kakao } = window;
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const { userid, password, isLoading, notLogin, email } = useSelector(
    (state) => state.loginSlice
  );
  console.log(notLogin);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("유효하지 않은 이메일 주소입니다.");
      return;
    }
    dispatch(setIsLoading(true));

    try {
      // Firebase Authentication을 사용해 로그인
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      console.log(user);

      if (user) {
        if (user && user.email) {
          // 추가 정보 입력이 완료된 사용자
          localStorage.setItem("authToken", user.refreshToken);
          localStorage.setItem("userId", user.uid);
          localStorage.setItem("email", user.email);
          console.log("로그인 성공", user);
          dispatch(setNotLogin(false));
          navigate("/"); // 메인 페이지로 리디렉션
        } else {
          // 추가 정보 입력이 필요한 사용자
          navigate("/SignUp"); // 추가 정보 입력 페이지로 리디렉션
        }
      } else {
        // 사용자 문서가 존재하지 않으면 에러 처리
        throw new Error("사용자 데이터가 존재하지 않습니다.");
      }
    } catch (error) {
      // console.log(error.code);
      // console.log(error.message);
      let errorMessage;

      switch (error.code) {
        case "auth/wrong-password":
          errorMessage = "비밀번호가 올바르지 않습니다.";
          break;
        case "auth/user-not-found":
          errorMessage = "이메일이 등록되어 있지 않습니다.";
          break;
        case "auth/invalid-email":
          errorMessage = "유효하지 않은 이메일 주소입니다.";
          break;
        case "auth/invalid-credential":
          errorMessage = "이메일 또는 비밀번호를 확인해주세요.";
          break;
        default:
          errorMessage = "로그인 실패: " + error.message;
      }

      console.error(errorMessage);
      alert(errorMessage);
      dispatch(setError(errorMessage));
      dispatch(setNotLogin(true));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  // 카카오 소셜 로그인
  const [userInfo, setUserInfo] = useState(() => {
    // 페이지 로드 시 로컬 스토리지에서 사용자 정보 불러오기
    const savedUserInfo = localStorage.getItem("userInfo");
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });

  useEffect(() => {
    const kakaoKey = process.env.KAKAO_APP_KEY; // 카카오 JavaScript 키
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }
  }, []);

  const SocialKakao = () => {
    const kakaoAPIKey = `${process.env.REACT_APP_REST_API_KEY}`;
    const redirectURI = `${process.env.REACT_APP_REDIRECT_URI}`;
    const kakaoAuthURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoAPIKey}&redirect_uri=${redirectURI}&response_type=code`;
    const handleLogin = () => {
      window.location.href = kakaoAuthURL;
    };
    return (
      <>
        <button className={styles.kakao} onClick={handleLogin} type="button">
          <img className={styles.logos} src={kakaoImg} alt="" />
        </button>
      </>
    );
  };

  // 구글

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const isUserExists = await checkUserInFirestore(user.email);
        console.log(isUserExists);
        if (isUserExists) {
          // 이미 가입한 사용자
          console.log(`true확인용`);
          localStorage.setItem("email", user.email);
          dispatch(setNotLogin(false));
          navigate("/");
        } else {
          // 구글 최초 회원가입->추가정보입력페이지 이동
          console.log(`false확인용`);
          navigate("/SignUp");
        }
      })
      .catch((error) => {
        console.error("Google login error:", error);
        alert("로그인 실패: " + error.message);
      });
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin}>
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <input
              id="email"
              type="text"
              // placeholder="Email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              required
            />
            <label htmlFor="email">Email</label>
            <span></span>
          </div>
          <div className={styles.loginBox}>
            <input
              id="password"
              type="password"
              // placeholder="Password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              required
            />
            <label htmlFor="password">Password</label>
            <span></span>
          </div>
        </div>
        <button className={styles.loginBtn} type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className={styles.links}>
          <Link>아이디 찾기</Link>|<Link>비밀번호 찾기</Link>|
          <Link to={"/emailsignup"}>회원 가입하기</Link>
        </div>
        <div className={styles.buttons}>
          <button
            className={styles.google}
            onClick={handleGoogleLogin}
            type="button"
          >
            <img className={styles.logos} src={googleSvg} alt="" />
          </button>
          <SocialKakao />
        </div>
      </form>
    </div>
  );
}

export default Login;
