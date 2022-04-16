import { OPEN_MODAL_ORDER, OPEN_MODAL_INGREDIENT, CLOSE_MODAL } from "../actions/modal";

const initialState = {
  orderOpen: false,
  ingredientOpen: false,
  data: {},
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_ORDER:
      return {
        ...state,
        ingredientOpen: false,
        orderOpen: true,
        data: action.data,
      };
    case OPEN_MODAL_INGREDIENT:
      return {
        ...state,
        orderOpen: false,
        ingredientOpen: true,
        data: action.data,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        orderOpen: false,
        ingredientOpen: false,
        data: {},
      };
    default:
      return state;
  }
};
