import styles from "./Feed.module.css";
import {OrderCard} from "../OrderCard/OrderCard";

export default function Feed({orders}) {
  return (
    <section className={`${styles.feed} pl-5 pt-10`}>
      <h1 className="text text_type_main-large mb-5">Лента заказов</h1>
      {orders.map((order) => {
        return <OrderCard order={order} ststus={false} key={order._id} />;
      })}
    </section>
  );
}
