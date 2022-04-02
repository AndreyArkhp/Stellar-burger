import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ModalOverlay.module.css";

function ModalOverlay({ children, active, setActive }) {
  const modalRoot = document.getElementById("modal-root");

  const modal = active && (
    <div className={styles["modal"]} onClick={handleClickOverlay}>
      <div className={styles.modal__container}>
        <span className={`${styles["close-icon"]} mt-15 mr-10`} onClick={() => setActive(false)}>
          <CloseIcon type="primary" />
        </span>
        {children}
      </div>
    </div>
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
      active && setActive(false);
    }
  }

  return createPortal(modal, modalRoot);
}

export default ModalOverlay;
