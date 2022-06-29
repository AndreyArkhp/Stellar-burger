import styles from "./Feed.module.css";
import {OrderCard} from "../OrderCard/OrderCard";
import {useDispatch, useSelector} from "react-redux";
import {findIngredientsById} from "../../utils/functions";
import {useEffect} from "react";
import {wsConnectFinish, wsConnectStart} from "../../services/actions/wsOrders";
import {wsUrl} from "../../utils/constants";

export default function Feed() {
  const {orders} = useSelector((store) => store.orders);
  const {ingredientsList} = useSelector((store) => store.ingredients);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsConnectStart(`${wsUrl}/all`));
    return () => {
      dispatch(wsConnectFinish());
    };
  }, [dispatch]);

  return orders.length && ingredientsList.length ? (
    <section className={`${styles.feed} pl-5`}>
      {orders.map((order) => {
        const ingredients = findIngredientsById(ingredientsList, order.ingredients);
        return <OrderCard order={order} ingredients={ingredients} status={false} key={order._id} />;
      })}
    </section>
  ) : (
    <h2 className="text text_type_main-large mt-10 ml-10">Загрузка...</h2>
  );
}
