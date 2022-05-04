import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED } from "../actions/modal";

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
    default:
      return state;
  }
};
