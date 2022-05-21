import {checkResponse} from "../../utils/functions";

export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const OPEN_INGREDIENT_MODAL = "OPEN_INGREDIENT_MODAL";
export const CLOSE_INGREDIENT_MODAL = "CLOSE_INGREDIENT_MODAL";

export const getOrder = (baseUrl, ingredientsOder) => async (dispatch) => {
  dispatch({type: GET_ORDER_REQUEST});
  try {
    const res = await fetch(`${baseUrl}orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ingredients: ingredientsOder,
      }),
    });
    const data = await checkResponse(res);
    dispatch({type: GET_ORDER_SUCCESS, data: data});
  } catch (error) {
    console.log(error);
    dispatch({type: GET_ORDER_FAILED});
  }
};
