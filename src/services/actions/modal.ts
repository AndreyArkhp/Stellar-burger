import { IOrderResponse } from "../../types";
import {checkResponse, getToken} from "../../utils/functions";
import { TAppDispatch } from "../types/types";

export const GET_ORDER_SUCCESS:"GET_ORDER_SUCCESS" = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED:"GET_ORDER_FAILED" = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST:"GET_ORDER_REQUEST" = "GET_ORDER_REQUEST";
export const OPEN_INGREDIENT_MODAL:"OPEN_INGREDIENT_MODAL" = "OPEN_INGREDIENT_MODAL";
export const CLOSE_INGREDIENT_MODAL: "CLOSE_INGREDIENT_MODAL" = "CLOSE_INGREDIENT_MODAL";

interface IOpenIngredientModal {
  type: typeof OPEN_INGREDIENT_MODAL;
}

interface ICloseIngredientModal {
  type: typeof CLOSE_INGREDIENT_MODAL;
}

interface IGetOrderRequest {
  type: typeof GET_ORDER_REQUEST;
}

interface IGetOrderSuccess {
  type: typeof GET_ORDER_SUCCESS;
  data: any;
}

interface IGetOrderFailed {
  type: typeof GET_ORDER_FAILED;
}

export type TModalActions = IOpenIngredientModal|ICloseIngredientModal|IGetOrderRequest|IGetOrderSuccess|IGetOrderFailed ;

export const openIngredientModal = ():IOpenIngredientModal => {
  return {type: OPEN_INGREDIENT_MODAL};
};

export const closeIngredientModal = ():ICloseIngredientModal => {
  return {type: CLOSE_INGREDIENT_MODAL};
};

const getOrderRequest = ():IGetOrderRequest => {
  return {type: GET_ORDER_REQUEST}
}

const getOrderSuccess = (data:IOrderResponse): IGetOrderSuccess => {  
  return {type: GET_ORDER_SUCCESS, data: data}
}

const getOrderFailed = ():IGetOrderFailed => {
  return {type: GET_ORDER_FAILED}
}

export const getOrder = (baseUrl: string, ingredientsOder: string) => async (dispatch: TAppDispatch) => {
  dispatch(getOrderRequest());
  try {
    const res = await fetch(`${baseUrl}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        ingredients: ingredientsOder,
      }),
    });
    const data = await checkResponse(res);
    
    dispatch(getOrderSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getOrderFailed());
  }
};
