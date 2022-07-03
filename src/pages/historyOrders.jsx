import {useEffect} from "react";
import {useDispatch, useSelector} from "../services/types/types";
import {OrderCard} from "../components/OrderCard/OrderCard";
import {findIngredientsById, getToken} from "../utils/functions";
import {wsConnectFinish, wsConnectStart} from "../services/actions/wsOrders";
import {wsUrl} from "../utils/constants";

import styles from "./historyOrders.module.css";

export default function HistoryOrdersPage() {
  const {orders, wsConnection, success} = useSelector((store) => store.orders);
  const {ingredientsList} = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();
  let orderStatus = wsConnection && success ? "Заказы не найдены" : "Загрузка...";

  useEffect(() => {
    !wsConnection && dispatch(wsConnectStart(`${wsUrl}?token=${getToken()}`));
    return () => {
      wsConnection && dispatch(wsConnectFinish());
    };
  }, [wsConnection, dispatch]);
  return orders?.length && ingredientsList?.length ? (
    <section className={`${styles.section} pr-2`}>
      {orders.map((order) => {
        const ingredients = findIngredientsById(ingredientsList, order.ingredients);
        return <OrderCard order={order} ingredients={ingredients} status={true} key={order._id} />;
      })}
    </section>
  ) : (
    <h2 className="text text_type_main-large mt-10 ml-10">{orderStatus}</h2>
  );
}
