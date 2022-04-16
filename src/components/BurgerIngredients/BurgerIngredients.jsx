import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

import styles from "./BurgerIngredients.module.css";
import { ingredientsPropTypes } from "../../utils/constants";
import { useSelector } from "react-redux";

function BurgerTab() {
  const BUNS = "buns";
  const SAUCES = "sauces";
  const FILLING = "filling";
  const [current, setCurrent] = React.useState(BUNS);

  return (
    <div className={`${styles.tabs} mb-10`}>
      <Tab value={BUNS} active={current === BUNS} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value={SAUCES} active={current === SAUCES} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value={FILLING} active={current === FILLING} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

function BurgerCard({ card }) {
  const [active, setActive] = useState(false);

  function handleClick() {
    if (!active) {
      setActive(true);
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
      {active && (
        <Modal setActive={setActive}>
          <IngredientDetails card={card} />
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
      <h2 className="text text_type_main-medium">{translation[ingredient]}</h2>
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
  return (
    <section className={`${styles.section} pl-5 `}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerTab />
      <div className={styles["all-ingredients"]}>
        {ingredients.map((el) => {
          return <TypeIngredients ingredient={el.type} key={el.id} />;
        })}{" "}
      </div>
    </section>
  );
}

export default BurgerIngredients;
