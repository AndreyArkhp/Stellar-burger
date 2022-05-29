import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import styles from "./Order.module.css";

function OrderListItem() {
  return (
    <>
      <li className={`${styles.order__listItem} mb-4`}>
        <img src="" alt="" />
        <p>Флюоресцентная булка R2-D3</p>
        <p>
          2 x 20 <CurrencyIcon />
        </p>
      </li>
    </>
  );
}

export default function Order() {
  const params = useParams();
  // const {ingredientsList} = useSelector((store) => store.ingredients);

  return (
    <div className={styles.order__container}>
      <p className="text text_type_digits-default mb-10">#034533</p>
      <h2 className="text text_type_main-medium mb-3">Black Hole Singularity острый бургер</h2>
      <p className="text text_type_main-default mb-15">Выполнен</p>
      <h2 className="text text_type_main-medium mb-6">Состав:</h2>
      <ul className={styles.order__list}>
        <OrderListItem />
      </ul>
    </div>
  );
}
