import React, { useRef } from "react";
import SignUp from "../Login/SignUp/SignUp";
import styles from "./Intro.module.scss";
import { Link } from "react-router-dom";
import video from "../../video/video.mp4";
import Login from "../Login/Login";

function Intro(props) {
  const videoRef = useRef();
  const setPlayBackRate = () => {
    videoRef.current.playbackRate = 1;
  };

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
        </div>
        <video
          className={styles.bg}
          muted
          autoPlay
          loop
          ref={videoRef}
          onCanPlay={() => setPlayBackRate()}
        >
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className={styles.buttons}>
        <button className={styles.button}>
          {/* <Link to={"/Login"}>로그인</Link> */}
          <Login />
        </button>
        <button className={styles.button}>
          <Link to={"/SignUp"}>회원가입</Link>
        </button>
      </div>
    </div>
  );
}

export default Intro;
