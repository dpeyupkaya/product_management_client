import React, { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:7172/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ürünler alınamadı:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Yükleniyor...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ürün Listesi</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-4 border">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.price} TL</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
