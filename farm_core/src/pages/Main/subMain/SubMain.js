import React, { useState } from "react";
import styles from "./SubMain.module.scss";
import CurrentMarker from "../../../components/DiseaseStatus/CurrentMarker";
import { AiOutlineSearch } from "react-icons/ai";

function SubMain(props) {
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    setIsEditing(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <div className={styles.subMain}>
      <button onClick={handleOpenModal}>
        {" "}
        <AiOutlineSearch /> 내 주변 동물병원
      </button>

      {openModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closebutton} onClick={handleCloseModal}>
              X
            </button>
            <CurrentMarker />
          </div>
        </div>
      )}
    </div>
  );
}

export default SubMain;
