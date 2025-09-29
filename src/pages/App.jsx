import React, { useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { products } from "../data/products";

// --- Page Tracking Hook ---
function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "page_view", {
        page_path: location.pathname + location.search + location.hash,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
  }, [location]);
}

// --- Pages ---
function Home() {
  useEffect(() => {
    if (window.gtag) {
      window.gtag("event", "view_item_list", {
        items: products.map((p) => ({
          item_id: p.id,
          item_name: p.name,
          price: p.price,
        })),
      });
    }
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

function Cart() {
  return (
    <div>
      <h2>Your Cart</h2>
      <p>Cart items will go here.</p>
      <Link to="/checkout">Proceed to Checkout</Link>
    </div>
  );
}

function Checkout() {
  return (
    <div>
      <h2>Checkout</h2>
      <p>This is a mock checkout page.</p>
    </div>
  );
}

// --- Main App ---
export default function App() {
  usePageTracking();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
