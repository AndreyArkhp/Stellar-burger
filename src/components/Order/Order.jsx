import propTypes from "prop-types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "react-redux";
import {useMatch, useParams} from "react-router-dom";
import {findIngredientsById, getOrderDate, getPrice, getToken} from "../../utils/functions";
import styles from "./Order.module.css";
import {useEffect} from "react";
import {wsConnectFinish, wsConnectStart} from "../../services/actions/wsOrders";
import {wsHistoryOrdersUrl, wsOrdersUrl} from "../../utils/constants";

function OrderListItem({order}) {
  return (
    <>
      <li className={`${styles.order__listItem} mb-4`}>
        <img
          src={`${order.image}`}
          alt={`${order.name}`}
          className={`${styles.order__image} mr-4`}
        />
        <p className="text text_type_main-default">{order.name}</p>
        <p className={`text text_type_digits-default ${styles.order__price}`}>
          {`${order.curent} x ${order.price}`} <CurrencyIcon />
        </p>
      </li>
    </>
  );
}

OrderListItem.propTypes = {
  order: propTypes.object.isRequired,
};

export default function Order() {
  const matchOrders = useMatch(`/profile/*`);

  console.log(matchOrders ? "profile" : "feed");
  const {id} = useParams();
  const dispatch = useDispatch();
  const {modalOpen} = useSelector((store) => store.modal);
  const {orders, wsConnection} = useSelector((store) => store.orders);
  const {ingredientsList} = useSelector((store) => store.ingredients);
  const styleOrder = modalOpen ? styles.orderModal : styles.order;
  const styleNumberOrder = modalOpen ? null : styles.order__number;

  useEffect(() => {
    const url = matchOrders ? wsHistoryOrdersUrl : wsOrdersUrl;
    console.log(url, orders);
    !wsConnection && dispatch(wsConnectStart(`${url}?token=${getToken()}`, "orders"));
    return () => {
      wsConnection && dispatch(wsConnectFinish());
    };
  }, []);

  if (orders?.length && ingredientsList?.length) {
    console.log(111);
    const {number, name, ingredients, createdAt, status} = orders.find((el) => el._id === id);
    const ingredientsOrder = findIngredientsById(ingredientsList, ingredients);
    const ingredientsMap = {};

    ingredientsOrder.forEach((ingredient) => {
      const {_id: id, image, name, price} = ingredient;
      if (!ingredientsMap[id]) {
        ingredientsMap[id] = {
          curent: 1,
          image,
          name,
          price,
          id,
        };
      } else {
        ingredientsMap[id].curent++;
      }
    });
    const statusMap = {
      done: "Выполнен",
      pending: "Готовится",
      created: "Создан",
    };
    const orderStatus = status === "done" ? styles.order__statusDone : null;

    return (
      <div className={styleOrder}>
        <p
          className={`${styleNumberOrder} text text_type_digits-default mt-5 mb-10`}
        >{`#${number}`}</p>
        <h2 className="text text_type_main-medium mb-3">{name}</h2>
        <p className={`${orderStatus} text text_type_main-default mb-15`}>{statusMap[status]}</p>
        <h2 className="text text_type_main-medium mb-6">Состав:</h2>
        <ul className={`${styles.order__list} mb-10 pr-6`}>
          {Object.values(ingredientsMap).map((el) => {
            return <OrderListItem order={el} key={el.id} />;
          })}
        </ul>
        <div className={styles.order__footer}>
          <time
            className="text text_type_main-default text_color_inactive"
            dateTime={`${createdAt}`}
          >
            {getOrderDate(createdAt)}
          </time>
          <p className={`text text_type_digits-default ${styles.order__price}`}>
            {getPrice(ingredientsOrder)} <CurrencyIcon />
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <h2 className={`${styles.order__loading} text text_type_main-large`}>
        Загрузка ингридиента ...
      </h2>
    );
  }
}
