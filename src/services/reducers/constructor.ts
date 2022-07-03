import { IIngredient } from "../../types";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
  RESET_CONSTRUCTOR_SUCCESS,
  TConstructorActions,
  UPDATE_INGREDIENTS,
} from "../actions/constructor";

interface IConstructorState {
  bun: null|IIngredient;
  constructorIngredients: IIngredient[];
  reset: boolean;
}

const initialState:IConstructorState = {
  bun: null,
  constructorIngredients: [],
  reset: false,
};

export const constructorReducer = (state = initialState, action:TConstructorActions):IConstructorState => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return action.bun
        ? {
            ...state,
            bun: action.ingredient,
          }
        : {
            ...state,
            constructorIngredients: [...state.constructorIngredients, action.ingredient],
          };
    }
    case UPDATE_INGREDIENTS:
      return {
        ...state,
        constructorIngredients: [...action.updateIngredients],
      };
    case DELETE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.filter((el) => el.uuid !== action.uuid),
        ],
      };
    }
    case RESET_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [],
        bun: null,
        reset: true,
      };
    case RESET_CONSTRUCTOR_SUCCESS:
      return {
        ...state,
        reset: false,
      };
    default:
      return state;
  }
};
