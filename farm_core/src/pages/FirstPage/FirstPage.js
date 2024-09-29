import React from "react";
import { useNavigate } from "react-router-dom";
import warn from "../../img/warn.svg";
import styles from "./FirstPage.module.scss";

function FirstPage(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/My_Farm_Add");
  };
  return (
    <div className="page">
      <div className={styles.warnDiv}>
        <img src={warn} alt="" />
        <h2>등록된 농장이 없습니다.</h2>
        <button className="squareGlobalBtn" onClick={handleClick}>
          농장 추가하러가기
        </button>
      </div>
    </div>
  );
}

export default FirstPage;
