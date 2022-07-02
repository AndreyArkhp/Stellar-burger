import { IUser } from "../../types";

import {
  REGISTRATION_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
  LOGIN_FAILED,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  GET_USER_INFO_FAILED,
  GET_USER_INFO_REQUEST,
  GET_USER_INFO_SUCCESS,
  LOGOUT_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SET_USER_INFO_FAILED,
  SET_USER_INFO_REQUEST,
  SET_USER_INFO_SUCCESS,
  TAuthorizationActions,
} from "../actions/authorization";

interface IAuthorizationState {
  registrationRequest: boolean;
  loginUserRequest: boolean;
  getUserInfoRequest: boolean;
  setUserInfoRequest: boolean;
  logoutRequest: boolean;
  registrationError: boolean;
  loginUserError: boolean;
  getUserInfoError: boolean;
  setUserInfoError: boolean;
  logoutError: boolean;
  isAuth: boolean;
  user: IUser;
}

const initialState:IAuthorizationState = {
  registrationRequest: false,
  loginUserRequest: false,
  getUserInfoRequest: false,
  setUserInfoRequest: false,
  logoutRequest: false,
  registrationError: false,
  loginUserError: false,
  getUserInfoError: false,
  setUserInfoError: false,
  logoutError: false,
  isAuth: false,
  user: {
    name: "",
    email: "",
  },
};

export const registrationReducer = (state = initialState, action:TAuthorizationActions) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return {...state, registrationRequest: true};
    case REGISTRATION_FAILED:
      return {...state, registrationRequest: false, registrationError: true};
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationRequest: false,
        registrationError: false,
        isAuth: true,
        user: {...state.user, name: action.user.name, email: action.user.email},
      };
    case LOGIN_FAILED:
      return {...state, loginUserRequest: false, loginUserError: true};
    case LOGIN_REQUEST:
      return {...state, loginUserRequest: true};
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginUserRequest: false,
        loginUserError: false,
        isAuth: true,
        user: {...state.user, name: action.user.name, email: action.user.email},
      };
    case GET_USER_INFO_FAILED:
      return {...state, getUserInfoRequest: false, getUserInfoError: true};
    case GET_USER_INFO_REQUEST:
      return {...state, getUserInfoRequest: true};
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        getUserInfoRequest: false,
        getUserInfoError: false,
        isAuth: true,
        user: {...state.user, name: action.user.name, email: action.user.email},
      };
    case LOGOUT_REQUEST:
      return {...state, logoutRequest: true};
    case LOGOUT_FAILED:
      return {...state, logoutError: true, logoutRequest: false};
    case LOGOUT_SUCCESS:
      return {
        ...state,
        logoutRequest: false,
        logoutError: false,
        isAuth: false,
        user: {
          ...state.user,
          name: "",
          email: "",
        },
      };

    case SET_USER_INFO_FAILED:
      return {...state, setUserInfoRequest: false, setUserInfoError: true};
    case SET_USER_INFO_REQUEST:
      return {...state, setUserInfoRequest: true};
    case SET_USER_INFO_SUCCESS:
      return {
        ...state,
        setUserInfoRequest: false,
        setUserInfoError: false,
        isAuth: true,
        user: {...state.user, name: action.user.name, email: action.user.email},
      };
    default:
      return state;
  }
};
