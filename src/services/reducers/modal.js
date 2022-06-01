import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL,
} from "../actions/modal";

const initialState = {
  isLoaded: false,
  error: false,
  modalOpen: false,
  modalOrderData: {},
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
        modalOrderData: action.data,
        isLoaded: true,
      };
    case OPEN_INGREDIENT_MODAL:
      return {
        ...state,
        modalOpen: true,
      };
    case CLOSE_INGREDIENT_MODAL:
      return {
        ...state,
        modalOpen: false,
      };
    default:
      return state;
  }
};
