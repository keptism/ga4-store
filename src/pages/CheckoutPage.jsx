import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

const handleCheckout = () => {
  window.gtag("event", "begin_checkout", {
    currency: "EUR",
    value: cart.reduce((sum, p) => sum + p.price, 0),
    items: cart.map((p) => ({
      item_id: p.id,
      item_name: p.name,
      price: p.price,
      quantity: 1,
    })),
  });

  localStorage.setItem("lastPurchase", JSON.stringify(cart));
  clearCart();
  navigate("/success");
};

  return (
    <div>
      <h2>Checkout</h2>
      <p>You have {cart.length} items in your cart.</p>
      <button onClick={handleCheckout}>Confirm Purchase</button>
      <br />
      <Link to="/cart">Back to Cart</Link>
    </div>
  );
}
