import styles from "./Feed.module.css";
import {OrderCard} from "../OrderCard/OrderCard";

export default function Feed({orders}) {
  return (
    <section className={`${styles.feed} pl-5`}>
      {orders.orders.map((order) => {
        return <OrderCard order={order} ststus={false} key={order._id} />;
      })}
    </section>
  );
}
