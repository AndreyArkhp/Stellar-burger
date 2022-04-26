import { ADD_INGREDIENT, DELETE_INGREDIENT } from "../actions/constructor";

const initialState = {
  ingredientsCount: {},
  bunCount: "",
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
      const key = action.ingredient;
      return action.bun
        ? {
            ...state,
            bunCount: action.ingredient,
          }
        : state.ingredientsCount[key]
        ? {
            ...state,
            ingredientsCount: {
              ...state.ingredientsCount,
              [key]: (state.ingredientsCount[key] += 1),
            },
          }
        : {
            ...state,
            ingredientsCount: {
              ...state.ingredientsCount,
              [key]: 1,
            },
          };
    }
    case DELETE_INGREDIENT: {
      const key = action.ingredient.slice(0, -4);
      return {
        ...state,
        ingredientsCount: {
          ...state.ingredientsCount,
          [key]: (state.ingredientsCount[key] -= 1),
        },
      };
    }
    default:
      return state;
  }
};
