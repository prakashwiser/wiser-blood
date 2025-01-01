"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Products() {
  const [products, setProducts] = useState([]);
  console.log(products);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/signup");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Product List</h1>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <strong>Email:</strong> {product.email} <br />
              <strong>Password:</strong> {product.password} <br />
              <strong>Number:</strong> {product.num}<br />
              <strong>Update:</strong>
              {
                <Link
                  style={{ backgroundColor: "red",color:"white",padding:"5px" }}
                  href={`/update/${product._id}`}
                >
                  Update
                </Link>
              }
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
}
