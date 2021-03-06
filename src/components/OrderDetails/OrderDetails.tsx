
import { IOrderDetailsParams } from "../../types";
import styles from "./OrderDetails.module.css";
const img = String(new URL("../../images/done.png", import.meta.url));

export default function OrderDetails({ dataOrder, isLoaded }:IOrderDetailsParams) {  
  return (
    <div className={`${styles.container} mt-30 mr-25 mb-30 ml-25`}>
      <h2 className="text text_type_digits-large mb-8">{isLoaded && dataOrder.order.number}</h2>
      <p className="text text_type_main-medium mb-15">
        {(isLoaded && "идентификатор заказа") || "Загрузка заказа..."}
      </p>
      <p className={`${styles["image-container"]} mb-15`}>
        <img src={img} alt="Ждем данных" />
      </p>
      <p className="text text_type_main-default mb-2">
        {(isLoaded && "Ваш заказ начали готовить") || "Пожалуйста подождите"}
      </p>
      <p className="text text_type_main-default text_color_inactive">
        {isLoaded && "Дождитесь готовности на орбитальной станции"}
      </p>
    </div>
  );
}

