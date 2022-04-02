import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

import { useState, useEffect } from "react";

import styles from "./App.module.css";
const ingredientsUrl = "https://norma.nomoreparties.space/api/ingredients ";

function App() {
  const [ingredients, setIngredients] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const res = await fetch(ingredientsUrl);
        if (res.ok) {
          const data = await res.json();
          setIsLoaded(true);
          setIngredients(data);
        } else {
          const error = await res.json();
          throw new Error(error);
        }
      } catch (error) {
        setIsLoaded(true);
        setError(error);
        console.log(`Ошибка: ${error}`);
      }
    };
    getIngredients();
  }, []);

  return (
    <>
      <ErrorBoundary>
        <AppHeader />
        {ingredients && (
          <main className={styles.main}>
            <BurgerIngredients data={ingredients.data} />
            <BurgerConstructor data={ingredients.data} />
          </main>
        )}
      </ErrorBoundary>
    </>
  );
}

export default App;
