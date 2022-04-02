import PropTypes from "prop-types";

import ModalOverlay from "../ModalOverlay/ModalOverlay";

import styles from "./OrderDetails.module.css";
const img = new URL("../../images/done.png", import.meta.url);

function OrderDetails({ active, setActive }) {
  return (
    active && (
      <ModalOverlay active={active} setActive={setActive}>
        <div className={`${styles.container} mt-30 mr-25 mb-30 ml-25`}>
          <h2 className="text text_type_digits-large mb-8">034536</h2>
          <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
          <p className={`${styles["image-container"]} mb-15`}>
            <img src={img} alt="Ждем данных" />
          </p>
          <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </ModalOverlay>
    )
  );
}

OrderDetails.propTypes = {
  active: PropTypes.bool,
  setActive: PropTypes.func,
};

export default OrderDetails;
