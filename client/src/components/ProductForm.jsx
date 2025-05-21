import React from "react";
import { Loader, PlusCircle } from "lucide-react";

function ProductForm({ name, setName, price, setPrice, handleSubmit, loading, error }) {
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800 mb-4">
        <PlusCircle size={24} className="text-green-600" />
        Yeni Ürün Ekle
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
        <input
          type="text"
          placeholder="Ürün adı"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Fiyat (TL)</label>
        <input
          type="number"
          placeholder="Fiyat"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full flex justify-center items-center gap-2 px-4 py-2 rounded text-white font-semibold ${
          loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? (
          <>
            <Loader size={18} className="animate-spin" />
            Ekleniyor...
          </>
        ) : (
          <>
            <PlusCircle size={18} />
            Ürün Ekle
          </>
        )}
      </button>

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </form>
  );
}

export default ProductForm;
