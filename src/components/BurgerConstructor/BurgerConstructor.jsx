import PropTypes from "prop-types";
import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {useLocation, useNavigate} from "react-router-dom";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import styles from "./BurgerConstructor.module.css";
import {ingredientsPropTypes, baseUrl} from "../../utils/constants";
import {getRandomId} from "../../utils/functions";
import {getOrder} from "../../services/actions/modal";
import {
  resetConstructor,
  resetConstructorSuccess,
  updateIngredients,
  addIngredient,
  deleteIngredient,
} from "../../services/actions/constructor";

function Order({ingredientsPrice, bunPrice, ingredientsOrder}) {
  const {modalOrderData, isLoaded} = useSelector((store) => store.modal);
  const {isAuth} = useSelector((store) => store.dataUser);
  const [active, setActive] = useState(false);
  const [isOrder, setIsOrder] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const totalPrice = useMemo(
    () =>
      ingredientsPrice.reduce((sum, price) => {
        return (sum += price);
      }, bunPrice * 2),
    [ingredientsPrice, bunPrice]
  );

  const handleOrder = () => {
    if (isAuth) {
      setActive(true);
      dispatch(getOrder(baseUrl, ingredientsOrder));
    } else {
      navigate("/login", {state: location.pathname});
    }
  };

  useEffect(() => {
    if (isLoaded && active) {
      setIsOrder(true);
    }
    if (isOrder && !active) {
      dispatch(resetConstructor());
      setIsOrder(false);
    }
  }, [dispatch, isLoaded, active, isOrder]);

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
        <Modal active={active} setActive={setActive}>
          <OrderDetails dataOrder={modalOrderData} isLoaded={isLoaded} />
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

function LockElement({position, bun}) {
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

function ListIngredients({ingredient, onClick, sortIngredients}) {
  const ref = useRef();
  const [, dragRef] = useDrag({
    type: "constructorIngredient",
    item: {id: ingredient.uuid},
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
  const {ingredientsList} = useSelector((store) => store.ingredients);
  const {reset, bun, constructorIngredients} = useSelector((store) => store.constructorIngredients);
  const dispatch = useDispatch();
  const ingredientsPrice = [];

  const titlePreview =
    (!bun &&
      constructorIngredients.length === 0 &&
      "Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа") ||
    (!bun && "Пожалуйста, перенесите сюда булку  для создания заказа");

  const setIngredientsOrder = (constructorIngredients) => {
    return [
      bun._id,
      ...constructorIngredients.map((ingredient) => {
        return ingredient._id;
      }),

      bun._id,
    ];
  };

  const sortIngredients = useCallback(
    (topId, bottomId, topElementPart, offsetActualY, offsetFactor) => {
      if (topId !== bottomId) {
        const topIndex = constructorIngredients.findIndex((el) => el.uuid === topId);
        const bottomIndex = constructorIngredients.findIndex((el) => el.uuid === bottomId);

        if (topIndex < bottomIndex && offsetActualY < topElementPart) return;
        if (topIndex > bottomIndex && offsetActualY > topElementPart * offsetFactor - 1) return;
        const changeOrderIngredients = (constructorIngredients) => {
          const updateIngridients = [...constructorIngredients];
          [updateIngridients[topIndex], updateIngridients[bottomIndex]] = [
            updateIngridients[bottomIndex],
            updateIngridients[topIndex],
          ];
          return updateIngridients;
        };
        dispatch(updateIngredients(changeOrderIngredients(constructorIngredients)));
      }
    },
    [constructorIngredients, dispatch]
  );

  const onDropHandler = ({id}) => {
    ingredientsList.forEach((ingredient) => {
      if (ingredient._id === id) {
        if (ingredient.type !== "bun") {
          dispatch(addIngredient({...ingredient, uuid: getRandomId(ingredient._id)}));
        } else {
          dispatch(addIngredient(ingredient, true));
        }
      }
    });
  };

  const handleClickDelete = (uuid) => {
    dispatch(deleteIngredient(uuid));
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      onDropHandler(item);
    },
  });

  useEffect(() => {
    dispatch(resetConstructorSuccess());
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
            ingredientsOrder={setIngredientsOrder(constructorIngredients)}
          />
        </>
      )}
    </section>
  );
}

export default BurgerConstructor;
