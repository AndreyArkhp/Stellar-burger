import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";
import { tabsReduser } from "./tabs";
import { constructorReducer } from "./constructor";

export const rootReducer = combineReducers({
  ingredientsList: ingredientsReducer,
  modal: modalReducer,
  tabs: tabsReduser,
  constructorIngredientsList: constructorReducer,
});
