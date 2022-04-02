import PropTypes from "prop-types";

import styles from "./ModalOverlay.module.css";

function ModalOverlay({ children, handleClickOverlay }) {
  return (
    <div className={styles["modal"]} onClick={handleClickOverlay}>
      {children}
    </div>
  );
}

ModalOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  handleClickOverlay: PropTypes.func.isRequired,
};

export default ModalOverlay;
