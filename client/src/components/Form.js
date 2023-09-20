import { useState } from "react"

const Form = ({ onFormVisibilityChange, onAddProduct }) => {
	const [productName, setProductName] = useState('')
	const [productPrice, setProductPrice] = useState('')
	const [productQuantity, setProductQuantity] = useState('')

	const handleAddProduct = (e) => {
		e.preventDefault()
		try {
			onAddProduct(productName, Number(productPrice), Number(productQuantity))
			setProductName('')
			setProductPrice('')
			setProductQuantity('')
			onFormVisibilityChange()
		} catch(e) {
			console.log(e)
		}
	}

	return (
		<form>
			<div className="input-group">
				<label htmlFor="product-name">Product Name:</label>
				<input
					value={productName}
					onChange={(e) => setProductName(e.target.value)}
					type="text"
					id="product-name"
					name="product-name"
					required
				/>
			</div>
			<div className="input-group">
				<label htmlFor="product-price">Price:</label>
				<input
					value={productPrice}
					onChange={(e) => setProductPrice(e.target.value)}
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
					value={productQuantity}
					onChange={(e) => setProductQuantity(e.target.value)}
					type="number"
					id="product-quantity"
					name="product-quantity"
					min="0"
					required
				/>
			</div>
			<div className="actions form-actions">
				<button onClick={handleAddProduct} type="submit">Add</button>
				<button onClick={onFormVisibilityChange} type="button">Cancel</button>
			</div>
		</form>
	)
}

export default Form