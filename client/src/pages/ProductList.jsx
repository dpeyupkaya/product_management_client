import React, { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");

  const token = localStorage.getItem("token"); // Token'ı buradan alıyoruz

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    fetch("https://localhost:7172/api/products/myproducts", {  // -> myproducts endpointi
      headers: {
        Authorization: `Bearer ${token}`,  // Header'da token gönder
      },
    })
      .then((res) => {
        if (res.status === 401) {
          alert("Giriş yapmanız gerekiyor.");
          setLoading(false);
          return [];
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ürünler alınamadı:", err);
        setLoading(false);
      });
  }, [token]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setUpdatedName(product.name);
    setUpdatedPrice(product.price);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleUpdate = () => {
    if (!token) {
      alert("Giriş yapmanız gerekiyor.");
      return;
    }

    const updatedProduct = {
      ...selectedProduct,
      name: updatedName,
      price: parseFloat(updatedPrice),
    };

    fetch(`https://localhost:7172/api/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Token header'a eklendi
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => {
        if (res.ok) {
          setProducts((prev) =>
            prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
          );
          closeModal();
        } else {
          console.error("Güncelleme başarısız.");
        }
      })
      .catch((err) => {
        console.error("Güncelleme hatası:", err);
      });
  };

  const handleDelete = (id) => {
    if (!token) {
      alert("Giriş yapmanız gerekiyor.");
      return;
    }

    if (!window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;

    fetch(`https://localhost:7172/api/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then((res) => {
        if (res.ok) {
          setProducts((prev) => prev.filter((p) => p.id !== id));
        } else {
          console.error("Silme başarısız.");
        }
      })
      .catch((err) => {
        console.error("Silme hatası:", err);
      });
  };

  if (loading) return <p className="p-4">Yükleniyor...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ürün Listesi</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow p-4 border"
          >
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-700">{product.price} TL</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openModal(product)}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Düzenle
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Ürünü Düzenle</h2>
            <label className="block mb-2">
              İsim:
              <input
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>
            <label className="block mb-4">
              Fiyat:
              <input
                type="number"
                value={updatedPrice}
                onChange={(e) => setUpdatedPrice(e.target.value)}
                className="w-full mt-1 p-2 border rounded"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                İptal
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
