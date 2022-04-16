import { baseUrl } from "../../utils/constants";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngridients = () => async (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  try {
    const res = await fetch(`${baseUrl}ingredients`);
    if (res.ok) {
      const ingredients = await res.json();
      console.log(ingredients);
      dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients });
    } else {
      const error = await res.json();
      throw new Error(error);
    }
  } catch (error) {
    dispatch({ type: GET_INGREDIENTS_FAILED });
  }
};
