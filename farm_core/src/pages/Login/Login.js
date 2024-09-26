import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { checkUserInFirestore, db } from "../../firebase";
import kakaoImg from "../../img/kakao_login.png";
import googleSvg from "../../img/web_light_sq_SU.svg";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";

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

  // 사용자의 상태를 실시간으로 감시하는 함수
  const monitorUserStatus = (userEmail) => {
    const userDocQuery = query(
      collection(db, "users"),
      where("email", "==", userEmail)
    );

    const unsubscribe = onSnapshot(userDocQuery, (snapshot) => {
      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        console.log("실시간 사용자 상태:", userData);

        if (userData.blackState === "black") {
          alert("블랙처리된 계정입니다. 자동으로 로그아웃됩니다.");
          handleLogout();
        }
      }
    });

    return unsubscribe; // 감시를 해제하는 함수를 반환
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("email");
      dispatch(setNotLogin(true));
      navigate("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
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

      if (user && user.email) {
        // Firestore에서 이메일 주소로 사용자 데이터 조회
        const usersQuery = query(
          collection(db, "users"),
          where("email", "==", user.email)
        );
        const querySnapshot = await getDocs(usersQuery);
        console.log(querySnapshot);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data(); // 첫 번째 문서의 데이터 가져오기

          // 사용자의 상태 확인
          if (userData.isActive === "N") {
            alert(
              "해당 계정은 탈퇴된 상태입니다. 관리자에게 문의해주세요. 042-314-4741"
            );
            dispatch(setNotLogin(true));
            await auth.signOut(); // 로그인 세션 종료
            return; // 로그인 절차 중단
          }

          if (userData.blackState === "black") {
            alert(
              "블랙처리된 계정입니다. 관리자에게 문의해주세요. 042-314-4741"
            );
            dispatch(setNotLogin(true));
            await auth.signOut(); // 로그인 세션 종료
            return; // 로그인 절차 중단
          }

          // 로그인 성공 처리 후 실시간 상태 감시 시작
          localStorage.setItem("authToken", user.refreshToken);
          localStorage.setItem("userId", user.uid); // 사용자 데이터에서 uid 가져오기
          localStorage.setItem("email", user.email);
          dispatch(setNotLogin(false));
          monitorUserStatus(user.email); // 실시간 상태 감시 함수 호출
          navigate("/"); // 메인 페이지로 리디렉션
        } else {
          console.error("사용자 문서가 존재하지 않습니다.");
          alert("사용자 데이터가 존재하지 않습니다.");
          dispatch(setNotLogin(true));
        }
      } else {
        console.error("로그인된 사용자 정보가 없습니다.");
        alert("로그인 실패: 사용자 정보가 없습니다.");
        dispatch(setNotLogin(true));
      }
    } catch (error) {
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

  // 구글 로그인
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
          // 구글 최초 회원가입 -> 추가정보입력페이지로 이동
          console.log(`false확인용`);
          localStorage.setItem("email", user.email);
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
          <Link to={"/password"}>비밀번호 찾기</Link>
          <Link to={"/emailsignup"}>회원가입</Link>
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
