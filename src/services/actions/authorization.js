import {baseUrl} from "../../utils/constants";

export const REGISTRATION_REQUEST = "REGISTRATION_REQUEST";
export const REGISTRATION_SUCCESS = "REGISTRATION_SUCCESS";
export const REGISTRATION_FAILED = "REGISTRATION_FAILED";

/**
 * Action запроса на сервер
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
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("refreshToken", data.refreshToken);
      const authToken = data.accessToken.split("Bearer ")[1];
      document.cookie = "token=" + encodeURIComponent(authToken);
      dispatch({type: REGISTRATION_SUCCESS, data: data.user});
    } else {
      const error = await res.json();
      dispatch({type: REGISTRATION_FAILED});
      throw new Error(error.message);
    }
  } catch (error) {
    console.log(`Ошибка: ${error}`);
    dispatch({type: REGISTRATION_FAILED});
  }
};
