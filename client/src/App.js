import { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import Product from './components/Product';
// eslint-disable-next-line no-unused-vars
import Form from './components/Form.js';
// eslint-disable-next-line no-unused-vars
import Cart from './components/Cart.js';
import { 
  addProduct, 
  getProducts, 
  deleteProduct, 
  editProduct } 
  from './services/product.js'

const App = () => {
  const [showForm, setShowForm] = useState(false)
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
    const data = await addProduct(title, price, quantity)
    setProducts(products.concat(data))
  }

  const handleDeleteProduct = async(id) => {
    await deleteProduct(id)
    setProducts(products.filter(p => p["_id"] !== id))
  }

  const handleEditProduct = async(id, title, price, quantity ) => {
    const updatedProduct = await editProduct(id, title, price, quantity)
    setProducts(products.map(product => {
      if (product._id === id) {
        const { _id, title, price, quantity } = updatedProduct;
        return {
          _id,
          title,
          price,
          quantity
        };
      }
      return product;
    }))
  }

  const handleShowForm = () => {
    const visibility = !showForm
    setShowForm(visibility)
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

	const formStyle = showForm ? "visible" : ""

	return (
		<div id="app">
      <header>
      <h1>The Shop!</h1>
      <Cart 
        cartItems={cartItems}
        products={products} 
        editProduct={editProduct} 
        setCartItems={setCartItems} 
        setProducts={setProducts} 
      />
    </header>

    <main>
      <div className="product-listing">
        <h2>Products</h2>
        <ul className="product-list">
					{products.map(product => 
            <Product 
              cartItems={cartItems} 
              onAddItem={handleCartUpdate} 
              product={product} 
              key={product["_id"]} 
              onDeleteProduct={handleDeleteProduct} 
              onEditProduct={handleEditProduct}
            />)}
        </ul>
      </div>
      <div className={`add-form ${formStyle}`}>
        <p>
          <button 
            onClick={handleShowForm} 
            className="add-product-button">
            Add A Product
          </button>
        </p>
        <h3>Add Product</h3>
        <Form 
          onShowFormChange={handleShowForm} 
          onAddProduct={handleAddProduct} 
        />
      </div>
    </main>
  </div>
	)
}

export default App