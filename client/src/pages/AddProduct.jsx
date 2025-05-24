import React, { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Component yüklendiğinde token'ı kontrol et
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token on component load:", token);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    console.log("Token on submit:", token); // Token'ı burada da yazdır

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://localhost:7172/api/products", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
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
