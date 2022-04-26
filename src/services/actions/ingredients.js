import { baseUrl } from "../../utils/constants";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export const getIngridients = () => async (dispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  try {
    const res = await fetch(`${baseUrl}ingredients`, {
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      const ingredients = await res.json();
      const initialBun = ingredients.data.find((bun) => bun.type === "bun");
      dispatch({ type: GET_INGREDIENTS_SUCCESS, ingredients, initialBun });
    } else {
      const error = await res.json();
      dispatch({ type: GET_INGREDIENTS_FAILED });
      throw new Error(error);
    }
  } catch (error) {
    console.log(`Ошибка: ${error}`);
  }
};
