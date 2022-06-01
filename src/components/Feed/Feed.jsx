import styles from "./Feed.module.css";
import {OrderCard} from "../OrderCard/OrderCard";
import {useSelector} from "react-redux";

export default function Feed() {
  const {orders} = useSelector((store) => store.orders);
  return (
    <section className={`${styles.feed} pl-5`}>
      {orders.map((order) => {
        return <OrderCard order={order} status={false} key={order._id} />;
      })}
    </section>
  );
}
