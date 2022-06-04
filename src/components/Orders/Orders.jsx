import {useSelector} from "react-redux";
import styles from "./Orders.module.css";

function ListNumbers({orders, status}) {
  status = status.split(",");
  return orders.length ? (
    orders.map((order, index) => {
      const styleNumber = order.status === "done" ? styles.numberDone : styles.number;
      return (
        (Object.is(order.status, status[0]) || Object.is(order.status, status[1])) &&
        index < 20 && (
          <li className={`${styleNumber} text text_type_digits-default mb-2`} key={order._id}>
            {order.number}
          </li>
        )
      );
    })
  ) : (
    <h2 className="text text_type_main-medium">Загрузка...</h2>
  );
}

export default function Orders() {
  const {orders, total, totalToday} = useSelector((store) => store.orders);
  console.log(orders);
  return (
    <section className={styles.orders}>
      <div className={`${styles.orders__statusContainer} mb-15`}>
        <div className={styles.orders__status}>
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <ul className={styles.orders__statusList}>
            <ListNumbers orders={orders} status={"done"} />
          </ul>
        </div>
        <div className={styles.orders__status}>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <ul className={styles.orders__statusList}>
            <ListNumbers orders={orders} status={"created,pending"} />
          </ul>
        </div>
      </div>

      <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
      <p className={`${styles.orders__total} text text_type_digits-large mb-15`}>{total}</p>

      <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
      <p className={`${styles.orders__total} text text_type_digits-large`}>{totalToday}</p>
    </section>
  );
}
