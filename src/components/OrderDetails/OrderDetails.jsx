import PropTypes from "prop-types";

import styles from "./OrderDetails.module.css";
const img = new URL("../../images/done.png", import.meta.url);

function OrderDetails({dataOrder, isLoadedd}) {
  return (
    <div className={`${styles.container} mt-30 mr-25 mb-30 ml-25`}>
      <h2 className="text text_type_digits-large mb-8">{isLoadedd && dataOrder.order.number}</h2>
      <p className="text text_type_main-medium mb-15">
        {(isLoadedd && "идентификатор заказа") || "Загрузка заказа..."}
      </p>
      <p className={`${styles["image-container"]} mb-15`}>
        <img src={img} alt="Ждем данных" />
      </p>
      <p className="text text_type_main-default mb-2">
        {(isLoadedd && "Ваш заказ начали готовить") || "Пожалуйста подождите"}
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {isLoadedd && "Дождитесь готовности на орбитальной станции"}
      </p>
    </div>
  );
}

OrderDetails.propTypes = {
  dataOrder: PropTypes.shape({
    name: PropTypes.string,
    order: PropTypes.object,
    success: PropTypes.bool,
  }),
  isLoadedd: PropTypes.bool.isRequired,
};

export default OrderDetails;
