import { FC, MouseEvent} from "react";

import styles from "./ModalOverlay.module.css";

const ModalOverlay:FC<{handleClickOverlay:(event:MouseEvent)=>void}> = ({ children, handleClickOverlay })=> {
  return (
    <div className={styles["modal"]} onClick={handleClickOverlay}>
      {children}
    </div>
  );
}

export default ModalOverlay;
