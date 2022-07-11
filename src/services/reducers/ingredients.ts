import { IIngredient } from "../../types";
import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  TIngredientsActions,
} from "../actions/ingredients";

interface IIngredientsState {
  isLoaded: boolean;
  error: boolean;
  ingredientsList: IIngredient[];
}

const initialState:IIngredientsState = {
  isLoaded: false,
  error: false,
  ingredientsList: [],
};

export const ingredientsReducer = (state = initialState, action:TIngredientsActions):IIngredientsState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST:
      return {
        ...state,
        isLoaded: false,
        error: false,
      };
    case GET_INGREDIENTS_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        ingredientsList: action.ingredients.data,
      };
    case GET_INGREDIENTS_FAILED:
      return {
        ...state,
        isLoaded: true,
        error: true,
      };
    default:
      return state;
  }
};
