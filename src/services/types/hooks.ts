import { TypedUseSelectorHook, useSelector as selectorHook, useDispatch as dispatchHook } from "react-redux";
import { TAppDispatch, TAppThunk } from "./types";
import { TRootState } from "../reducers";

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
export const useDispatch = () => dispatchHook<TAppDispatch | TAppThunk>();