export const REMOVE_PRODUCT = "REMOVE_PRODUCT";
export const DECREASE_PRODUCT_NUMBER = "DECREASE_PRODUCT_NUMBER";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const INCREASE_PRODUCT_NUMBER = "INCREASE_PRODUCT_NUMBER";

export function removeProduct(productID) {
  return {
    type: REMOVE_PRODUCT,
    id: productID,
  };
}

export function decreaseProductNumber(productID, productNewNumber) {
  return {
    type: DECREASE_PRODUCT_NUMBER,
    id: productID,
    number: productNewNumber,
  };
}

export function addProduct(newProduct) {
  return {
    type: ADD_PRODUCT,
    product: newProduct,
  };
}
export function increaseProductNumber(productID, productNewNumber) {
  return {
    type: INCREASE_PRODUCT_NUMBER,
    id: productID,
    number: productNewNumber,
  
  };
}
