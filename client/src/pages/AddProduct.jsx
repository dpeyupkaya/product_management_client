import React, { useState } from "react";
import ProductForm from "../components/ProductForm";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("accessToken");  // Token'ı al

      const response = await fetch("https://localhost:7172/api/products", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`    // Token'ı header'a ekle
        },
        body: JSON.stringify({ name, price: Number(price) }),
      });

      if (!response.ok) {
        throw new Error("API isteği başarısız oldu.");
      }

      const data = await response.json();
      console.log("Ürün başarıyla eklendi:", data);

      setName("");
      setPrice("");
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="p-4">
      <ProductForm
        name={name}
        setName={setName}
        price={price}
        setPrice={setPrice}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default AddProduct;
