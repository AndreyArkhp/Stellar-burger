import styles from "./ingredient.module.css";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";

export default function IngredientPage() {
  return (
    <main className={styles.ingredient}>
      <IngredientDetails />
    </main>
  );
}
