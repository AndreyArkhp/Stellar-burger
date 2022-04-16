import { useEffect } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./Modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import { CLOSE_MODAL } from "../../services/actions/modal";

function Modal({ children }) {
  const modalRoot = document.getElementById("modal-root");
  const dispatch = useDispatch();

  const modal = (
    <ModalOverlay handleClickOverlay={handleClickOverlay}>
      <div className={styles.modal__container}>
        <span
          className={`${styles["close-icon"]} mt-15 mr-10`}
          onClick={() => {
            dispatch({ type: CLOSE_MODAL });
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
    Object.is(event.target, event.currentTarget);
    dispatch({ type: CLOSE_MODAL });
  }

  function closeEsc(event) {
    if (Object.is("Escape", event.key)) {
      dispatch({ type: CLOSE_MODAL });
    }
  }

  return createPortal(modal, modalRoot);
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;
