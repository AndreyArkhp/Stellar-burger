import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

import styles from "./home.module.css";

import {getIngridients} from "../services/actions/ingredients";
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients";

export default function HomePage() {
  const dispatch = useDispatch();
  const {isLoade} = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

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
