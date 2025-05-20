import React, { useState } from "react";

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
      const response = await fetch("https://localhost:7172/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ürün adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Fiyat"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        min="0"
      />
      <button type="submit" disabled={loading}>
        {loading ? "Ekleniyor..." : "Ürün Ekle"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
}

export default AddProduct;
