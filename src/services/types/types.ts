
import { TConstructorActions } from "../actions/constructor";
import { TAuthorizationActions } from "../actions/authorization";
import { TIngredientsActions } from "../actions/ingredients";
import { ThunkAction } from "redux-thunk";
import {Action,ActionCreator,Dispatch} from "redux"
import { TModalActions } from "../actions/modal";
import { TTabsActions } from "../actions/tabs";
import { TRootState } from "../reducers";

export type TApplicationActions = TConstructorActions | TAuthorizationActions | TIngredientsActions|TModalActions|TTabsActions;

export type TAppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>;

export type TAppDispatch = Dispatch<TApplicationActions>;