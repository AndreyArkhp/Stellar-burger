export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  uuid?: string;
}

export interface IIngredientsList {
  success: boolean;
  data: IIngredient[];
}

export interface IUser {
  name: string;
  email: string;
}

export interface IOwner {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
}

export interface IOrder {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  ouner?: IOwner;
  price?: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IOrderResponse {
  name: string;
  success: boolean;
  order: IOrder;
}

export interface MyRequestInit extends Omit<RequestInit, "headers"> {
  headers?: Record<string, string>;
}

//ingredient

export interface ITranslation {
  bun: "Булки";
  sauce: "Соусы";
  main: "Начинки";
}

type TIngredientType = "bun" | "sauce" | "main";

export interface IIngtedientType {
  ingredient: TIngredientType;
}

export interface IIngtedientTypesObjects {
  type: TIngredientType;
  id: 1 | 2 | 3;
}

export interface IHeadersIngredients {
  [index: string]: HTMLHeadingElement;
  bun: HTMLHeadingElement;
  main: HTMLHeadingElement;
  sauces: HTMLHeadingElement;
}

//order

export interface IOrderElement {
  curent: number;
  id: string;
  image: string;
  name: string;
  price: number;
}

export interface IOrderMap {
  [id: string]: IOrderElement;
}

export interface IStatusMap {
  [status: string]: string;
  done: "Выполнен";
  pending: "Готовится";
  created: "Создан";
}

//OrderCard

export interface IOrderCardParam {
  order: IOrder;
  status: boolean;
  ingredients: IIngredient[];
}
