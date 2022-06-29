import { IIngredient } from "../../types";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const UPDATE_INGREDIENTS:"UPDATE_INGREDIENTS" = "UPDATE_INGREDIENTS";
export const DELETE_INGREDIENT:"DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const RESET_CONSTRUCTOR:"RESET_CONSTRUCTOR" = "RESET_CONSTRUCTOR";
export const RESET_CONSTRUCTOR_SUCCESS: "RESET_CONSTRUCTOR_SUCCESS" = "RESET_CONSTRUCTOR_SUCCESS";

interface IResetConstructor{
  readonly type: typeof RESET_CONSTRUCTOR;
}

interface IResetConstructorSuccess{
  readonly type: typeof RESET_CONSTRUCTOR_SUCCESS;
}

interface IUpdateIngredients{
  readonly type: typeof UPDATE_INGREDIENTS;
  readonly updateIngredients: IIngredient;
}

interface IAddIngredient{
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: IIngredient;
  readonly bun: boolean | null; 
}

interface IDeleteIngredient{
  readonly type: typeof DELETE_INGREDIENT;
  readonly uuid: string;
}

export type TConstructorActions = IResetConstructor | IResetConstructorSuccess | IUpdateIngredients | IAddIngredient | IDeleteIngredient;
  
export const resetConstructor = ():IResetConstructor => {
  return {type: RESET_CONSTRUCTOR};
};

export const resetConstructorSuccess = ():IResetConstructorSuccess => {
  return {type: RESET_CONSTRUCTOR_SUCCESS};
};

export const updateIngredients = (updateIngredients:IIngredient): IUpdateIngredients => {  
  return {type: UPDATE_INGREDIENTS, updateIngredients};
};

export const addIngredient = (ingredient:IIngredient, bun:boolean):IAddIngredient => ({
  type: ADD_INGREDIENT,
  ingredient,
  bun: bun || null,
});

export const deleteIngredient = (uuid:string):IDeleteIngredient => {
  return {type: DELETE_INGREDIENT, uuid};
};

