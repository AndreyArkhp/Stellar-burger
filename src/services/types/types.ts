import store from "../store";
import { TConstructorActions } from "../actions/constructor";
import { TAuthorizationActions } from "../actions/authorization";
import { ThunkAction } from "redux-thunk";
import {Action,ActionCreator,Dispatch} from "redux"

export type TRootState = ReturnType<typeof store.getState>;

type TApplicationActions = TConstructorActions|TAuthorizationActions;

export type TAppThunk<TReturn = void> = ActionCreator<ThunkAction<TReturn, Action, TRootState, TApplicationActions>>;

export type TAppDispatch = Dispatch<TApplicationActions>;