import PropTypes from "prop-types";
import { useMemo, useState } from "react";
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
import { useDrop } from "react-dnd";
import { ADD_INGREDIENT, DELETE_INGREDIENT } from "../../services/actions/constructor";

function Order({ ingredientsPrice, bunPrice, ingredientsOrder }) {
  const { modalData, isLoaded, error } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const totalPrice = useMemo(
    () =>
      ingredientsPrice.reduce((sum, price) => {
        return (sum += price);
      }, bunPrice * 2),
    [ingredientsPrice, bunPrice]
  );

  const handleOrder = () => dispatch(getOrder(baseUrl, ingredientsOrder));

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
  ingredientsOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
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
  bun: PropTypes.shape(ingredientsPropTypes),
};

function ListIngredients({ ingredient, onClick }) {
  return (
    <li className={`${styles["list-ingredients__item"]} mt-4 mb-4 `}>
      <div className={`${styles["list-ingridients__icon"]} ml-2`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={onClick}
      />
    </li>
  );
}

ListIngredients.propTypes = {
  ingredient: PropTypes.shape(ingredientsPropTypes).isRequired,
};

function BurgerConstructor() {
  const ingredientsList = useSelector((store) => store.ingredientsList.ingredients);
  const { constructorList } = useSelector((store) => store.constructorIngredients);
  const [bun, setBun] = useState(ingredientsList.find((bun) => bun.type === "bun"));
  const [ingredientsOrder, setIngredientsOrder] = useState([bun._id]);
  const dispatch = useDispatch();

  const ingredientsPrice = [];

  const onDropHandler = ({ id }) => {
    setIngredientsOrder([...ingredientsOrder, id]);
    ingredientsList.forEach((ingredient) => {
      ingredient._id === id &&
        (ingredient.type !== "bun"
          ? dispatch({ type: ADD_INGREDIENT, ingredient: ingredient })
          : setBun(ingredient));
    });
  };

  const handleClickDelete = () => dispatch({ type: DELETE_INGREDIENT });

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });

  return (
    <section className={`${styles.section} mt-25 pr-4 pl-4 `} ref={dropTarget}>
      <LockElement position={"top"} bun={bun} />
      <ul className={`${styles["list-ingredients"]} mt-4  pr-3`}>
        {constructorList.length &&
          constructorList.map((ingredient) => {
            ingredientsPrice.push(ingredient.price);
            return (
              <ListIngredients
                ingredient={ingredient}
                key={ingredient._id + Math.random() * 100}
                onClick={handleClickDelete}
              />
            );
          })}
      </ul>
      <LockElement position={"bottom"} bun={bun} />

      <Order
        ingredientsPrice={ingredientsPrice}
        bunPrice={bun.price}
        ingredientsOrder={ingredientsOrder}
      />
    </section>
  );
}

export default BurgerConstructor;
