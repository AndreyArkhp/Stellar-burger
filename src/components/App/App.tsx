import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import { data } from "../../utils/data"
import styles from "./App.module.css"


function App() {
  return (
    <>
      <AppHeader />
      <div className={styles.container}>
        <BurgerIngredients data={data} />
      </div>
    </>
  )
}

export default App;