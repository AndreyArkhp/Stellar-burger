import {useDispatch, useSelector} from "react-redux";

import styles from "./ingredient.module.css";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";
import {getIngridients} from "../services/actions/ingredients";

export default function IngredientPage() {
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.ingredients.ingredientsList);
  !ingredients.length && dispatch(getIngridients());

  return (
    <main className={styles.ingredient}>
      <IngredientDetails />
    </main>
  );
}
