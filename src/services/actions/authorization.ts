import {baseUrl} from "../../utils/constants";
import { fetchWithAuth, getToken, removeToken, setToken, checkResponse } from "../../utils/functions";
import { TAppDispatch } from "../types/types";

export const REGISTRATION_REQUEST:"REGISTRATION_REQUEST" = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS:"REGISTRATION_SUCCESS" = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED:"REGISTRATION_FAILED" = "REGISTRATION_FAILED";
export const GET_USER_INFO_REQUEST:"GET_USER_INFO_REQUEST" = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_FAILED:"GET_USER_INFO_FAILED" = "GET_USER_INFO_FAILED";
export const GET_USER_INFO_SUCCESS:"GET_USER_INFO_SUCCESS" = "GET_USER_INFO_SUCCESS";
export const SET_USER_INFO_REQUEST:"SET_USER_INFO_REQUEST" = "SET_USER_INFO_REQUEST";
export const SET_USER_INFO_FAILED:"SET_USER_INFO_FAILED" = "SET_USER_INFO_FAILED";
export const SET_USER_INFO_SUCCESS:"SET_USER_INFO_SUCCESS" = "SET_USER_INFO_SUCCESS";
export const LOGIN_REQUEST:"LOGIN_REQUEST" = "LOGIN_REQUEST";
export const LOGIN_SUCCESS:"LOGIN_SUCCESS" = "LOGIN_SUCCESS";
export const LOGIN_FAILED:"LOGIN_FAILED" = "LOGIN_FAILED";
export const LOGOUT_REQUEST:"LOGOUT_REQUEST" = "LOGOUT_REQUEST";
export const LOGOUT_FAILED:"LOGOUT_FAILED" = "LOGOUT_FAILED";
export const LOGOUT_SUCCESS: "LOGOUT_SUCCESS" = "LOGOUT_SUCCESS";

interface IUser {
 email: string;
    name: string;
}

