import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import styles from "./ingredient.module.css";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import {getIngridients} from "../services/actions/ingredients";

export default function IngredientPage() {
  const {ingredientId} = useParams();
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.ingredientsList);
  !ingredients.length && dispatch(getIngridients());

  const [ingredient] = ingredients.filter((el) => el._id === ingredientId);
  return (
    <main className={styles.ingredient}>
      {ingredient && <IngredientDetails card={ingredient} />}
    </main>
  );
}
