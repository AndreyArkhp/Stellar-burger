import {useSelector} from "../../services/types/hooks";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import styles from "./home.module.css";

import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";

export default function HomePage() {
  const {isLoaded} = useSelector((store) => store.ingredients);

  const content = isLoaded ? (
    <main className={styles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  ) : (
    <main className={styles.wait}>
      <h2 className="text text_type_main-large">Загрузка...</h2>
    </main>
  );

  return <DndProvider backend={HTML5Backend}>{content}</DndProvider>;
}
