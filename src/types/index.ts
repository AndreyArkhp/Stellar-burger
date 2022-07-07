export interface IIngredient  {
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
};

export interface IIngredientsList {
  success: boolean;
  data: Array<IIngredient>;
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
  ingredients: IIngredientsList;
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

export interface MyRequestInit extends Omit<RequestInit, 'headers'> {
  headers?: Record<string, string>;
}



