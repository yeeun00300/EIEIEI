import React, { useEffect, useRef } from "react";
import SignUp from "../Login/SignUp/SignUp";
import styles from "./Intro.module.scss";
import { Link, useNavigate } from "react-router-dom";
import video from "../../video/video.mp4";
import Login from "../Login/Login";

function Intro(props) {
  const videoRef = useRef();
  const navigate = useNavigate();
  const setPlayBackRate = () => {
    videoRef.current.playbackRate = 1;
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("authToken"); // 예시로 authToken 확인
    if (!isLoggedIn) {
      navigate("/"); // 로그인 페이지로 리다이렉트
    }

    // localStorage.clear(); // 로컬스토리지 비우는 것은 주의
  }, [navigate]);
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.serve}>
          <h1>소개글</h1>
          <p>
            스마트 팜 운영원리 생육환경 유지관리 SW(온실·축사 내 온·습도,
            CO2수준 등 생육조건 설정) <br />
            환경정보 모니터링(온·습도, 일사량, CO2, 생육환경 등자동수집) <br />
            자동·원격환경관리(냉·난방기 구동, 창문 개폐, CO2,영양분·사료 공급
            등)
          </p>
          <Login />
        </div>
        <video
          className={styles.bg}
          muted
          // autoPlay
          // loop
          ref={videoRef}
          onCanPlay={() => setPlayBackRate()}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}

export default Intro;
