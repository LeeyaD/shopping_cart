import { useState } from "react"
import EditForm from "./EditForm"

const Product = ({ product, onAddItem, cartItems, onDeleteProduct, onEditProduct }) => {
  const [showEditForm, setShowEditForm] = useState(false)
  const { _id, title, price, quantity } = product

  const findProduct = (productId) => {
    for (let i = 0; i < cartItems.length; i += 1) {
      if (cartItems[i]._id === productId) {
        return cartItems[i]
      }
    }
  }

  const currentQuantity = () => {
    const cartItem = findProduct(product._id)
    let itemQuantityInCart;
    if (!cartItem) {
      itemQuantityInCart = 0 
    } else {
      itemQuantityInCart = cartItem.cartQuantity
    }
    return quantity - itemQuantityInCart
  }

  const handleDeleteProduct = (e) => {
    try {
      onDeleteProduct(_id)
    } catch(e) {
      console.log(e)
    }
  }

  const handleShowEditForm = () => {
    const showForm = !showEditForm
    setShowEditForm(showForm)
  }

  return (
    <li className="product">
      <div className="product-details">
        <h3>{title}</h3>
        <p className="price">${price}</p>
        {currentQuantity() === 0 ? 
          <p className="quantity none-left">{currentQuantity()} left in stock</p>
        :
          <p className="quantity">{currentQuantity()} left in stock</p>
        }
        <div className="actions product-actions">
					{currentQuantity() === 0 ?
						<button className="add-to-cart" disabled>Add to Cart</button>
						: 
						<button onClick={() => onAddItem(product)} className="add-to-cart">Add to Cart</button>
					}
          <button onClick={handleShowEditForm} className="edit">Edit</button>
        </div>
        <button onClick={handleDeleteProduct} className="delete-button"><span>X</span></button>
      </div>
      {showEditForm ? <EditForm onShowEditForm={handleShowEditForm} product={product} onEditProduct={onEditProduct}/> : null}
    </li>
  )
}

export default Product