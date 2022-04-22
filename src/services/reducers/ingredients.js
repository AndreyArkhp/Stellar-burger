import {
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
} from "../actions/ingredients";

const initialState = {
  isLoaded: false,
  error: false,
  ingredients: [],
  bunPreview: {},
};

export const ingredientsReducer = (state = initialState, action) => {
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
        ingredients: action.ingredients.data,
        bunPreview: action.ingredients.data.find((bun) => bun.type === "bun"),
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
