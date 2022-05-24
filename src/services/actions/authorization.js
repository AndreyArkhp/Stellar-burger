import {baseUrl} from "../../utils/constants";
import {fetchWithAuth, getToken, removeToken, setToken, checkResponse} from "../../utils/functions";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";
export const GET_USER_INFO_REQUEST = "GET_USER_INFO_REQUEST";
export const GET_USER_INFO_FAILED = "GET_USER_INFO_FAILED";
export const GET_USER_INFO_SUCCESS = "GET_USER_INFO_SUCCESS";
export const SET_USER_INFO_REQUEST = "SET_USER_INFO_REQUEST";
export const SET_USER_INFO_FAILED = "SET_USER_INFO_FAILED";
export const SET_USER_INFO_SUCCESS = "SET_USER_INFO_SUCCESS";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";

/**
 * Action запроса на сервер для регистрации
 * @param {string} name - значение инпута имя
 * @param {string} email - значение инпута емайл
 * @param {string} password - значение инпута пароль
 *
 */
export const registration = (name, email, password) => async (dispatch) => {
  dispatch({type: REGISTRATION_REQUEST});
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
    dispatch({type: REGISTRATION_SUCCESS, user: data.user});
  } catch (error) {
    console.log(error);
    dispatch({type: REGISTRATION_FAILED});
  }
};

/**
 * Функция получения данных о пользователе
 */
export const getUserInfo = () => async (dispatch) => {
  dispatch({type: GET_USER_INFO_REQUEST});
  try {
    const res = await fetchWithAuth(`${baseUrl}auth/user`, {
      method: "GET",
      headers: {"Content-Type": "application/json; charset=utf-8"},
    });
    const data = await checkResponse(res);
    dispatch({type: GET_USER_INFO_SUCCESS, user: data.user});
  } catch (error) {
    console.log(error);
    dispatch({type: GET_USER_INFO_FAILED, error: error.message});
  }
};

export const setUserInfo = (name, email, password) => async (dispatch) => {
  dispatch({type: SET_USER_INFO_REQUEST});
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
    dispatch({type: SET_USER_INFO_SUCCESS, user: data.user});
  } catch (error) {
    console.log(error);
    dispatch({type: SET_USER_INFO_FAILED, error: error.message});
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({type: LOGIN_REQUEST});
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
    dispatch({type: LOGIN_SUCCESS, user: data.user});
  } catch (error) {
    console.log(error);
    dispatch({type: LOGIN_FAILED, error: error.message});
  }
};

export const logout = () => async (dispatch) => {
  dispatch({type: LOGOUT_REQUEST});
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
    dispatch({type: LOGOUT_SUCCESS});
    localStorage.removeItem("refreshToken");
    removeToken(getToken());
  } catch (error) {
    console.log(error);
    dispatch({type: LOGOUT_FAILED});
  }
};
