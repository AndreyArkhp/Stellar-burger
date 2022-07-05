import {combineReducers} from "redux";
import {constructorReducer} from "./constructor";
import {ingredientsReducer} from "./ingredients";
import {modalReducer} from "./modal";
import {registrationReducer} from "./authorization";
import {tabsReduser} from "./tabs";
import {wsOrdersReduser} from "./wsOrders";

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  modal: modalReducer,
  tabs: tabsReduser,
  dataUser: registrationReducer,
  constructorIngredients: constructorReducer,
  orders: wsOrdersReduser,
});

export type TRootState = ReturnType<typeof rootReducer>;
