import {
  OPEN_MODAL_ORDER,
  OPEN_MODAL_INGREDIENT,
  CLOSE_MODAL,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
} from "../actions/modal";

const initialState = {
  isLoaded: false,
  error: false,
  ingredientOpen: false,
  modalData: {},
};

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_FAILED:
      return {
        ...state,
        error: true,
        isLoaded: true,
      };
    case GET_ORDER_REQUEST:
      return {
        ...state,
        error: false,
        isLoaded: false,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        modalData: action.data,
        isLoaded: true,
      };
    case OPEN_MODAL_INGREDIENT:
      return {
        ...state,
        ingredientOpen: true,
        modalData: action.data,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        orderOpen: false,
        ingredientOpen: false,
        isLoaded: false,
        modalData: {},
      };
    default:
      return state;
  }
};
