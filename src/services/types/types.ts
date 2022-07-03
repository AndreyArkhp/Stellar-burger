import store from "../store";
import { TConstructorActions } from "../actions/constructor";
import { TAuthorizationActions } from "../actions/authorization";
import { TIngredientsActions } from "../actions/ingredients";
import { ThunkAction } from "redux-thunk";
import {Action,ActionCreator,Dispatch} from "redux"
import { TModalActions } from "../actions/modal";
import { TTabsActions } from "../actions/tabs";
import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook} from "react-redux";

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch = () => dispatchHook<TAppDispatch | TAppThunk>();

export type TRootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TConstructorActions | TAuthorizationActions | TIngredientsActions|TModalActions|TTabsActions;

export type TAppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>;

export type TAppDispatch = Dispatch<TApplicationActions>;