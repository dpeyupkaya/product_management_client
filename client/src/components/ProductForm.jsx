import React from "react";
import { Loader, PlusCircle, Tag, DollarSign } from "lucide-react"; // Yeni ikonlar eklendi

function ProductForm({ name, setName, price, setPrice, handleSubmit, loading, error }) {
  return (
    // Ana kapsayıcı: Arka plan gradyanı ve hareketli ışıklar için relative ve overflow-hidden
    <div
      className="flex justify-center items-center min-h-screen overflow-hidden
        bg-gradient-to-br from-zinc-950 via-blue-950 to-purple-950 p-6 relative" // Daha derin ve uyumlu koyu arka plan
    >
      {/* Arka plan dekorasyonları (Blob'lar) - Daha koyu temaya uygun renkler */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-fuchsia-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-teal-400/30 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-4000"></div>


      <form
        onSubmit={handleSubmit}
        className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-lg
          ring-1 ring-white/10 // Daha az belirgin halka
          flex flex-col gap-6 relative z-10 overflow-hidden
          before:content-[''] before:absolute before:inset-0 before:rounded-3xl
          before:p-[2px] before:bg-gradient-to-r before:from-blue-400 before:via-fuchsia-400 before:to-teal-400 // Kenar ışığı renkleri güncellendi
          before:z-[-1] before:animate-border-spin" // Kenar ışığı animasyonu
      >
        {/* Başlık alanı - Daha belirgin ve şık */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl py-3 px-6 text-center text-3xl font-extrabold drop-shadow-lg shadow-lg shadow-blue-500/50">
          Yeni Ürün Ekle
        </div>

        {/* Ürün Adı alanı */}
        <div className="flex flex-col relative">
          <label className="mb-2 font-semibold text-gray-200">Ürün Adı</label>
          <input
            type="text"
            placeholder="Ürün adı girin"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="rounded-lg bg-gray-800/60 border border-gray-700/50 text-white px-5 py-3.5
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
              transition-all duration-300 shadow-inner placeholder-gray-400"
          />
          <Tag className="absolute right-3 top-1/2 mt-4 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* Fiyat alanı */}
        <div className="flex flex-col relative">
          <label className="mb-2 font-semibold text-gray-200">Fiyat (TL)</label>
          <input
            type="number"
            placeholder="Fiyat girin"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            className="rounded-lg bg-gray-800/60 border border-gray-700/50 text-white px-5 py-3.5
              focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400
              transition-all duration-300 shadow-inner placeholder-gray-400"
          />
          <DollarSign className="absolute right-3 top-1/2 mt-4 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        {/* Buton alanı */}
        <button
          type="submit"
          disabled={loading}
          className={`flex justify-center items-center gap-3 rounded-full px-8 py-4 font-bold text-lg text-white
            transition-all duration-300 relative overflow-hidden group
            ${
              loading
                ? "bg-gray-700 cursor-not-allowed shadow-inner" // Yükleme durumunda daha koyu gri
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-purple-500/70" // Buton renkleri güncellendi
            }
          `}
        >
          {/* Butonun içindeki parlayan efekt */}
          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
          <span className="relative z-10 flex items-center">
            {loading ? (
              <>
                <Loader
                  size={24} // İkon boyutu büyütüldü
                  className="animate-spin text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                />
                Ekleniyor...
              </>
            ) : (
              <>
                <PlusCircle
                  size={24} // İkon boyutu büyütüldü
                  className="drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                />
                Ürün Ekle
              </>
            )}
          </span>
        </button>

        {error && <p className="text-red-400 text-center font-semibold text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}

export default ProductForm;
