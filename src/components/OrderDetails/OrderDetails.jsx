import PropTypes from "prop-types";

import Modal from "../Modal/Modal";

import styles from "./OrderDetails.module.css";
const img = new URL("../../images/done.png", import.meta.url);

function OrderDetails({ active, setActive, dataOrder }) {
  return (
    active && (
      <Modal active={active} setActive={setActive}>
        <div className={`${styles.container} mt-30 mr-25 mb-30 ml-25`}>
          <h2 className="text text_type_digits-large mb-8">{dataOrder.order.number}</h2>
          <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
          <p className={`${styles["image-container"]} mb-15`}>
            <img src={img} alt="Ждем данных" />
          </p>
          <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </Modal>
    )
  );
}

OrderDetails.propTypes = {
  active: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  dataOrder: PropTypes.shape({
    name: PropTypes.string,
    order: PropTypes.objectOf(PropTypes.number),
    success: PropTypes.bool,
  }).isRequired,
};

export default OrderDetails;
