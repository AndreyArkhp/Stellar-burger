import {baseUrl} from "../../utils/constants";
import {checkResponse} from "../../utils/functions";
import { TAppDispatch } from "../types/types";
import { IIngredientsList } from "../../types";

export const GET_INGREDIENTS_REQUEST:"GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";

interface IGetIngredientRequest {
  type: typeof GET_INGREDIENTS_REQUEST;
}

interface IGetIngredientSuccess {
  type: typeof GET_INGREDIENTS_SUCCESS;
  ingredients: IIngredientsList;
}

interface IGetIngredientFailed {
  type: typeof GET_INGREDIENTS_FAILED;
}

export type TIngredientsActions = IGetIngredientRequest|IGetIngredientSuccess|IGetIngredientFailed;

export const getIngridients = () => async (dispatch:TAppDispatch) => {
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
