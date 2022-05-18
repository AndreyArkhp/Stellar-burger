import {
  REGISTRATION_FAILED,
  REGISTRATION_REQUEST,
  REGISTRATION_SUCCESS,
} from "../actions/authorization";

const initialState = {
  isLoaded: false,
  isError: false,
  isAuth: false,
  user: {
    name: "",
    email: "",
  },
};

export const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return {...state, isLoaded: true};
    case REGISTRATION_FAILED:
      return {...state, isLoaded: false, isError: true};
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        isLoaded: false,
        isError: false,
        isAuth: true,
        user: {...state.user, name: action.data.name, email: action.data.email},
      };
    default:
      return state;
  }
};
