import { combineReducers } from "redux";
import { constructorReducer } from "./constructor";
import { ingredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";
import { tabsReduser } from "./tabs";

export const rootReducer = combineReducers({
  ingredientsList: ingredientsReducer,
  modal: modalReducer,
  tabs: tabsReduser,
  constructorIngredients: constructorReducer,
});
