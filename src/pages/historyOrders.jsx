import {useEffect, useMemo} from "react";
import {useSelector} from "react-redux";
import {OrderCard} from "../components/OrderCard/OrderCard";
import {findIngredientsById} from "../utils/functions";

export default function HistoryOrdersPage() {
  const {orders} = useSelector((store) => store.orders);
  const {ingredientsList} = useSelector((store) => store.ingredients);
  let orderStatus = "Загрузка...";

  return orders.length && ingredientsList.length ? (
    <section>
      {orders.map((order) => {
        const ingredients = findIngredientsById(ingredientsList, order.ingredients);
        return <OrderCard order={order} ingredients={ingredients} status={true} key={order._id} />;
      })}
    </section>
  ) : (
    <h2 className="text text_type_main-large mt-10 ml-10">{orderStatus}</h2>
  );
}
