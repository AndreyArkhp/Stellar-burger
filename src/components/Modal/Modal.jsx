import {useEffect} from "react";
import {createPortal} from "react-dom";
import PropTypes from "prop-types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";

function Modal({children, setActive}) {
  const modalRoot = document.getElementById("modal-root");

  const modal = (
    <ModalOverlay handleClickOverlay={handleClickOverlay}>
      <div className={styles.modal__container}>
        <span
          className={`${styles["close-icon"]} mt-15 mr-10`}
          onClick={() => {
            setActive(false);
          }}
        >
          <CloseIcon type="primary" />
        </span>
        {children}
      </div>
    </ModalOverlay>
  );

  useEffect(() => {
    document.addEventListener("keydown", closeEsc);
    return () => {
      document.removeEventListener("keydown", closeEsc);
    };
  }, []);

  function handleClickOverlay(event) {
    Object.is(event.target, event.currentTarget) && setActive(false);
  }

  function closeEsc(event) {
    if (Object.is("Escape", event.key)) {
      setActive(false);
    }
  }

  return createPortal(modal, modalRoot);
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
