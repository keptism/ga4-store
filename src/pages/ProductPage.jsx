import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../store/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

    useEffect(() => {
    window.gtag("event", "view_item", {
      currency: "EUR",
      value: product.price,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          price: product.price,
        },
      ],
    });
  }, [product]);

  return (
    <div>
      <h2>{product.name}</h2>
      <p>Price: €{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
      <br />
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
}
