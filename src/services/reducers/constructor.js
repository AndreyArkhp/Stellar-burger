import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  RESET_CONSTRUCTOR,
  RESET_CONSTRUCTOR_SUCCESS,
} from "../actions/constructor";

const initialState = {
  ingredientsCount: {},
  bunCount: "",
  reset: false,
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
    case RESET_CONSTRUCTOR:
      return {
        ...state,
        ingredientsCount: {},
        bunCount: "",
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
