import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/CartContext";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, p) => sum + p.price, 0);

const handleRemove = (product) => {
  removeFromCart(product.id);

  window.gtag("event", "remove_from_cart", {
    currency: "USD",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        quantity: 1,
      },
    ],
  });
};

  return (
      <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
            <ul>
          {cart.map((p, index) => (
              <li key={index}>
              {p.name} - €{p.price}{" "}
              <button onClick={() => handleRemove(product)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <h3>Total: €{total.toFixed(2)}</h3>
      {cart.length > 0 && <Link to="/checkout">Proceed to Checkout</Link>}
      <br />
      <Link to="/">Back to Store</Link>
    </div>
  );
};
