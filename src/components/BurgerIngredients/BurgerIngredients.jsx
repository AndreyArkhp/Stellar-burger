import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ingredientsPropTypes } from "../../utils/constants";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { OPEN_MODAL_INGREDIENT } from "../../services/actions/modal";

import styles from "./BurgerIngredients.module.css";
import { SCROLL_INGREDIENTS, SWITCH_TAB } from "../../services/actions/tabs";
import { useDrag, useDrop } from "react-dnd";

function BurgerTab() {
  const BUNS = "bun";
  const SAUCES = "sauce";
  const FILLING = "main";

  const dispatch = useDispatch();
  const current = useSelector((store) => store.tabs.activeTab);
  const setActiveTab = (tab) => {
    dispatch({ type: SCROLL_INGREDIENTS, scroll: tab });
  };
  return (
    <div className={`${styles.tabs} mb-10`}>
      <Tab value={BUNS} active={current === BUNS} onClick={() => setActiveTab(BUNS)}>
        Булки
      </Tab>
      <Tab value={SAUCES} active={current === SAUCES} onClick={() => setActiveTab(SAUCES)}>
        Соусы
      </Tab>
      <Tab value={FILLING} active={current === FILLING} onClick={() => setActiveTab(FILLING)}>
        Начинки
      </Tab>
    </div>
  );
}

function BurgerCard({ card }) {
  const { ingredientOpen, modalData } = useSelector((store) => store.modal);
  const { initialBun } = useSelector((store) => store.ingredients);
  const counts = useSelector((store) => store.constructorIngredients);
  const initialBunCount = initialBun._id === card._id && 1;
  let count;

  if (card.type === "bun") {
    count = counts.bunCount ? card._id === counts.bunCount && 1 : initialBunCount;
  } else {
    count = counts.ingredientsCount[card._id] ? counts.ingredientsCount[card._id] : 0;
  }
  const dispatch = useDispatch();

  const [{ ingredientAdded, typeee }, cardRef] = useDrag(
    {
      type: "ingredient",
      item: { id: card._id },
      collect: (monitor) => ({
        ingredientAdded: monitor.didDrop(),
        typeee: monitor.getItem(),
      }),
    },
    [card]
  );

  function handleClick() {
    if (!ingredientOpen) {
      dispatch({ type: OPEN_MODAL_INGREDIENT, data: card });
    }
  }
  return (
    <li className={styles.ingredient} onClick={handleClick} ref={cardRef}>
      <img src={card.image} className={" ml-4 mr-4 mb-2"} alt={card.name}></img>
      <p className={`${styles.ingredient__price} text text_type_digits-default mb-2`}>
        {card.price}
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${styles.ingredient__title} text text_type_main-default mb-7`}>{card.name}</p>
      <Counter count={count || 0} size="default" className={styles.ingredient__counter} />
      {ingredientOpen && (
        <Modal>
          <IngredientDetails card={modalData} />
        </Modal>
      )}
    </li>
  );
}

BurgerCard.propTypes = {
  card: PropTypes.shape(ingredientsPropTypes).isRequired,
};

function TypeIngredients({ ingredient }) {
  const { ingredientsList } = useSelector((store) => store.ingredients);
  const translation = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  return (
    <article>
      <h2 className="text text_type_main-medium tab-header" id={ingredient}>
        {translation[ingredient]}
      </h2>
      <ul className={`${styles["list-ingredients"]} mt-6 ml-4 mr-4 mb-9`}>
        {ingredientsList.map((card) => {
          return card.type === ingredient && <BurgerCard card={card} key={card._id} />;
        })}
      </ul>
    </article>
  );
}

TypeIngredients.propTypes = {
  ingredient: PropTypes.string.isRequired,
};

function BurgerIngredients() {
  const ingredients = [
    { type: "bun", id: 1 },
    { type: "sauce", id: 2 },
    { type: "main", id: 3 },
  ];
  const scrollTo = useSelector((store) => store.tabs.scroll);
  const dispatch = useDispatch();
  const tabsContainerRef = useRef();

  const getActiveTab = (headers) => {
    const containerOffset = tabsContainerRef.current.offsetTop;
    const offsetFormula = (el) =>
      Math.abs(Math.round(el.getBoundingClientRect().y)) - containerOffset;
    const tabs = [];
    for (let key in headers) {
      tabs.push({
        value: offsetFormula(headers[key]),
        tab: headers[key].id,
      });
    }
    if (tabs.length > 0) {
      return tabs.reduce((res, el) => {
        return res.value < el.value ? res : el;
      }).tab;
    }
  };

  useEffect(() => {
    const headers = {};
    const [buns, sauces, filling] = Array.from(
      tabsContainerRef.current.querySelectorAll(".tab-header")
    );
    headers.bun = buns;
    headers.sauce = sauces;
    headers.main = filling;

    scrollTo && headers[scrollTo].scrollIntoView();

    let currentTab = getActiveTab(headers);

    tabsContainerRef.current.addEventListener("scroll", () => {
      const activeTab = getActiveTab(headers);
      if (!Object.is(currentTab, activeTab)) {
        dispatch({ type: SWITCH_TAB, activeTab: activeTab });
        currentTab = activeTab;
      }
    });
  }, [scrollTo, dispatch]);

  return (
    <section className={`${styles.section} pl-5 `}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerTab />
      <div ref={tabsContainerRef} className={styles["all-ingredients"]}>
        {ingredients.map((el) => {
          return <TypeIngredients ingredient={el.type} key={el.id} />;
        })}
      </div>
    </section>
  );
}

export default BurgerIngredients;
