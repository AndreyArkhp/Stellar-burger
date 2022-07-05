import { IOrderResponse } from "../../types";
import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL,
  TModalActions,
} from "../actions/modal";

interface IModalState {
  isLoadedd: boolean;
  error: boolean;
  modalOpen: boolean;
  modalOrderData: IOrderResponse|object;
}

const initialState:IModalState = {
  isLoadedd: false,
  error: false,
  modalOpen: false,
  modalOrderData: {},
};

export const modalReducer = (state = initialState, action:TModalActions):IModalState => {
  switch (action.type) {
    case GET_ORDER_FAILED:
      return {
        ...state,
        error: true,
        isLoadedd: true,
      };
    case GET_ORDER_REQUEST:
      return {
        ...state,
        error: false,
        isLoadedd: false,
      };
    case GET_ORDER_SUCCESS:
      return {
        ...state,
        modalOrderData: action.data,
        isLoadedd: true,
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
