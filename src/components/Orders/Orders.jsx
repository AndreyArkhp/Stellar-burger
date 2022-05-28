import styles from "./Orders.module.css";

function ListNumbers({orders, status}) {
  return orders.map((order, index) => {
    return (
      Object.is(order.status, status) &&
      index < 20 && (
        <li className={`${styles.number} text text_type_digits-default mb-2`} key={order._id}>
          {order.number}
        </li>
      )
    );
  });
}

export default function Orders({orders}) {
  return (
    <section className={styles.orders}>
      <div className={`${styles.orders__statusContainer} mb-15`}>
        <div className={styles.orders__status}>
          <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
          <ul className={styles.orders__statusList}>
            <ListNumbers orders={orders.orders} status={"done"} />
          </ul>
        </div>
        <div className={styles.orders__status}>
          <h2 className="text text_type_main-medium mb-6">В работе:</h2>
          <ul className={styles.orders__statusList}>
            <ListNumbers orders={orders.orders} status={"pending"} />
          </ul>
        </div>
      </div>

      <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
      <p className={`${styles.orders__total} text text_type_digits-large mb-15`}>{orders.total}</p>

      <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
      <p className={`${styles.orders__total} text text_type_digits-large`}>{orders.totalToday}</p>
    </section>
  );
}
