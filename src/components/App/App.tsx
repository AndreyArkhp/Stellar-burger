import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients"
import { data } from "../../utils/data"


function App() {
  return (
    <>
      <AppHeader />
      <h1 className="text text_type_main-large">Соберите бургер</h1>
      <BurgerIngredients data={ data  }/>
    </>
  )
}

export default App;