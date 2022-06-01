import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {findIngredientsById, getOrderDate, getPrice} from "../../utils/functions";
import styles from "./Order.module.css";

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

export default function Order() {
  const params = useParams();
  // const {modalOpen} = useSelector((store) => store.modal);
  const {orders} = useSelector((store) => store.orders);
  const {ingredientsList} = useSelector((store) => store.ingredients);
  const {number, name, ingredients, createdAt} = orders.find((el) => el._id === params.id);
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
      };
    } else {
      ingredientsMap[id].curent++;
    }
  });

  return (
    <div className={styles.order}>
      <p className="text text_type_digits-default mt-5 mb-10">{`#${number}`}</p>
      <h2 className="text text_type_main-medium mb-3">{name}</h2>
      <p className="text text_type_main-default mb-15">Выполнен</p>
      <h2 className="text text_type_main-medium mb-6">Состав:</h2>
      <ul className={`${styles.order__list} mb-10 pr-6`}>
        {Object.values(ingredientsMap).map((el) => {
          return <OrderListItem order={el} />;
        })}
      </ul>
      <div className={styles.order__footer}>
        <time className="text text_type_main-default text_color_inactive" dateTime={`${createdAt}`}>
          {getOrderDate(createdAt)}
        </time>
        <p className={`text text_type_digits-default ${styles.order__price}`}>
          {getPrice(ingredientsOrder)} <CurrencyIcon />
        </p>
      </div>
    </div>
  );
}
