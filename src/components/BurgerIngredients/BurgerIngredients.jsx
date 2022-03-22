import React from "react";
import styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerTab() {
  const [current, setCurrent] = React.useState("one");
  return (
    <div style={{ display: "flex" }}>
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
<li >
        <article>
          <img src={data.image}></img>
          <p><CurrencyIcon type="primary" />{data.price}</p>
          <p>{data.name}</p>
        </article>
   </li>
    
  )
}

function BurgerIngredients({data}) {
  return (
    
    <section> 
      <BurgerTab />
      <h2>Булки</h2>
      <ul className={styles.ul_grid}>
        {data.map((el) => {
         return el.type === "bun"&&
             <Card data={el} key={el._id} />
          
          })}
       </ul>
    
    
        <h2>Соусы</h2>
      <ul>
        {data.map((el) => {
         return el.type === "sauce"&&
             <Card data={el} key={el._id} />
          
          })}
       </ul>
      
        <h2>Начинки</h2>
      <ul>
        {data.map((el) => {
         return el.type === "main"&&
             <Card data={el} key={el._id} />
          
          })}
       </ul>
      </section>
   
  );
}

export default BurgerIngredients;
