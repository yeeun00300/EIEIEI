import React from "react";
import { useNavigate } from "react-router-dom";

function FirstPage(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/My_Farm_Add");
  };
  return (
    <div className="page">
      <button onClick={handleClick}>농장 추가하러가기</button>
    </div>
  );
}

export default FirstPage;
