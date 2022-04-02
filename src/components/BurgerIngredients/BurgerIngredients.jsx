import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import styles from "./BurgerIngredients.module.css";
import { ingredientsPropTypes } from "../../utils/constants";

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
  const [cardClicked, setCardClicked] = useState(null);
  const [active, setActive] = useState(false);

  function handleClick() {
    if (!active) {
      setCardClicked(card);
      setActive(true);
    }
  }

  return (
    <li className={styles.ingredient} onClick={handleClick}>
      <img src={card.image} className={" ml-4 mr-4 mb-2"}></img>
      <p className={`${styles.ingredient__price} text text_type_digits-default mb-2`}>
        {card.price}
        <CurrencyIcon type="primary" />
      </p>
      <p className={`${styles.ingredient__title} text text_type_main-default mb-7`}>{card.name}</p>
      <Counter count={3} size="default" className={styles.ingredient__counter} />
      <IngredientDetails card={cardClicked} active={active} setActive={setActive} />
    </li>
  );
}

BurgerCard.propTypes = {
  card: PropTypes.shape(ingredientsPropTypes).isRequired,
};

function TypeIngredients({ data, ingredient }) {
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
  data: PropTypes.arrayOf(PropTypes.shape(ingredientsPropTypes).isRequired).isRequired,
  ingredient: PropTypes.string.isRequired,
};

function BurgerIngredients({ data }) {
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
          return <TypeIngredients data={data} ingredient={el.type} key={el.id} />;
        })}{" "}
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientsPropTypes).isRequired).isRequired,
};

export default BurgerIngredients;
