import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

export default function App() {

    useEffect(() => {
      window.gtag("event", "view_item_list", {
        items: products.map((p) => ({
          item_id: p.id,
          item_name: p.name,
          price: p.price,
        })),
      });
    }, []);

  return (
    <div>
      <h1>Fake Store</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link to={`/product/${p.id}`}>
              {p.name} - €{p.price}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
}
