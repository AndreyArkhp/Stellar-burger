import PropTypes from "prop-types";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import styles from "./BurgerConstructor.module.css";
import { ingredientsPropTypes, baseUrl } from "../../utils/constants";
import { getOrder } from "../../services/actions/modal";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
  RESET_CONSTRUCTOR_SUCCESS,
} from "../../services/actions/constructor";

function Order({ ingredientsPrice, bunPrice, ingredientsOrder }) {
  const { modalData, isLoaded } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);

  const totalPrice = useMemo(
    () =>
      ingredientsPrice.reduce((sum, price) => {
        return (sum += price);
      }, bunPrice * 2),
    [ingredientsPrice, bunPrice]
  );

  const handleOrder = () => {
    setActive(true);
    dispatch(getOrder(baseUrl, ingredientsOrder));
  };

  const clearConstructor = () => dispatch({ type: RESET_CONSTRUCTOR });

  return (
    <div className={`${styles.oder} mt-10 mr-5`}>
      <span className="text text_type_digits-medium mr-10">
        {`${totalPrice}`}
        <CurrencyIcon />
      </span>
      <Button type="primary" size="large" onClick={handleOrder}>
        Оформить заказ
      </Button>
      {active && (
        <Modal active={active} setActive={setActive} clearConstructor={clearConstructor}>
          <OrderDetails dataOrder={modalData} isLoaded={isLoaded} />
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
    item: { id: ingredient.uuid },
  });

  const [, dropRef] = useDrop({
    accept: "constructorIngredient",
    hover(item, monitor) {
      const offsetFactor = 5;
      const topBoundinClientRect = ref.current.getBoundingClientRect();
      const topElementPart =
        (topBoundinClientRect.bottom - topBoundinClientRect.top) / offsetFactor;
      const offsetActualY = monitor.getClientOffset().y - topBoundinClientRect.top;
      sortIngredients(item.id, ingredient.uuid, topElementPart, offsetActualY, offsetFactor);
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
        handleClose={() => onClick(ingredient.uuid)}
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
  const { ingredientsList } = useSelector((store) => store.ingredients);
  const { reset } = useSelector((store) => store.constructorIngredients);
  const [constructorIngredients, setConstructorIngredients] = useState([]);
  const [bun, setBun] = useState(null);
  const [ingredientsOrder, setIngredientsOrder] = useState(null);
  const dispatch = useDispatch();
  const ingredientsPrice = [];
  const addIngredientAction = (id, bun) => ({
    type: ADD_INGREDIENT,
    ingredient: id,
    bun: bun || null,
  });
  const titlePreview =
    (!bun &&
      !ingredientsOrder &&
      "Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа") ||
    (!bun && "Пожалуйста, перенесите сюда булку  для создания заказа");
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
        const topIndex = constructorIngredients.findIndex((el) => el.uuid === topId);
        const bottomIndex = constructorIngredients.findIndex((el) => el.uuid === bottomId);

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
    ingredientsOrder ? setIngredientsOrder([...ingredientsOrder, id]) : setIngredientsOrder([id]);
    ingredientsList.forEach((ingredient) => {
      if (ingredient._id === id) {
        if (ingredient.type !== "bun") {
          setConstructorIngredients([
            ...constructorIngredients,
            { ...ingredient, uuid: getRandomId(ingredient._id) },
          ]);
          dispatch(addIngredientAction(id));
        } else {
          setBun(ingredient);
          dispatch(addIngredientAction(id, true));
        }
      }
    });
  };

  const handleClickDelete = (id) => {
    console.log(constructorIngredients, id);
    setConstructorIngredients(constructorIngredients.filter((el) => el.uuid !== id));
    dispatch({ type: DELETE_INGREDIENT, ingredient: id });
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });

  useEffect(() => {
    setConstructorIngredients([]);
    setIngredientsOrder(null);
    setBun(null);
    dispatch({ type: RESET_CONSTRUCTOR_SUCCESS });
  }, [reset, dispatch]);

  return (
    <section className={`${styles.section} mt-25 pr-4 pl-4 `} ref={dropTarget}>
      <h2 className="text text_type_main-medium mb-5">{titlePreview}</h2>
      {bun && <LockElement position={"top"} bun={bun} />}
      <ul className={`${styles["list-ingredients"]} mt-4  pr-3`}>
        {constructorIngredients.length > 0 &&
          constructorIngredients.map((ingredient) => {
            ingredientsPrice.push(ingredient.price);
            return (
              <ListIngredients
                ingredient={ingredient}
                key={ingredient.uuid}
                onClick={handleClickDelete}
                sortIngredients={sortIngredients}
              />
            );
          })}
      </ul>
      {bun && (
        <>
          <LockElement position={"bottom"} bun={bun} />
          <Order
            ingredientsPrice={ingredientsPrice}
            bunPrice={bun.price}
            ingredientsOrder={ingredientsOrder}
          />
        </>
      )}
    </section>
  );
}

export default BurgerConstructor;
