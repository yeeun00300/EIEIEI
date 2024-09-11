import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function MedicalListCheck({ email, date }) {
  const navigate = useNavigate();

  const formData = useSelector((state) => state.medical);
  const goDetail = () => {
    navigate(`/medicallist/${email}`);
  };
  return (
    <div>
      <div>
        <p>{email}</p>
        {/* <p>{farm}</p> */}
      </div>
    </div>
  );
}

export default MedicalListCheck;
