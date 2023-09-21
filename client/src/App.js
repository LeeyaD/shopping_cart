import { useState, useEffect } from 'react'
import Product from './components/Product.js'
import Form from './components/Form.js'
import { addProduct, getProducts } from './services/product.js'

const App = () => {

  const [formVisible, setFormVisible] = useState(false)
  const [products, setProducts] = useState([])

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

  // onSubmit event handler, takes 3 pieces of state
  // sends POST req to axios '/products' 

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
					{products.map(product => <Product key={product["_id"]} {...product} />)}
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