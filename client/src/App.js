import { useState, useEffect } from 'react'
import dummyData from "./mockData/data.js"
import Product from './components/Product.js'

const App = () => {

	const [data, setData] = useState([])
  // const [productName, setProductName] = useState('')
  // const [productPrice, setProductPrice] = useState('')
  // const [productQuantity, setProductQuantity] = useState('')

	useEffect(() => {
		setData(dummyData)
	}, [])

	return (
		<div id="app">
    <header>
      <h1>The Shop!</h1>
      <div className="cart">
        <h2>Your Cart</h2>
        <p>Your cart is empty</p>
        <p>Total: $0</p>
        <button className="checkout" disabled>Checkout</button>
      </div>
    </header>

    <main>
      <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
					{data.map(product => <Product key={product.id} {...product} />)}
        </ul>
      </div>
      <div className="add-form">
        <p><button className="add-product-button">Add A Product</button></p>
        <h3>Add Product</h3>
        <form>
          <div className="input-group">
            <label htmlFor="product-name">Product Name:</label>
            <input
              type="text"
              id="product-name"
              name="product-name"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="product-price">Price:</label>
            <input
              type="number"
              id="product-price"
              name="product-price"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="product-quantity">Quantity:</label>
            <input
              type="number"
              id="product-quantity"
              name="product-quantity"
              min="0"
              required
            />
          </div>
          <div className="actions form-actions">
            <button type="submit">Add</button>
            <button type="button">Cancel</button>
          </div>
        </form>
      </div>
    </main>
  </div>
	)
}

export default App