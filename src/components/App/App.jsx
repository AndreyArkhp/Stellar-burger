import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import styles from "./App.module.css";
import { getIngridients } from "../../services/actions/ingredients";

function App() {
  const dispatch = useDispatch();
  const { isLoaded } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  return (
    <>
      <ErrorBoundary>
        <AppHeader />
        {isLoaded && (
          <DndProvider backend={HTML5Backend}>
            <main className={styles.main}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          </DndProvider>
        )}
      </ErrorBoundary>
    </>
  );
}

export default App;
