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

function BurgerTab() {
  const BUNS = "buns";
  const SAUCES = "sauces";
  const FILLING = "filling";

  const dispatch = useDispatch();
  const current = useSelector((store) => store.tabs.activeTab);
  const setActiveTab = (tab) => {
    dispatch({ type: SCROLL_INGREDIENTS, activeTab: tab });
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
  const dispatch = useDispatch();

  function handleClick() {
    if (!ingredientOpen) {
      dispatch({ type: OPEN_MODAL_INGREDIENT, data: card });
    }
  }
  return (
    <li className={styles.ingredient} onClick={handleClick}>
      <img src={card.image} className={" ml-4 mr-4 mb-2"} alt={card.name}></img>
      <p className={`${styles.ingredient__price} text text_type_digits-default mb-2`}>
        {card.price}
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${styles.ingredient__title} text text_type_main-default mb-7`}>{card.name}</p>
      <Counter count={3} size="default" className={styles.ingredient__counter} />
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
  const data = useSelector((store) => store.ingredients.data);
  const translation = {
    bun: "Булки",
    sauce: "Соусы",
    main: "Начинки",
  };

  return (
    <article>
      <h2 className="text text_type_main-medium tab-header">{translation[ingredient]}</h2>
      <ul className={`${styles["list-ingredients"]} mt-6 ml-4 mr-4 mb-9`}>
        {data.map((card) => {
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
  let currentTab = useSelector((store) => store.tabs.activeTab);
  const scroll = useSelector((store) => store.tabs.scroll);
  const dispatch = useDispatch();
  const tabsContainer = useRef();
  const headers = {};

  const getActiveTab = (event, headers) => {
    const containerOffset = event.target.offsetTop;
    const offsetFormula = (el) =>
      Math.abs(Math.round(el.getBoundingClientRect().y - containerOffset));
    const tabs = [];
    for (let key in headers) {
      tabs.push({ value: offsetFormula(headers[key]), tab: key });
    }
    return tabs.reduce((res, el) => {
      return res.value < el.value ? res : el;
    }).tab;
  };

  useEffect(() => {
    const [buns, sauces, filling] = Array.from(
      tabsContainer.current.querySelectorAll(".tab-header")
    );
    headers.buns = buns;
    headers.sauces = sauces;
    headers.filling = filling;

    function xxx(event) {
      const activeTab = getActiveTab(event, headers);
      
      if () {
        dispatch({ type: SWITCH_TAB, activeTab: activeTab });
      }
    }

    tabsContainer.current.addEventListener("scroll", xxx);
  }, [currentTab]);

  return (
    <section className={`${styles.section} pl-5 `}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerTab />
      <div ref={tabsContainer} className={styles["all-ingredients"]}>
        {ingredients.map((el) => {
          return <TypeIngredients ingredient={el.type} key={el.id} />;
        })}
      </div>
    </section>
  );
}

export default BurgerIngredients;
