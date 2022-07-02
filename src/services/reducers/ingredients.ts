import { IIngredient } from "../../types";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  TIngredientsActions,
} from "../actions/ingredients";

interface IIngredientsState {
  isLoade: boolean;
  error: boolean;
  ingredientsList: ReadonlyArray<IIngredient>;
}

const initialState:IIngredientsState = {
  isLoade: false,
  error: false,
  ingredientsList: [],
};

export const ingredientsReducer = (state = initialState, action:TIngredientsActions) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoade: false,
        error: false,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        isLoade: true,
        ingredientsList: action.ingredients.data,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        isLoade: true,
        error: true,
      };
    default:
      return state;
  }
};
