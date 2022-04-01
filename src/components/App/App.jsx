import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

import { useState, useEffect } from "react";

import styles from "./App.module.css";

const INGRIDIENTS = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [ingridients, setIngridients] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getIngridients = async () => {
      try {
        const res = await fetch(INGRIDIENTS);
        if (res.ok) {
          const data = await res.json();
          setIsLoaded(true);
          setIngridients(data);
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
    getIngridients();
  }, []);

  return (
    <>
      <AppHeader />
      {ingridients && (
        <main className={styles.main}>
          <BurgerIngredients data={ingridients.data} />
          <BurgerConstructor data={ingridients.data} />
        </main>
      )}
    </>
  );
}

export default App;
