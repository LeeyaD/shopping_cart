import axios from 'axios'
import { GET_PRODUCTS, CREATE_PRODUCT } from '../constants/routes';

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


export {
  getProducts,
  addProduct
}
