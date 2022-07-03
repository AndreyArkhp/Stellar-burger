import {useSelector} from "../services/types/types";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import styles from "./home.module.css";

import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";

export default function HomePage() {
  const {isLoade} = useSelector((store) => store.ingredients);

  return (
    isLoade && (
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    )
  );
}
