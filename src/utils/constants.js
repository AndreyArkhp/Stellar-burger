import PropTypes from "prop-types";

export const ingredientsPropTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number,
};

export const baseUrl = "https://norma.nomoreparties.space/api/";
export const wsOrdersUrl = "wss://norma.nomoreparties.space/orders/all";
export const wsHistoryOrdersUrl = "wss://norma.nomoreparties.space/orders";
