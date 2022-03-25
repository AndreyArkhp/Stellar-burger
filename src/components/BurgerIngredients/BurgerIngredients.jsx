import React from "react";
import PropTypes from 'prop-types';

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from "./BurgerIngredients.module.css";


function BurgerTab() {
  const [current, setCurrent] = React.useState("one");
  return (
    <div className={`${styles.tabs} mb-10`}>
      <Tab value="one" active={current === "one"} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === "two"} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === "three"} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}

function BurgerCard({ card }) {
  return (
    <li className={styles.ingredient}>
      <img src={card.image} className={`${styles.ingredient__image} ml-4 mr-4 mb-2`}></img>
      <p className={`${styles.ingredient__price} text text_type_digits-default mb-2`}>{card.price }<CurrencyIcon type="primary"/></p>
      <p className={`${styles.ingredient__title} text text_type_main-default mb-7`}>{card.name}</p>
     <Counter count={3} size="default"  className={ styles.ingredient__counter}/>
   </li>
  )
}

BurgerCard.propTypes = {
  card: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    proteins: PropTypes.number,
    fat: PropTypes.number,
    carbohydrates: PropTypes.number,
    calories: PropTypes.number,
    price: PropTypes.number,
    image: PropTypes.string,
    image_mobile: PropTypes.string,
    image_large: PropTypes.string,
    __v: PropTypes.number,
  })
}

function TypeIngredients({ data,ingredient }) {
       return (<article > 
          <h2 className="text text_type_main-medium">{Object.values(ingredient)[0]}</h2>
         <ul className={`${styles['list-ingredients']} mt-6 ml-4 mr-4 mb-9`}>
           {data.map((card) => {
         return card.type === Object.keys(ingredient)[0]&&
             <BurgerCard card={card} key={card._id} /> 
          })}
          </ul>
       </article>
       )
}
      
TypeIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  ingredient:PropTypes.objectOf(PropTypes.string)
}
      
    
  

function BurgerIngredients({ data }) {
  const ingredients = [{ bun: "Булки",id:1 }, { sauce: "Соусы",id:2 }, { main: "Начинки",id:3 }]
  return (
    <section className={`${styles.section} pl-5 `}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerTab />
      <div className={styles['all-ingredients']}>
      {
        ingredients.map((el) => {
          return <TypeIngredients data={data} ingredient={el} key={ el.id}/>
        })
    } </div>
      </section>
  );
}

BurgerIngredients.propTypes = {
  data:PropTypes.arrayOf(PropTypes.object)
}

export default BurgerIngredients;
