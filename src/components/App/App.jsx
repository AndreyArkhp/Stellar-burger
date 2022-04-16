import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import styles from "./App.module.css";
import { getIngridients } from "../../services/actions/ingredients";

function App() {
  const dispatch = useDispatch();
  const isLoaded = useSelector((store) => {
    console.log(store);
    return store.ingredients.isLoaded;
  });

  useEffect(() => {
    dispatch(getIngridients());
  }, [dispatch]);

  return (
    <>
      <ErrorBoundary>
        <AppHeader />
        {isLoaded && (
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        )}
      </ErrorBoundary>
    </>
  );
}

export default App;
