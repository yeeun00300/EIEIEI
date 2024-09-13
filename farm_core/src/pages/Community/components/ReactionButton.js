import React from "react";
import PropTypes from "prop-types";
import styles from "./ReactionButton.module.scss";

const ReactionButton = React.memo(({ type, onClick, count, active }) => {
  return (
    <button
      className={`${styles.button} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      {type === "like" ? "👍" : "👎"} {count}
    </button>
  );
});

ReactionButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
};

export default ReactionButton;
