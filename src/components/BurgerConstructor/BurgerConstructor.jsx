import PropTypes from "prop-types";
import { useState, useMemo } from "react";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import OrderDetails from "../OrderDetails/OrderDetails";

import styles from "./BurgerConstructor.module.css";

function Oder({ ingredientsPrice, bunPrice }) {
  const totalPrice = useMemo(
    () =>
      ingredientsPrice.reduce((sum, price) => {
        return (sum += price);
      }, bunPrice * 2),
    [ingredientsPrice, bunPrice]
  );

  const [active, setActive] = useState(false);
  return (
    <div className={`${styles.oder} mt-10 mr-5`}>
      <span className="text text_type_digits-medium mr-10">
        {`${totalPrice}`}
        <CurrencyIcon />
      </span>
      <Button type="primary" size="large" onClick={() => setActive(true)}>
        Оформить заказ
      </Button>
      <OrderDetails active={active} setActive={setActive} />
    </div>
  );
}

Oder.propTypes = {
  ingredientsPrice: PropTypes.arrayOf(PropTypes.number),
  bunPrice: PropTypes.number,
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
  position: PropTypes.string,
  bun: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }),
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
  ingredient: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  }),
};

function BurgerConstructor({ data }) {
  const ingredients = data.filter((element) => {
    return element.type !== "bun";
  });

  const buns = data.filter((bun) => {
    return bun.type === "bun";
  });

  const ingredientsPrice = [];

  return (
    <section className={`${styles.section} mt-25 pr-4 pl-4 `}>
      <LockElement position={"top"} bun={buns[0]} />
      <ul className={`${styles["list-ingredients"]} mt-4  pr-3`}>
        {ingredients.map((ingredient) => {
          ingredientsPrice.push(ingredient.price);
          return <ListIngredients ingredient={ingredient} key={ingredient._id} />;
        })}
      </ul>
      <LockElement position={"bottom"} bun={buns[0]} />
      <Oder ingredientsPrice={ingredientsPrice} bunPrice={buns[0].price} />
    </section>
  );
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};

export default BurgerConstructor;
