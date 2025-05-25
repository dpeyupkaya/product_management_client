import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Package, PlusCircle, SignOut, SignIn } from "phosphor-react";

function Navbar({ token, handleLogout }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;


  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md sticky top-0 z-50 relative overflow-hidden">
      {/* Üst ışık çubuğu */}
      <div className="animate-horizontal-glow" style={{
        top: 0
        , animationDelay: "1.5s"
      }}></div>

      {/* Alt ışık çubuğu, 1.5s gecikmeli */}
      <div className="animate-horizontal-glow" style={{ bottom: 0, animationDelay: "1.5s" }}></div>
      <Link
        to="/"
        className="text-2xl font-extrabold flex items-center gap-3 text-yellow-400 hover:opacity-90 transition-opacity duration-300"
      >
        <Package size={30} weight="fill" />
        <span className="hidden sm:inline cursor-pointer select-none">Ürün Yönetimi</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          to="/products"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${isActive("/products")
              ? "bg-yellow-400 text-gray-900 font-semibold shadow-lg"
              : "text-yellow-300 hover:bg-yellow-400 hover:text-gray-900"
            }`}
        >
          <Package size={22} weight="duotone" />
          <span className="hidden sm:inline select-none">Ürünler</span>
        </Link>

        <Link
          to="/add"
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${isActive("/add")
              ? "bg-yellow-400 text-gray-900 font-semibold shadow-lg"
              : "text-yellow-300 hover:bg-yellow-400 hover:text-gray-900"
            }`}
        >
          <PlusCircle size={22} weight="duotone" />
          <span className="hidden sm:inline select-none">Ürün Ekle</span>
        </Link>

        {token ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-colors duration-300 shadow-md"
          >
            <SignOut size={22} weight="duotone" />
            <span className="hidden sm:inline select-none">Çıkış Yap</span>
          </button>
        ) : (
          <Link
            to="/auth"
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 ${isActive("/auth")
                ? "bg-yellow-400 text-gray-900 font-semibold shadow-lg"
                : "text-yellow-300 hover:bg-yellow-400 hover:text-gray-900"
              }`}
          >
            <SignIn size={22} weight="duotone" />
            <span className="hidden sm:inline select-none">Giriş Yap</span>
          </Link>
        )}
      </div>


    </nav>
  );
}

export default Navbar;






