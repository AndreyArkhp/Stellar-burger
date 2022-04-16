import { combineReducers } from "redux";
import { ingredientsReducer } from "./ingredients";
import { modalReducer } from "./modal";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
});
