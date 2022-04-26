import PropTypes from "prop-types";
import { useCallback, useMemo, useRef, useState } from "react";
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
import { useDrag, useDrop } from "react-dnd";
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

function ListIngredients({ ingredient, onClick, sortIngredients }) {
  const ref = useRef();
  const [, dragRef] = useDrag({
    type: "constructorIngredient",
    item: { id: ingredient._id },
  });

  const [, dropRef] = useDrop({
    accept: "constructorIngredient",
    hover(item, monitor) {
      const offsetFactor = 5;
      const topBoundinClientRect = ref.current.getBoundingClientRect();
      const topElementPart =
        (topBoundinClientRect.bottom - topBoundinClientRect.top) / offsetFactor;
      const offsetActualY = monitor.getClientOffset().y - topBoundinClientRect.top;
      sortIngredients(item.id, ingredient._id, topElementPart, offsetActualY, offsetFactor);
    },
  });

  const dragDropRef = dragRef(dropRef(ref));

  return (
    <li className={`${styles["list-ingredients__item"]} mt-4 mb-4 `} ref={dragDropRef}>
      <div className={`${styles["list-ingredients__icon"]}`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onClick(ingredient._id)}
      />
    </li>
  );
}

ListIngredients.propTypes = {
  ingredient: PropTypes.shape(ingredientsPropTypes).isRequired,
  onClick: PropTypes.func.isRequired,
  sortIngredients: PropTypes.func.isRequired,
};

function BurgerConstructor() {
  const { ingredientsList, initialBun } = useSelector((store) => store.ingredients);
  const [constructorIngredients, setConstructorIngredients] = useState([]);
  const [bun, setBun] = useState(initialBun);
  const [ingredientsOrder, setIngredientsOrder] = useState([bun._id]);
  const dispatch = useDispatch();
  const ingredientsPrice = [];
  const getRandomId = (id) => {
    let randomNumb = Math.round(Math.random() * 10000);
    if (randomNumb < 1000) {
      randomNumb = (1000 - randomNumb) * 3 + randomNumb;
      return id + randomNumb;
    } else {
      return id + randomNumb;
    }
  };

  const sortIngredients = useCallback(
    (topId, bottomId, topElementPart, offsetActualY, offsetFactor) => {
      if (topId !== bottomId) {
        const topIndex = constructorIngredients.findIndex((el) => el._id === topId);
        const bottomIndex = constructorIngredients.findIndex((el) => el._id === bottomId);

        if (topIndex < bottomIndex && offsetActualY < topElementPart) return;
        if (topIndex > bottomIndex && offsetActualY > topElementPart * offsetFactor - 1) return;
        setConstructorIngredients((ingredients) => {
          const updateIngridients = [...ingredients];
          [updateIngridients[topIndex], updateIngridients[bottomIndex]] = [
            updateIngridients[bottomIndex],
            updateIngridients[topIndex],
          ];
          return updateIngridients;
        });
      }
    },
    [constructorIngredients]
  );

  const onDropHandler = ({ id }) => {
    setIngredientsOrder([...ingredientsOrder, id]);
    ingredientsList.forEach((ingredient) => {
      if (ingredient._id === id) {
        if (ingredient.type !== "bun") {
          setConstructorIngredients([
            ...constructorIngredients,
            { ...ingredient, _id: getRandomId(ingredient._id) },
          ]);
          dispatch({ type: ADD_INGREDIENT, ingredient: id });
        } else {
          setBun(ingredient);
          dispatch({ type: ADD_INGREDIENT, ingredient: id, bun: true });
        }
      }
    });
  };

  const handleClickDelete = (id) => {
    setConstructorIngredients(constructorIngredients.filter((el) => el._id !== id));
    dispatch({ type: DELETE_INGREDIENT, ingredient: id });
  };

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
        {constructorIngredients.length > 0 &&
          constructorIngredients.map((ingredient) => {
            ingredientsPrice.push(ingredient.price);
            return (
              <ListIngredients
                ingredient={ingredient}
                key={ingredient._id}
                onClick={handleClickDelete}
                sortIngredients={sortIngredients}
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
