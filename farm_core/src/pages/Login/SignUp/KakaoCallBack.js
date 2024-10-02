import React, { useEffect } from "react";
import axios from "axios";
import { OAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, checkUserInFirestore } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setNickname,
} from "../../../store/joinUserSlice/joinUserSlice";
import { setNotLogin } from "../../../store/loginSlice/loginSlice";

function KakaoCallBack(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.user.email);
  const nickname = useSelector((state) => state.user.nickname);
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
          payload.append("client_secret", client_secret); // 필요 없으면 생략 가능
        }

        // console.log(
        //   `카카오API:${kakaoAPIKey},redirectURI:${redirectURI},코드:${code}`
        // );

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
          const username = nickname;

          dispatch(setEmail(email));
          dispatch(setNickname(username));

          const isUserExists = await checkUserInFirestore(email);

          const provider = new OAuthProvider("oidc.kakao");
          const credential = provider.credential({
            idToken: id_token,
          });

          // Firebase 인증
          await signInWithCredential(auth, credential);

          // 인증 성공 후 사용자 상태 확인 및 리디렉션
          if (isUserExists) {
            // 이미 등록된 사용자
            alert("가입된 정보입니다. 로그인을 성공했습니다.");
            // navigate("/"); // 메인 페이지로 리디렉션
            // dispatch()
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
          console.error("오류 발생:", error.message);
        }
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  return <></>;
}

export default KakaoCallBack;
