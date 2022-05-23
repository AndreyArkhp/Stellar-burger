export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const UPDATE_INGREDIENTS = "UPDATE_INGREDIENTS";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";
export const RESET_CONSTRUCTOR_SUCCESS = "RESET_CONSTRUCTOR_SUCCESS";

export const resetConstructor = () => {
  return {type: RESET_CONSTRUCTOR};
};

export const resetConstructorSuccess = () => {
  return {type: RESET_CONSTRUCTOR_SUCCESS};
};

export const updateIngredients = (updateIngredients) => {
  return {type: UPDATE_INGREDIENTS, updateIngredients};
};

export const addIngredient = (ingredient, bun) => ({
  type: ADD_INGREDIENT,
  ingredient,
  bun: bun || null,
});

export const deleteIngredient = (uuid) => {
  return {type: DELETE_INGREDIENT, uuid};
};
