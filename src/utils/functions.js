import {baseUrl} from "./constants";

/**
 * Проверка email
 * @param {string} value - Значение инпута email
 * @returns {boolean} - boolean
 */
export function checkEmail(value) {
  return value && /^\w+@[a-z]+\.[a-z]+$/.test(value) ? true : false;
}

/**
 * Функция получения токена
 * @returns - cookie с именем token
 */
export function getToken() {
  const cookies = document.cookie.split(";");
  const token = decodeURIComponent(cookies.find((cookie) => /(^|;) ?token=.+(;|$)/.test(cookie)));
  return token.split("=")[1];
}

/**
 * Установка куки
 * @param {string} token - токен
 * @param {string|number} age - срок действия в секундах
 */
export function setToken(token, age) {
  document.cookie = `token=${encodeURIComponent(token)}; max-age=${String(age || 0)}`;
}

export function removeToken(token) {
  document.cookie = `token=${encodeURIComponent(token)}; max-age=${String(-1)}`;
}

export async function refreshToken() {
  try {
    const res = await fetch(`${baseUrl}auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem("refreshToken"),
      }),
    });
    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("refreshToken", data.refreshToken);
      const authToken = data.accessToken.split("Bearer ")[1];
      setToken(authToken, 1200);
    } else {
      const error = await res.json();
      throw new Error(error.message);
    }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Функция проверяет наличие токена, если его нет то обновляет, затем делает запрос с существующим или обновленным токеном.
 * @param {string} url - Адресс запроса
 * @param {object} options - дополнительные параметры запроса
 * @returns Возвращает fetch с токеном или перенаправляет на /login
 */
export async function fetchWithAuth(url, options) {
  const loginUrl = "/login";
  let tokenData = null;
  const curentToken = getToken();

  if (curentToken) {
    tokenData = curentToken;
  }

  if (!options.headers) {
    options.headers = {};
  }

  if (!tokenData) {
    try {
      await refreshToken();
      tokenData = getToken();
    } catch (error) {
      return window.location.replace(loginUrl);
    }
  }

  if (tokenData) {
    options.headers.Authorization = `Bearer ${tokenData}`;

    return fetch(url, options);
  }
}

export function checkResponse(res) {
  if (res.ok) {
    const data = res.json();
    return data;
  } else {
    const error = res.json();
    throw new Error(error);
  }
}

export const getRandomId = (id) => {
  let randomNumb = Math.round(Math.random() * 10000);
  if (randomNumb < 1000) {
    randomNumb = (1000 - randomNumb) * 3 + randomNumb;
    return id + randomNumb;
  } else {
    return id + randomNumb;
  }
};

/**
 * Функция посчета стоимости ингридиетов
 * @param {Array} ingredients - массив ингридиентов
 * @returns - итоговая стоимось
 */
export const getPrice = (ingredients) =>
  ingredients.reduce((total, ingredient) => {
    return total + ingredient.price;
  }, 0);

export function openModal(dispatch, func) {
  dispatch(func());
}
