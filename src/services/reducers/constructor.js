import { ADD_INGREDIENT, DELETE_INGREDIENT } from "../actions/constructor";

const initialState = {
  ingredients: [],
  bun: null,
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      if (action.ingredients.type !== "bun") {
        return {
          ...state,
          ingredients: [...state.ingredients, action.ingredients],
        };
      } else {
        return {
          ...state,
          bun: action.ingredients,
        };
      }
    default:
      return state;
  }
};
