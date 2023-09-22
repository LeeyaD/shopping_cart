import { useState } from "react"

const EditForm = ({ onShowEditForm, product, onEditProduct }) => {
  const { _id, title, price, quantity } = product
	const [productName, setProductName] = useState(title)
	const [productPrice, setProductPrice] = useState(price)
	const [productQuantity, setProductQuantity] = useState(quantity)

	const handleEditProduct = (e) => {
		e.preventDefault()
		try {
			onEditProduct(_id, productName, Number(productPrice), Number(productQuantity))
			onShowEditForm()
		} catch(e) {
			console.log(e)
		}
	}

	return (
		<div className="edit-form">
      <h3>Edit Product</h3>
      <form>
        <div className="input-group">
          <label htmlFor="product-name">Product Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            id="product-name"
            aria-label="Product Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-price">Price</label>
          <input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            type="number"
            id="product-price"
            aria-label="Product Price"
          />
        </div>

        <div className="input-group">
          <label htmlFor="product-quantity">Quantity</label>
          <input
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            type="number"
            id="product-quantity"
            aria-label="Product Quantity"
          />
        </div>

        <div className="actions form-actions">
          <button onClick={handleEditProduct} type="submit">Update</button>
          <button onClick={onShowEditForm} type="button">Cancel</button>
        </div>
      </form>
    </div>
	)
}

export default EditForm