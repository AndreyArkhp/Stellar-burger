import React  from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';



function BurgerTab() {
  const [current, setCurrent] = React.useState("one");
  return (
    <div style={{ display: "flex" }} className="mb-10">
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
    <li className={styles.card}>
      <img src={card.image} className={`${styles.card_image} ml-4 mr-4 mb-2`}></img>
      <p className={`${styles.card_price} text text_type_digits-default mb-2`}>{card.price }<CurrencyIcon type="primary"/></p>
      <p className={`${styles.card_title} text text_type_main-default mb-7`}>{card.name}</p>
     <Counter count={3} size="default"  className={ styles.card_counter}/>
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

function ListIngredients({ data,ingredient }) {
       return (<article > 
          <h2 className="text text_type_main-medium">{Object.values(ingredient)[0]}</h2>
         <ul className={`${styles.list_ingredients} mt-6 ml-4 mr-4 mb-9`}>
           {data.map((card) => {
         return card.type === Object.keys(ingredient)[0]&&
             <BurgerCard card={card} key={card._id} /> 
          })}
          </ul>
       </article>
       )
}
      
ListIngredients.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  ingredient:PropTypes.objectOf(PropTypes.string)
}
      
    
  

function BurgerIngredients({ data }) {
  const ingredients = [{ bun: "Булки" }, { sauce: "Соусы" }, { main: "Начинки" }]
  return (
    <section className={`${styles.content} pl-5 `}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerTab />
      <div className={styles.ingredients_container}>
      {
        ingredients.map((el,index) => {
          return <ListIngredients data={data} ingredient={el} key={ index}/>
        })
    } </div>
      </section>
  );
}

BurgerIngredients.propTypes = {
  data:PropTypes.arrayOf(PropTypes.object)
}

export default BurgerIngredients;
