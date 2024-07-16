import { v4 as uuid } from "uuid";

import {
  REMOVE_PRODUCT,
  DECREASE_PRODUCT_NUMBER,
  ADD_PRODUCT,
  INCREASE_PRODUCT_NUMBER,
} from "../actions/productActions";

const inintialInformations = [
  {
    name: "banana",
    price: 500,
    number: 12,
    id: uuid(),
  },
  {
    name: "banana",
    price: 700,
    number: 8,
    id: uuid(),
  },
  {
    name: "apple",
    price: 200,
    number: 5,
    id: uuid(),
  },
  {
    name: "apple",
    price: 400,
    number: 2,
    id: uuid(),
  },
  {
    name: "apple",
    price: 500,
    number: 9,
    id: uuid(),
  },
  {
    name: "orange",
    price: 300,
    number: 3,
    id: uuid(),
  },
];

const initialState = {
  value:
    JSON.parse(localStorage.getItem("productsInformations")) ||
    inintialInformations,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case REMOVE_PRODUCT:
      return {
        ...state,
        value: state.value.filter((product) => product.id !== action.id),
      };

    case DECREASE_PRODUCT_NUMBER:
      return {
        ...state,
        value: state.value.map((product, index) =>
          product.id === action.id
            ? { ...product, number: action.number }
            : product
        ),
      };

    case ADD_PRODUCT:
      return {
        ...state,
        value: [...state.value, action.product],
      };

    case INCREASE_PRODUCT_NUMBER:
      return {
        ...state,
        value: state.value.map((product, index) =>
          product.id === action.id
            ? { ...product, number: action.number }
            : product
        ),
      };

    default:
      return state;
  }
};

export default productsReducer;
