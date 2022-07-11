import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useMemo} from "react";
import {useDispatch} from "react-redux";
import {Link, useLocation} from "react-router-dom";

import styles from "./OrderCard.module.css";
import {getRandomId, getPrice, openModal, getOrderDate} from "../../utils/functions";
import { openIngredientModal } from "../../services/actions/modal";
import { IOrderCardParam, IStatusMap } from "../../types";

export function OrderCard({ order, status, ingredients }:IOrderCardParam) {  
  const dispatch = useDispatch();
  const location = useLocation();

  const restIngredients = useMemo(() => {
    return order.ingredients.length > 6 ? `+${order.ingredients.length - 6}` : "";
  }, [order.ingredients.length]);

  const orderDate = getOrderDate(order.createdAt);
  const statusMap:IStatusMap = {
    done: "Выполнен",
    pending: "Готовится",
    created: "Создан",
  };

  const statusStyle = order.status === "done" && styles.card__status;

  return (
    <article
      className={`${styles.card} mb-4`}
      onClick={() => openModal(dispatch, openIngredientModal)}
    >
      <Link to={`${order._id}`} className={styles.card__link} state={{background: location}}>
        <div className={styles.card__header}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <time
            dateTime={`${order.createdAt}`}
            className="text text_type_main-default text_color_inactive"
          >
            {orderDate}
          </time>
        </div>

        <div>
          <h2 className="text text_type_main-medium mb-2">{order.name}</h2>
          {status && (
            <p className={`text text_type_main-default ${statusStyle}`}>
              {statusMap[order.status]}
            </p>
          )}
        </div>
        <div className={styles.card__content}>
          <div className={styles.card__imgContainer}>
            {ingredients.map((ingredient, index, arr) => {
              const left = index * 48;
              const zIndex = arr.length - index;
              const opacity = Object.is(index, 5) && arr.length > 6 ? 0.6 : 1;
              return (
                index < 6 && (
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className={styles.card__img}
                    style={{left: `${left}px`, zIndex: `${zIndex}`, opacity: `${opacity}`}}
                    key={getRandomId(ingredient._id)}
                  />
                )
              );
            })}
            <p className={`${styles.card__restIngedients} text text_type_main-default`}>
              {restIngredients}
            </p>
          </div>

          <p className={`${styles.card__price} text text_type_digits-default`}>
            {getPrice(ingredients)}
            {<CurrencyIcon type="primary" />}
          </p>
        </div>
      </Link>
    </article>
  );
}
