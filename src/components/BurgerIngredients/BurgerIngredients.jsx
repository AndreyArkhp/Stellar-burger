import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {Counter } from '@ya.praktikum/react-developer-burger-ui-components';

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

function Card({ data }) {
  return (
   <li className={styles.card}>
          <a href="#"><img src={data.image} className={styles.card_image}></img></a>
          <p className={styles.card_price}><CurrencyIcon type="primary" />{data.price}</p>
      <p className={styles.card_title}>{data.name}</p>
     <Counter count={10} size="default"  className={ styles.card_counter}/>
   </li>
    
  )
}

function BurgerIngredients({data}) {
  return (
    <section className={`${styles.content} pl-5 pr-5`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <BurgerTab />
      <article> 
      <h2 className="text text_type_main-medium">Булки</h2>
      <ul className={styles.list_ingredients}>
        {data.map((el) => {
         return el.type === "bun"&&
             <Card data={el} key={el._id} />
          
          })}
       </ul>
    </article>
    <article>
        <h2 className="text text_type_main-medium">Соусы</h2>
      <ul className={styles.list_ingredients}>
        {data.map((el) => {
         return el.type === "sauce"&&
             <Card data={el} key={el._id} />
          
          })}
       </ul>
      </article>
      <article>
        <h2 className="text text_type_main-medium">Начинки</h2>
      <ul className={styles.list_ingredients}>
        {data.map((el) => {
         return el.type === "main"&&
             <Card data={el} key={el._id} />
          
          })}
       </ul>
      </article>
      </section>
  );
}

export default BurgerIngredients;
