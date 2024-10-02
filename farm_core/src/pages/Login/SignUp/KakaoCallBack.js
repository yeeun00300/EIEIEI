import React, { useEffect } from "react";
import axios from "axios";
import { OAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, checkUserInFirestore, db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setEmail,
  setNickname,
} from "../../../store/joinUserSlice/joinUserSlice";
import { setNotLogin } from "../../../store/loginSlice/loginSlice";
import { collection, query, where, getDocs } from "firebase/firestore"; // Firestore 관련 모듈 추가

function KakaoCallBack(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const params = new URL(document.location.toString()).searchParams;
      const code = params.get("code");
      const kakaoAPIKey = process.env.REACT_APP_REST_API_KEY;
      const redirectURI = process.env.REACT_APP_REDIRECT_URI;
      const client_secret = process.env.REACT_APP_CLIENT_SECRET;

      if (code) {
        const payload = new URLSearchParams();
        payload.append("grant_type", "authorization_code");
        payload.append("client_id", kakaoAPIKey);
        payload.append("redirect_uri", redirectURI);
        payload.append("code", code);
        if (client_secret) {
          payload.append("client_secret", client_secret);
        }

        try {
          const tokenResponse = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            payload,
            {
              headers: {
                "Content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          );

          const { access_token, id_token } = tokenResponse.data;

          const userInfoResponse = await axios.post(
            `https://kapi.kakao.com/v2/user/me`,
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          );

          const email = userInfoResponse.data.kakao_account.email;
          const nickname = userInfoResponse.data.kakao_account.profile.nickname;
          dispatch(setEmail(email));
          dispatch(setNickname(nickname));

          // Firestore에서 이메일 주소로 사용자 데이터 조회
          const usersQuery = query(
            collection(db, "users"),
            where("email", "==", email)
          );
          const querySnapshot = await getDocs(usersQuery);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data(); // 첫 번째 문서의 데이터 가져오기

            // 사용자의 상태 확인
            if (userData.isActive === "N") {
              alert(
                "해당 계정은 탈퇴된 상태입니다. 관리자에게 문의해주세요. 042-314-4741"
              );
              dispatch(setNotLogin(true));
              await auth.signOut(); // 로그인 세션 종료
              navigate("/"); // 메인 페이지로 리디렉션
              return; // 로그인 절차 중단
            }

            if (userData.blackState === "black") {
              alert(
                "블랙처리된 계정입니다. 관리자에게 문의해주세요. 042-314-4741"
              );
              dispatch(setNotLogin(true));
              await auth.signOut(); // 로그인 세션 종료
              navigate("/"); // 메인 페이지로 리디렉션
              return; // 로그인 절차 중단
            }

            // Firebase 인증
            const provider = new OAuthProvider("oidc.kakao");
            const credential = provider.credential({
              idToken: id_token,
            });
            await signInWithCredential(auth, credential); // Firebase 인증

            // 로그인 성공 처리
            alert("로그인 성공!");
            localStorage.setItem("email", email);
            dispatch(setNotLogin(false));
            navigate("/"); // 메인 페이지로 리디렉션
          } else {
            // 신규 사용자
            navigate("/SignUp"); // 회원가입 페이지로 리디렉션
          }
        } catch (error) {
          console.error("응답 데이터:", error.response?.data);
          console.error("응답 상태 코드:", error.response?.status);
          alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  return <></>;
}

export default KakaoCallBack;
