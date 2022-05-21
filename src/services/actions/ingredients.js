import {baseUrl} from "../../utils/constants";
import {checkResponse} from "../../utils/functions";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngridients = () => async (dispatch) => {
  dispatch({type: GET_INGREDIENTS_REQUEST});
  try {
    const res = await fetch(`${baseUrl}ingredients`, {
      headers: {"Content-Type": "application/json"},
    });
    const ingredients = await checkResponse(res);
    dispatch({type: GET_INGREDIENTS_SUCCESS, ingredients});
  } catch (error) {
    console.log(error);
    dispatch({type: GET_INGREDIENTS_FAILED});
  }
};
