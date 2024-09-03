import React, { useEffect } from "react";
import axios from "axios";
import {
  getAuth,
  OAuthCredential,
  OAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../../firebase";

function KakaoCallBack(props) {
  useEffect(() => {
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

      console.log(
        `카카오API:${kakaoAPIKey},redirectURI:${redirectURI},코드:${code}`
      );

      axios
        .post("https://kauth.kakao.com/oauth/token", payload, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        })
        .then((res) => {
          console.log(res);
          const { access_token } = res.data;
          const { id_token } = res.data;

          // 유저 개인정보 받아오기 위한 호출 코드
          axios
            .post(
              `https://kapi.kakao.com/v2/user/me`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${access_token}`,
                  "Content-type":
                    "application/x-www-form-urlencoded;charset=utf-8",
                },
              }
            )
            .then((res) => {
              console.log(res);
              console.log(res.data.kakao_account.profile.nickname);
              console.log(res.data.kakao_account.profile.profile_image_url);
              console.log(res.data.kakao_account.email);
            });

          const provider = new OAuthProvider("oidc.kakao");
          const credential = provider.credential({
            // accessToken: access_token,
            idToken: id_token,
          });

          signInWithCredential(auth, credential)
            .then((result) => {
              const credential = OAuthProvider.credentialFromResult(result);
              const acToken = credential.accessToken;
              const idToken = credential.idToken;
              console.log("로그인 성공", result);
            })
            .catch((error) => {
              // Handle error.
              console.log(error);
            });
        })
        .catch((Error) => {
          console.log(Error);
        });
    }
  }, []);

  return <></>;
}

export default KakaoCallBack;