interface IDataResponse {
  success: string;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

interface IRegistrationRequest {
  type: typeof REGISTRATION_REQUEST;
} 

interface IRegistrationSuccess {
  type: typeof REGISTRATION_SUCCESS;
  user: IUser;
}

interface IRegistrationFailed {
  type: typeof REGISTRATION_FAILED;
}

interface IGetUserInfoRequest {
  type: typeof GET_USER_INFO_REQUEST;
}

interface IGetUserInfoSuccess {
  type: typeof GET_USER_INFO_SUCCESS;
  user: IUser;
}

interface IGetUserInfoFiled {
  type: typeof GET_USER_INFO_FAILED;
}

interface ISetUserInfoRequest {
  type: typeof SET_USER_INFO_REQUEST;
}

interface ISetUserInfoSuccess {
  type: typeof SET_USER_INFO_SUCCESS;
  user: IUser;
}

interface ISetUserInfoFiled {
  type: typeof SET_USER_INFO_FAILED;
}

interface ILoginRequest {
  type: typeof LOGIN_REQUEST;
}

interface ILoginSuccess {
  type: typeof LOGIN_SUCCESS;
  user: IUser;
}

interface ILoginFailed {
  type: typeof LOGIN_FAILED;
}

interface ILogoutRequest {
  type: typeof LOGOUT_REQUEST;
}

interface ILogoutSuccess {
  type: typeof LOGOUT_SUCCESS;
}

interface ILogoutFailed {
  type: typeof LOGOUT_FAILED;
}

const registrationRequest = ():IRegistrationRequest => {
  return {type: REGISTRATION_REQUEST}
}

const registrationSuccess = (data:IDataResponse): IRegistrationSuccess => {
  return {type: REGISTRATION_SUCCESS, user: data.user}
}

const registrationFailed = (): IRegistrationFailed => {
  return {type: REGISTRATION_FAILED}
}

const getUserInfoRequest = (): IGetUserInfoRequest => {
  return {type: GET_USER_INFO_REQUEST}
}

const getUserInfoSuccess = (data:IDataResponse): IGetUserInfoSuccess => {
  return {type: GET_USER_INFO_SUCCESS, user: data.user}
}

const getUserInfoFiled = (): IGetUserInfoFiled => {
  return {type: GET_USER_INFO_FAILED}
}

const setUserInfoRequest = (): ISetUserInfoRequest => {
  return {type: SET_USER_INFO_REQUEST}
}

const setUserInfoSuccess = (data: IDataResponse):ISetUserInfoSuccess => {
  return {type: SET_USER_INFO_SUCCESS, user: data.user}
}

const setUserInfoFiled = (): ISetUserInfoFiled => {
  return {type: SET_USER_INFO_FAILED}
}

const loginRequest = (): ILoginRequest => {
  return {type: LOGIN_REQUEST}
}

const loginSuccess = (data: IDataResponse): ILoginSuccess => {
  return {type: LOGIN_SUCCESS, user: data.user}
}

const loginFailed = (): ILoginFailed => {
  return {type: LOGIN_FAILED}
}

const logoutRequest = (): ILogoutRequest => {
  return {type: LOGOUT_REQUEST}
}

const logoutSuccess = (): ILogoutSuccess => {
  return {type: LOGOUT_SUCCESS}
}

const logoutFiled = (): ILogoutFailed => {
  return {type: LOGOUT_FAILED}
}

export type TAuthorizationActions = IRegistrationRequest|IRegistrationSuccess|IRegistrationFailed|IGetUserInfoRequest|IGetUserInfoSuccess|IGetUserInfoFiled|ISetUserInfoRequest|ISetUserInfoSuccess|ISetUserInfoFiled|ILoginRequest|ILoginSuccess|ILoginFailed|ILogoutRequest|ILogoutSuccess|ILogoutFailed;

/**
 * Action запроса на сервер для регистрации
 * @param {string} name - значение инпута имя
 * @param {string} email - значение инпута емайл
 * @param {string} password - значение инпута пароль
 *
 */
export const registration = (name:string, email:string, password:string) => async (dispatch:TAppDispatch) => {
  dispatch(registrationRequest());
  try {
    const res = await fetch(`${baseUrl}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await checkResponse(res);
    localStorage.setItem("refreshToken", data.refreshToken);
    const authToken = data.accessToken.split("Bearer ")[1];
    setToken(authToken, 1200);
    dispatch(registrationSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(registrationFailed());
  }
};

/**
 * Функция получения данных о пользователе
 */
export const getUserInfo = () => async (dispatch:TAppDispatch) => {
  dispatch(getUserInfoRequest());
  try {
    const res = await fetchWithAuth(`${baseUrl}auth/user`, {
      method: "GET",
      headers: {"Content-Type": "application/json; charset=utf-8"},
    });
    const data = await checkResponse(res);
    dispatch(getUserInfoSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(getUserInfoFiled());
  }
};

export const setUserInfo = (name:string, email:string, password:string) => async (dispatch:TAppDispatch) => {
  dispatch(setUserInfoRequest());
  try {
    const res = await fetchWithAuth(`${baseUrl}auth/user`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json; charset=utf-8"},
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await checkResponse(res);
    dispatch(setUserInfoSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(setUserInfoFiled());
  }
};

export const login = (email:string, password:string) => async (dispatch:TAppDispatch) => {
  dispatch(loginRequest());
  try {
    const res = await fetch(`${baseUrl}auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorisation: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await checkResponse(res);
    localStorage.setItem("refreshToken", data.refreshToken);
    const authToken = data.accessToken.split("Bearer ")[1];
    setToken(authToken, 1200);
    dispatch(loginSuccess(data));
  } catch (error) {
    console.log(error);
    dispatch(loginFailed());
  }
};

export const logout = () => async (dispatch:TAppDispatch) => {
  dispatch(logoutRequest());
  try {
    const res = await fetch(`${baseUrl}auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
    await checkResponse(res);
    dispatch(logoutSuccess());
    localStorage.removeItem("refreshToken");
    removeToken(getToken());
  } catch (error) {
    console.log(error);
    dispatch(logoutFiled());
  }
};
