import PropTypes from "prop-types";
import { useState, useMemo, useContext } from "react";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../OrderDetails/OrderDetails";
import { DataBurgersContext } from "../../services/dataBurgersContext";

import styles from "./BurgerConstructor.module.css";
import { ingredientsPropTypes, baseUrl } from "../../utils/constants";

function Order({ ingredientsPrice, bunPrice, ingredientsOder }) {
  const [active, setActive] = useState(false);
  const [dataOrder, setDataOrder] = useState({});

  const totalPrice = useMemo(
    () =>
      ingredientsPrice.reduce((sum, price) => {
        return (sum += price);
      }, bunPrice * 2),
    [ingredientsPrice, bunPrice]
  );

  const handleOrder = async () => {
    try {
      const res = await fetch(`${baseUrl}orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients: ingredientsOder,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setDataOrder(data);
        setActive(true);
      } else {
        const error = await res.json();
        throw new Error(error);
      }
    } catch (error) {
      console.log(`Ошибка: ${error}`);
    }
  };

  return (
    <div className={`${styles.oder} mt-10 mr-5`}>
      <span className="text text_type_digits-medium mr-10">
        {`${totalPrice}`}
        <CurrencyIcon />
      </span>
      <Button
        type="primary"
        size="large"
        onClick={() => {
          handleOrder();
        }}
      >
        Оформить заказ
      </Button>
      <OrderDetails active={active} setActive={setActive} dataOrder={dataOrder} />
    </div>
  );
}

Order.propTypes = {
  ingredientsPrice: PropTypes.arrayOf(PropTypes.number).isRequired,
  bunPrice: PropTypes.number.isRequired,
  ingredientsOder: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function LockElement({ position, bun }) {
  const text = {
    top: "верх",
    bottom: "низ",
  };
  return (
    <div className={`${styles["lock-element"]} mr-2 ml-8 pr-3`}>
      <ConstructorElement
        type={position}
        isLocked={true}
        text={`${bun.name} (${text[position]})`}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );
}

LockElement.propTypes = {
  position: PropTypes.string.isRequired,
  bun: PropTypes.shape(ingredientsPropTypes).isRequired,
};

function ListIngredients({ ingredient }) {
  return (
    <li className={`${styles["list-ingredients__item"]} mb-4 `}>
      <div className={`${styles["list-ingridients__icon"]} ml-2`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </li>
  );
}

ListIngredients.propTypes = {
  ingredient: PropTypes.shape(ingredientsPropTypes).isRequired,
};

function BurgerConstructor() {
  const data = useContext(DataBurgersContext);
  const ingredients = data.filter((element) => {
    return element.type !== "bun";
  });

  const buns = data.filter((bun) => {
    return bun.type === "bun";
  });
  const ingredientsPrice = [];
  const ingredientsOder = [buns[0]._id];

  return (
    <section className={`${styles.section} mt-25 pr-4 pl-4 `}>
      <LockElement position={"top"} bun={buns[0]} />
      <ul className={`${styles["list-ingredients"]} mt-4  pr-3`}>
        {ingredients.map((ingredient) => {
          ingredientsPrice.push(ingredient.price);
          ingredientsOder.push(ingredient._id);
          return <ListIngredients ingredient={ingredient} key={ingredient._id} />;
        })}
      </ul>
      <LockElement position={"bottom"} bun={buns[0]} />
      <Order
        ingredientsPrice={ingredientsPrice}
        bunPrice={buns[0].price}
        ingredientsOder={ingredientsOder}
      />
    </section>
  );
}

export default BurgerConstructor;
