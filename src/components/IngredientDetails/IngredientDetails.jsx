import styles from "./IngredientDetails.module.css";
import {useParams} from "react-router-dom";
import {useSelector} from "../../services/types/types";

function IngredientDetails() {
  const param = useParams();
  const {ingredientsList} = useSelector((store) => store.ingredients);

  const card = ingredientsList.find((el) => Object.is(el._id, param.ingredientId));
  const title = card ? "Детали ингредиента" : "Загрузка ингридиента...";

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-large mt-10 mr-10 ml-10 pt-3 pb-3`}>
        {title}
      </h2>
      {card && (
        <div className={`${styles.content} ml-25 mr-25 mb-15`}>
          <img src={card.image_large} alt={card.name} className={`${styles.image} mb-4`} />
          <p className="text text_type_main-medium mb-8 pl-3 pr-3">{card.name}</p>
          <ul className={styles["list-ingredients"]}>
            <li className={`${styles["list-item"]} text_color_inactive`}>
              <p className="text text_type_main-default mb-2">Калории,ккал</p>
              <p className="text text_type_digits-default">{card.calories}</p>
            </li>
            <li className={`${styles["list-item"]} text_color_inactive`}>
              <p className="text text_type_main-default mb-2">Белки, г</p>
              <p className="text text_type_digits-default">{card.proteins}</p>
            </li>
            <li className={`${styles["list-item"]} text_color_inactive`}>
              <p className="text text_type_main-default mb-2">Жиры, г</p>
              <p className="text text_type_digits-default"> {card.fat}</p>
            </li>
            <li className={`${styles["list-item"]} text_color_inactive`}>
              <p className="text text_type_main-default mb-2">Углеводы, г</p>
              <p className="text text_type_digits-default">{card.carbohydrates}</p>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default IngredientDetails;
