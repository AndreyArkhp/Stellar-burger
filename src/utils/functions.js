/**
 * Проверка email
 * @param {string} value - Значение инпута email
 * @returns {boolean} - boolean
 */

export function checkEmail(value) {
  return value && /^\w+@[a-z]+\.[a-z]+$/.test(value) ? true : false;
}
