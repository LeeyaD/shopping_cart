const Cart = ({cartItems, products, editProduct, setCartItems, setProducts}) => {

  const calcCartTotal = () => {
    let total = 0
    cartItems.forEach(item => {
      total += item.cartQuantity * item.price
    })
    return total.toFixed(2)
  }

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    const nextProducts = products.map(product => {
      const nextProduct = {...product}
      const foundItem = cartItems.find(item => nextProduct._id === item._id && item.cartQuantity )

      if (foundItem) {
        nextProduct.quantity = nextProduct.quantity - foundItem.cartQuantity
      }

      return nextProduct
    })

    const promises = nextProducts.map(async ({_id, title, price, quantity}) => {
      return editProduct(_id, title, price, quantity);
    });

    Promise.all(promises)
      .then(() => {
        setCartItems([])
        setProducts(nextProducts)
      })
      .catch(err => console.log(err))
  }

  const handleClearCart = () => {
    setCartItems([])
  }

	return (
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
        <button onClick={handleClearCart} className="checkout clear-cart">Clear Cart</button>
        <button onClick={handleCheckout} className="checkout">Checkout</button>
      </div>
    </div>
	)
}

export default Cart;