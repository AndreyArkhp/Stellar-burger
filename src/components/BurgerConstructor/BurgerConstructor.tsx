import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useDispatch, useSelector} from "../../services/types/hooks";
import {useDrag, useDrop} from "react-dnd";
import {useLocation, useNavigate} from "react-router-dom";
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {Button} from "@ya.praktikum/react-developer-burger-ui-components";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import styles from "./BurgerConstructor.module.css";
import {baseUrl} from "../../utils/constants";
import {getRandomId, openModal} from "../../utils/functions";
import {closeIngredientModal, getOrder, openIngredientModal} from "../../services/actions/modal";
import {
  resetConstructor,
  resetConstructorSuccess,
  updateIngredients,
  addIngredient,
  deleteIngredient,
} from "../../services/actions/constructor";
import { IIngredient } from "../../types";

interface IOrderParams {
  ingredientsPrice: number[];
  bunPrice: number;
  ingredientsOrder: string[];
}

function Order({ ingredientsPrice, bunPrice, ingredientsOrder }: IOrderParams) {
  const {modalOrderData, isLoadedd, modalOpen} = useSelector((store) => store.modal);
  const {isAuth} = useSelector((store) => store.dataUser);
  const [active, setActive] = useState(false);
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
      openModal(dispatch, openIngredientModal);
    } else {
      navigate("/login", {state: location.pathname});
    }
  };

  useEffect(() => {
    if (!active && modalOpen) {
      dispatch(resetConstructor());
      dispatch(closeIngredientModal());
    }
  }, [dispatch, active, modalOpen]);

  return (
    <div className={`${styles.oder} mt-10 mr-5`}>
      <span className="text text_type_digits-medium mr-10">
        {`${totalPrice} `}
        <CurrencyIcon type="primary"/>
      </span>
      <Button type="primary" size="large" onClick={handleOrder}>
        Оформить заказ
      </Button>
      {active && (
        <Modal setActive={setActive}>
          <OrderDetails dataOrder={modalOrderData} isLoadedd={isLoadedd} />
        </Modal>
      )}
    </div>
  );
}

interface ILockElementParam {
  position: "top" | "bottom";
  bun: IIngredient;
}

function LockElement({ position, bun }:ILockElementParam) {
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

interface IListIngredients {
  ingredient: IIngredient;
  onClick: (uuid: string) => void;
  sortIngredients: (topId:string, bottomId:string, topElementPart:number, offsetActualY:number, offsetFactor:number) => void;
}

function ListIngredients({ ingredient, onClick, sortIngredients }:IListIngredients) {
   let uuid = "";
  const ref = useRef<HTMLLIElement>(null);
  const [, dragRef] = useDrag({
    type: "constructorIngredient",
    item: {id: ingredient.uuid},
  });

  const [, dropRef] = useDrop({
    accept: "constructorIngredient",
    hover(item: { id: string }, monitor) {
      
      const offsetFactor = 5;
      const topBoundinClientRect = ref.current?.getBoundingClientRect();
      const clientOffsetY = monitor.getClientOffset()?.y;
      if (topBoundinClientRect && ingredient.uuid && clientOffsetY) {
        uuid = ingredient.uuid;
        const topElementPart = (topBoundinClientRect.bottom - topBoundinClientRect.top) / offsetFactor;
        
        const offsetActualY = clientOffsetY - topBoundinClientRect.top;
        sortIngredients(item.id, ingredient.uuid, topElementPart, offsetActualY, offsetFactor);
      }
    },
  });

   dragRef(dropRef(ref));

  return (
    <li className={`${styles["list-ingredients__item"]} mt-4 mb-4 `} ref={ref}>
      <div className={`${styles["list-ingredients__icon"]}`}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        isLocked={false}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => onClick(uuid)}
      />
    </li>
  );
}

interface IItemId {
  id: string;
}

function BurgerConstructor() {
  const {ingredientsList} = useSelector((store) => store.ingredients);
  const {reset, bun, constructorIngredients} = useSelector((store) => store.constructorIngredients);
  const dispatch = useDispatch();
  const ingredientsPrice:number[] = [];

  const titlePreview =
    (!bun &&
      constructorIngredients.length === 0 &&
      "Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа") ||
    (!bun && "Пожалуйста, перенесите сюда булку  для создания заказа");

  const setIngredientsOrder = (constructorIngredients: IIngredient[]) => {
    const bunId = bun ? bun._id : "";
    return [
      bunId,
      ...constructorIngredients.map((ingredient) => {
        return ingredient._id;
      }),

      bunId,
    ];
  };
  console.log(setIngredientsOrder(constructorIngredients));
  

  const sortIngredients = useCallback(
    (topId:string, bottomId:string, topElementPart:number, offsetActualY:number, offsetFactor:number) => {
      
      if (topId !== bottomId) {
        const topIndex = constructorIngredients.findIndex((el) => el.uuid === topId);
        const bottomIndex = constructorIngredients.findIndex((el) => el.uuid === bottomId);

        if (topIndex < bottomIndex && offsetActualY < topElementPart) return;
        if (topIndex > bottomIndex && offsetActualY > topElementPart * offsetFactor - 1) return;
        const changeOrderIngredients = (constructorIngredients:IIngredient[]) => {
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

  const onDropHandler = ({ id }: IItemId) => {
    
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

  const handleClickDelete = (uuid: string) => {
    dispatch(deleteIngredient(uuid));
  };

  const [, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item:IItemId) {
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
