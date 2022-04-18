import PropTypes from "prop-types";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import styles from "./BurgerConstructor.module.css";
import { ingredientsPropTypes, baseUrl } from "../../utils/constants";
import { getOrder } from "../../services/actions/modal";

function Order({ ingredientsPrice, bunPrice, ingredientsOder }) {
  const { modalData, isLoaded, error } = useSelector((store) => store.modal);
  const dispatch = useDispatch();

  const totalPrice = useMemo(
    () =>
      ingredientsPrice.reduce((sum, price) => {
        return (sum += price);
      }, bunPrice * 2),
    [ingredientsPrice, bunPrice]
  );

  const handleOrder = () => dispatch(getOrder(baseUrl, ingredientsOder));

  return (
    <div className={`${styles.oder} mt-10 mr-5`}>
      <span className="text text_type_digits-medium mr-10">
        {`${totalPrice}`}
        <CurrencyIcon />
      </span>
      <Button type="primary" size="large" onClick={handleOrder}>
        Оформить заказ
      </Button>
      {isLoaded && !error && (
        <Modal>
          <OrderDetails dataOrder={modalData} />
        </Modal>
      )}
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
  const data = useSelector((store) => store.ingredients.data);
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
