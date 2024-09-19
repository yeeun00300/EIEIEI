import React from "react";
import DaumPostcode from "react-daum-postcode";

const AddressSearch = ({ isOpen, onComplete, onClose }) => {
  if (!isOpen) return null;

  const themeObj = {
    bgColor: "#FFFFFF",
    pageBgColor: "#FFFFFF",
    postcodeTextColor: "#C05850",
    emphTextColor: "#222222",
  };

  const postCodeStyle = {
    width: "360px",
    height: "480px",
  };

  return (
    <DaumPostcode
      style={postCodeStyle}
      onComplete={onComplete}
      theme={themeObj}
    />
  );
};

export default AddressSearch;
