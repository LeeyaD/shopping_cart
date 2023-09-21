import { useState, useEffect } from 'react'
import Product from './components/Product.js'
import Form from './components/Form.js'
import { addProduct, getProducts } from './services/product.js'

const App = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])

	useEffect(() => {
    const fetchData = async() => {
      const products = await getProducts()
      setProducts(products)
    }
    fetchData()
	}, [])

  const handleAddProduct = async (title, price, quantity) => {
    const data = addProduct(title, price, quantity)
    setProducts(products.concat(data))
  }

  const handleFormVisibility = () => {
    const visibility = !formVisible
    setFormVisible(visibility)
    document.querySelector(".add-form").classList.toggle("visible")
  }

  const handleCartUpdate = (product) => {
    let itemFound = false;

    const nextCartItems = cartItems.map(item => {
      const newItem = {...item}
      if (item._id === product._id) {
        newItem.cartQuantity++
        itemFound = true
      }
      return newItem
    })

    if (!itemFound) {
      const newCartItem = {...product}
      newCartItem.cartQuantity = 1
      setCartItems(nextCartItems.concat(newCartItem))
    } else {
      setCartItems(nextCartItems)
    }
  }

  const calcCartTotal = () => {
    let total = 0
    cartItems.forEach(item => {
      total += item.cartQuantity * item.price
    })
    return total.toFixed(2)
  }

	return (
		<div id="app">
      <header>
      <h1>The Shop!</h1>
      <div className="cart">
      <h2>Your Cart</h2>
      <table className="cart-items">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => {
            return (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.cartQuantity}</td>
                <td>${item.price}</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="total">Total: ${calcCartTotal()}</td>
          </tr>
        </tfoot>
      </table>
      <div className="checkout-button">
        <button className="checkout">Checkout</button>
      </div>
    </div>
    </header>

    <main>
      <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
					{products.map(product => <Product cartItems={cartItems} onAddItem={handleCartUpdate} product={product} key={product["_id"]} />)}
        </ul>
      </div>
      <div className="add-form">
        <p><button onClick={handleFormVisibility} className="add-product-button">Add A Product</button></p>
        <h3>Add Product</h3>
        <Form onFormVisibilityChange={handleFormVisibility} onAddProduct={handleAddProduct}/>
      </div>
    </main>
  </div>
	)
}

export default App