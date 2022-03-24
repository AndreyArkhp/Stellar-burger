import styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function Oder({ sum }) {
  return (
    <div className={`${styles.oder} mt-10 mr-5`}>
      <span className="text text_type_digits-medium mr-10">{sum+" "}<CurrencyIcon/></span>
      <Button type="primary" size="large">
  Оформить заказ
</Button>
    </div>
  )
}

function LockElement({ position }) {
  const text = {
    top: "верх",
    bottom:"низ"
  }
  return <div className={`${styles.lockElement} mr-2 pr-3`}>
        <ConstructorElement
            type={position}
            isLocked={true}
            text={`Краторная булка N-200i (${text[position]})`}
            price={200}
          thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
          />
      </div>
}

function ListElement({card}) {
  return (
      card.type !=="bun" &&  <li className={`${styles.listElement} mb-4 `}>
           <DragIcon type="primary" />
               <ConstructorElement
                 isLocked={false}
                 text={card.name}
                 price={card.price}
                 thumbnail={card.image}
               />
         </li>
  )
}


function BurgerConstructor({ data }) {
  let sum = 0;
  return (
    <section className={`${styles.section} mt-25 pr-4 pl-4 `}>
      <LockElement position={"top"}/>
       <ul className={`${styles.list} mt-4  pr-3`}>
        {data.map((card, index) => {
          sum += card.price;
        return <ListElement card={card} key={index} />
    })}
      </ul>
      <LockElement position={"bottom"} />
      <Oder sum={sum}/>
    </section>
  );
}

export default BurgerConstructor;
