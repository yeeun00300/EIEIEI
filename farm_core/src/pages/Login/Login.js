import React, { useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {
  setError,
  setIsLoading,
  setNotLogin,
  setPassword,
  setUsername,
} from "../../store/loginSlice/loginSlice";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Form from "./Form/Form";

const { Kakao } = window;
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();
  const [userData, setUserData] = useState(null);

  const [userId, setUserId] = useState("");

  const { userid, password, isLoading, notLogin, email } = useSelector(
    (state) => state.loginSlice
  );
  console.log(notLogin);

  const handleLogin = async (e) => {
    // e.preventDefault();

    // dispatch(setIsLoading(true));

    try {
      // Firebase Authentication을 사용해 로그인
      const userCredential = await auth.signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Firestore에서 사용자 데이터 가져오기
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const firestoreUserId = userDoc.data().id; // Firestore에서 가져온 ID

        const localStorageUserId = localStorage.getItem("id");

        // Firestore ID와 로컬 스토리지 ID 비교
        if (firestoreUserId === localStorageUserId) {
          console.log("로그인 성공");
          dispatch(setNotLogin(false));
          navigate("/");
        } else {
          dispatch(setError("ID가 일치하지 않습니다."));
          dispatch(setNotLogin(true));
        }
      } else {
        dispatch(setError("사용자 정보가 없습니다."));
        dispatch(setNotLogin(true));
      }
    } catch (error) {
      console.error("로그인 실패:", error);
      dispatch(setError("로그인 실패: " + error.message));
      dispatch(setNotLogin(true));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  // const localStorageUserId = localStorage.getItem("id");

  // const handleLogin = (e) => {
  //   console.log(e.target.value);

  //   localStorage.setItem("id", userId);
  //   dispatch(setNotLogin(false));
  //   if (localStorageUserId) {
  //     alert("로그인 성공");

  //     dispatch(setNotLogin(false));

  //     navigate("/");
  //   } else {
  //     dispatch(setError("아이디 또는 비밀번호가 틀렸습니다"));
  //     return false;
  //   }
  // };

  const handleChange = (e) => {
    dispatch(setUsername(e.target.value));
    setUserId(e.target.value);
  };

  // setTimeout(() => {});

  // useEffect(() => {
  // const storeUserId = localStorage.getItem("id");
  // if (storeUserId) {
  //   dispatch({});
  // }
  // }, [localStorageUserId]);
  // localStorage.getItem("id");

  // const userId = () => {
  //   localStorage.getItem("id");
  // };

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
        <button onClick={handleLogin}>카카오 로그인</button>
      </>
    );
  };
  // const code = new URL(document.URL).searchParams.get("code");

  // 카카오 로그인
  const handleKakaoLogin = () => {
    Kakao.Auth.login({
      success: function (authObj) {
        console.log("카카오 로그인 성공:", authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (response) {
            console.log("사용자 정보:", response);
            // 카카오 로그인 성공 시 처리할 로직 추가
            const userInfo = {
              id: response.id,
              email: response.kakao_account.email,
            };
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
            setUserInfo(userInfo);

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
        // localStorage.removeItem("userInfo");
        // setUserId("");
      });
    } else {
      console.log("로그인 상태가 아닙니다.");
    }
  };

  // 구글

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
        console.log(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className={styles.container}>
      <Form title={"로그인"} getDataForm={handleLogin} />
      {/* <h1>로그인</h1>
      <label>
        아이디
    
        <input onChange={handleChange} />
   
      </label>
      <label>
        비밀번호
        <input
          type="password"
          onClick={(e) => dispatch(setPassword(e.target.value))}
        />
      </label> */}
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
          <SocialKakao />
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
