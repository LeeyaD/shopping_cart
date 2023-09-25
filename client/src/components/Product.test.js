/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Product from "./Product"

// jest.mock('./Product.js')

/*
What to Test
In general, your tests should cover the following aspects of your code:
1. If a component renders with or without props
2. How a component renders with state changes
3. How a component reacts to user interactions

- Render component
- Get element from component & similate any user interaction
- write an assertion

------------------------------
const mockFunction = jest.fn();
render(<AddCommentForm onSubmit={mockFunction} />);
const user = userEvent.setup();
const button = screen.getByRole("button");
await user.click(button);
expect(mockFunction.mock.calls.length).toBe(1);
*/

const mockCart = [
  {
    _id: 1,
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
		currentQuantity: 1
  },
  {
    _id: 2,
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 0,
    price: 649.99,
		currentQuantity: 1
  },
  {
    _id: 3,
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99,
		currentQuantity: 1
  },
  {
    _id: 4,
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74,
		currentQuantity: 1
  }
];

const mockProduct = {
	_id: 1,
	title: "Amazon Kindle E-reader",
	quantity: 5,
	price: 79.99
}

test("Product renders with title", () => {
  render(<Product product={mockProduct} cartItems={mockCart}/>)
  const title =  screen.getByText(mockProduct.title)
  expect(title).toBeInTheDocument()
})

test("Add To Cart button is clickable when product is in stock", async () => {
	const mockFunction = jest.fn();
	const mockProduct = {
		_id: 1,
		title: "Amazon Kindle E-reader",
		quantity: 2,
		price: 79.99
	}
	render(<Product product={mockProduct} cartItems={mockCart} onAddItem={mockFunction} />)
	const user = userEvent.setup();
  const button = screen.getByRole('button', { name: 'Add to Cart' })
  await user.click(button);
	expect(mockFunction.mock.calls.length).toBe(1);
})

// test("Add To Cart button is disabled when product is out of stock", async () => {
// 	const mockProduct = {
// 		_id: 1,
// 		title: "Amazon Kindle E-reader",
// 		quantity: 1,
// 		price: 79.99
// 	}
// 	render(<Product product={mockProduct} cartItems={mockCart}/>)
//   const button = screen.getByRole('button', { name: 'Add to Cart' })
// 	expect(button).toHaveProperty('disabled', true); 

// const mockFunction = jest.fn();
// 	const mockProduct1 = {
// 		_id: 1,
// 		title: "Amazon Kindle E-reader",
// 		quantity: 1,
// 		price: 79.99
// 	}
// 	render(<Product product={mockProduct1} cartItems={mockCart} onAddItem={mockFunction} />)
// 	const user = userEvent.setup();
//   const button = screen.getByRole('button', { name: 'Add to Cart' })
//   await user.click(button);
// 	expect(mockFunction.mock.calls.length).toBe(0);
// })

// test("Add to Cart button is rendered", () => {})
// test("Edit button is rendered", () => {})
// test("Edit Form renders when Edit button is clicked", () => {})
// test("Delete button removes product when clicked", () => {})
// test("", () => {})
// test("", () => {})