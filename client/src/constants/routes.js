export const GET_PRODUCTS = '/api/products';
export const CREATE_PRODUCT = '/api/products';
export const DELETE_PRODUCT = (id) => {
  return `/api/products/${id}`;
}