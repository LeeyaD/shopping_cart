import axios from 'axios'
import { GET_PRODUCTS, CREATE_PRODUCT, DELETE_PRODUCT } from '../constants/routes';

const getProducts = async() => {
  const { data } = await axios.get(GET_PRODUCTS);
 return data
}

const addProduct = async(title, price, quantity) => {
  const { data } = await axios.post(CREATE_PRODUCT, {
    title,
    price,
    quantity,
  })
  return data
}

const deleteProduct = async(id) => {
  await axios.delete(DELETE_PRODUCT(id))
}


export {
  getProducts,
  addProduct,
  deleteProduct
}
