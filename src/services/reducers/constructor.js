import { ADD_INGREDIENT, DELETE_INGREDIENT } from "../actions/constructor";

const initialState = {
  constructorList: [],
};

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return { ...state, constructorList: [...state.constructorList, action.ingredient] };
    case DELETE_INGREDIENT:
      return {
        ...state,
        constructorList: state.constructorList.splice(0, state.constructorList.length - 1),
      };
    default:
      return state;
  }
};
