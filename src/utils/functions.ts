import { TAppDispatch, TApplicationActions, TAppThunk } from "../services/types/types";
import { IIngredient, MyRequestInit } from "../types";
import {baseUrl} from "./constants";

/**
 * Проверка email
 * @param {string} value - Значение инпута email
 * @returns {boolean} - boolean
 */
export function checkEmail(value:string):boolean {
  return value && /^\w+@[a-z]+\.[a-z]+$/.test(value) ? true : false;
}

/**
 * Функция получения токена
 * @returns - cookie с именем token или ошибка в консоли
 */
export function getToken() {
  const cookies = document.cookie.split(";");
  const encodedURI = cookies.find((cookie) => /(^|;) ?token=.+(;|$)/.test(cookie))
  
  if (typeof encodedURI === "string") {
    const token = decodeURIComponent(encodedURI);
    return token.split("=")[1];
  } else {
    console.log("Ошибка получения токена, обновите страницу");
  }
}

/**
 * Установка куки
 * @param {string} token - токен
 * @param {string|number} age - срок действия в секундах
 */
export function setToken(token:string, age:string|number):void {
  document.cookie = `token=${encodeURIComponent(token)}; max-age=${String(age || 0)}`;
}

export function removeToken(token:string):void {
  document.cookie = `token=${encodeURIComponent(token)}; max-age=${String(-1)}`;
}

export async function refreshToken():Promise<void> {
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
export async function fetchWithAuth(url:string, options:MyRequestInit) {
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

export function checkResponse(res:Response) { 
  if (res.ok) {
    const data = res.json();
    return data;
  } else {
    const error = res.json();
    throw new Error(`Ошибка: ${error}`);
  }
}

export const getRandomId = (id:string):string => {
  
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
export const getPrice = (ingredients:IIngredient[]):number =>
  ingredients.reduce((total, ingredient) => {
    return total + ingredient.price;
  }, 0);

export function openModal(dispatch:TAppDispatch|TAppThunk, func:()=>TApplicationActions):void {
  dispatch(func());
}

export const findIngredientsById = (listIngredients:IIngredient[], id:string[]) => {
  if (listIngredients.length && id.length) {
    return id
      .filter((el) => {
        return !Object.is(el, null);
      })
      .map((id) => {
        return listIngredients.find((el) => {
          return el._id === id;
        });
      });
  }
};

export const getOrderDate = (date: string): string => {
  
  const time = new Date(date);
  const timeNow = new Date();
  const DAY = 86400000;
  const coefficientTime =
    DAY -
    (timeNow.getHours() * 3600000 +
      timeNow.getMinutes() * 60000 +
      timeNow.getSeconds() * 1000 +
      timeNow.getMilliseconds());
  
  const today: "Сегодня" = "Сегодня";
  const yesterday: "Вчера" = "Вчера";
  const fewDaysAgo: "дня назад" = "дня назад";
  
  const timeAgo = {
    today,
    yesterday,
    fewDaysAgo,
  };
  const differTime = Number(timeNow) - Number(time) + coefficientTime;
  const daysAgo =
    (differTime < DAY && timeAgo.today) ||
    (differTime < DAY * 2 && timeAgo.yesterday) ||
    `${Math.floor(differTime / DAY)} ${timeAgo.fewDaysAgo}`;
  const minutes = time.getMinutes() < 10 ? `0${time.getMinutes()}` : `${time.getMinutes()
    }`;
  const result = `${daysAgo}, ${time.getHours()}:${minutes} i-GMT+3`;
  return result;
};
