import React from "react";
import DaumPostcode from "react-daum-postcode";
import styles from "./Address.module.scss";

function Address({ setcompany }) {
  const complete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    if (typeof setcompany === "function") {
      setcompany({
        address: fullAddress,
        detailedAddress: data.bname || "", // Example additional data
      });
    } else {
      console.error("setcompany is not a function");
    }
  };

  //   props.setcompany({
  //     ...props.company,
  //     address: fullAddress,
  //   });
  // };

  return (
    <div>
      <DaumPostcode
        className={styles.postmodal}
        autoClose
        onComplete={complete}
      />
    </div>
  );
}
export default Address;
