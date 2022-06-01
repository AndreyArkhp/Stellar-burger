import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/wsOrders";

const initialState = {
  wsConection: false,
  wsError: false,
  orders: [],
};

export const wsOrdersReduser = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConection: true,
      };
    case WS_CONNECTION_CLOSE:
      return {
        ...state,
        wsConection: false,
        wsError: false,
        orders: [],
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsError: action.payload,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: JSON.parse(action.payload).orders,
      };
    default:
      return state;
  }
};
