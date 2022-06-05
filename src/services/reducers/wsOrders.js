import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/wsOrders";

const initialState = {
  wsConnection: false,
  wsError: false,
  orders: [],
  total: 0,
  totalToday: 0,
  success: false,
};

export const wsOrdersReduser = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnection: true,
      };
    case WS_CONNECTION_CLOSE:
      return {
        ...state,
        wsConnection: false,
        wsError: false,
        orders: [],
        total: 0,
        totalToday: 0,
        success: false,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsError: action.payload,
      };
    case WS_GET_MESSAGE:
      const res = JSON.parse(action.payload);
      return {
        ...state,
        orders: res.orders,
        total: res.total,
        totalToday: res.totalToday,
        success: res.success,
      };
    default:
      return state;
  }
};
