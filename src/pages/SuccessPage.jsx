import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SuccessPage() {
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("lastPurchase")) || [];

    if (cartData.length > 0) {
      window.gtag("event", "purchase", {
        transaction_id: Date.now().toString(),
        currency: "USD",
        value: cartData.reduce((sum, p) => sum + p.price, 0),
        items: cartData.map((p) => ({
          item_id: p.id,
          item_name: p.name,
          price: p.price,
          quantity: 1,
        })),
      });

      localStorage.removeItem("lastPurchase");
    }
  }, []);

  return (
    <div>
      <h2>Purchase Successful 🎉</h2>
      <p>Thank you for your order!</p>
      <Link to="/">Back to Store</Link>
    </div>
  );
}
