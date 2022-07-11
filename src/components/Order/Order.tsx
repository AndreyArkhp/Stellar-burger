import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDispatch, useSelector} from "../../services/types/hooks";
import {useMatch, useParams} from "react-router-dom";
import {ensure, findIngredientsById, getOrderDate, getPrice, getToken} from "../../utils/functions";
import styles from "./Order.module.css";
import {useEffect} from "react";
import {wsConnectFinish, wsConnectStart} from "../../services/actions/wsOrders";
import {wsUrl} from "../../utils/constants";
import {IOrderElement, IOrderMap, IStatusMap } from "../../types";

function OrderListItem({ order }: { order: IOrderElement }) {

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
          {`${order.curent} x ${order.price}`} <CurrencyIcon type="primary"/>
        </p>
      </li>
    </>
  );
}

export default function Order() {
  const matchOrders = useMatch(`/profile/*`);

  const {id} = useParams();
  const dispatch = useDispatch();
  const {modalOpen} = useSelector((store) => store.modal);
  const {orders, wsConnection} = useSelector((store) => store.orders);
  const {ingredientsList} = useSelector((store) => store.ingredients);
  const styleOrder = modalOpen ? styles.orderModal : styles.order;
  const styleNumberOrder = modalOpen ? null : styles.order__number;

  useEffect(() => {
    const url = matchOrders ? wsUrl : `${wsUrl}/all`;
    !wsConnection && dispatch(wsConnectStart(`${url}?token=${getToken()}`));
    return () => {
      dispatch(wsConnectFinish());
    };
  }, []);

  if (orders?.length && ingredientsList?.length) {
    const {number, name, ingredients, createdAt, status} = ensure(orders.find((el) => el._id === id));
    const ingredientsOrder = ensure(findIngredientsById(ingredientsList, ingredients));
    const ingredientsMap = {} as IOrderMap;

    ingredientsOrder.forEach((ingredient) => {
      const {_id: id, image, name, price} = ensure(ingredient);
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
    
    const statusMap:IStatusMap = {
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
            {getPrice(ingredientsOrder)} <CurrencyIcon type="primary"/>
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
