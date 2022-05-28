import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useCallback, useMemo} from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import styles from "./OrderCard.module.css";
import {getRandomId} from "../../utils/functions";

export function OrderCard({order, status}) {
  const {ingredientsList} = useSelector((store) => store.ingredients);

  const ingredients = useMemo(() => {
    return order.ingredients
      .filter((el) => {
        return !Object.is(el, null);
      })
      .map((ingredient) => {
        return (ingredient = ingredientsList.find((el) => {
          return el._id === ingredient;
        }));
      });
  }, [order, ingredientsList]);

  const restIngredients = useMemo(() => {
    return order.ingredients.length > 6 ? `+${order.ingredients.length - 6}` : "";
  }, [order.ingredients.length]);

  const getPrice = useCallback(() => {
    return ingredients.reduce((total, ingredient) => {
      return total + ingredient.price;
    }, 0);
  }, [ingredients]);

  const orderDate = useMemo(() => {
    const time = new Date(order.createdAt);
    const timeNow = Date.now();
    const DAY = 86400000;
    const timeAgo = {
      today: "Сегодня",
      yesterday: "Вчера",
      fewDaysAgo: "дня назад",
    };
    const differTime = timeNow - time;
    const daysAgo =
      (differTime < DAY && timeAgo.today) ||
      (differTime < DAY * 2 && timeAgo.yesterday) ||
      `${Math.floor(differTime / DAY)} ${timeAgo.fewDaysAgo}`;
    const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
    const result = `${daysAgo}, ${time.getHours()}:${minutes} i-GMT+3`;
    return result;
  }, [order.createdAt]);

  return (
    <article className={`${styles.card} mb-4`}>
      <Link to={`${order._id}`} className={styles.card__link}>
        <div className={styles.card__header}>
          <p className="text text_type_digits-default">{`#${order.number}`}</p>
          <time
            dateTime="2022-05-27T08:48:06.083Z"
            className="text text_type_main-default text_color_inactive"
          >
            {orderDate}
          </time>
        </div>

        <div>
          <h1 className="text text_type_main-medium mb-2">{order.name}</h1>
          {status && <p className="text text_type_main-default">{order.status}</p>}
        </div>
        <div className={styles.card__content}>
          <div className={styles.card__imgContainer}>
            {ingredients.map((ingredient, index, arr) => {
              const left = index * 16;
              const zIndex = arr.length - index;
              const opacity = Object.is(index, 5) && arr.length > 6 ? 0.6 : 1;
              return (
                index < 6 && (
                  <img
                    src={ingredient.image}
                    alt={ingredient.name}
                    className={styles.card__img}
                    style={{left: `-${left}px`, zIndex: `${zIndex}`, opacity: `${opacity}`}}
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
            {getPrice()}
            {<CurrencyIcon type="primary" />}
          </p>
        </div>
      </Link>
    </article>
  );
}
