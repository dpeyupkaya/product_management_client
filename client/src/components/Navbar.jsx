import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import { Package, PlusCircle, LogIn, LogOut } from "lucide-react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow">
        <Link
        to="/"
        className="text-xl font-bold flex items-center gap-2 hover:opacity-80"
      >
        <Package size={28} className="text-yellow-400" />
        <span className="hidden sm:inline cursor-pointer">Ürün Yönetimi</span>
      </Link>

      <div className="flex gap-6 items-center">
        <Link
          to="/products"
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
            isActive("/products")
              ? "bg-gray-700 text-yellow-300"
              : "hover:bg-gray-700 hover:text-yellow-300"
          }`}
        >
          <Package size={20} />
          <span className="hidden sm:inline">Ürünler</span>
        </Link>

        <Link
          to="/add"
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
            isActive("/add")
              ? "bg-gray-700 text-yellow-300"
              : "hover:bg-gray-700 hover:text-yellow-300"
          }`}
        >
          <PlusCircle size={20} />
          <span className="hidden sm:inline">Ürün Ekle</span>
        </Link>

        {token ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-md transition bg-red-700 hover:bg-red-800"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Çıkış Yap</span>
          </button>
        ) : (
          <Link
            to="/auth"
            className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
              isActive("/auth")
                ? "bg-gray-700 text-yellow-300"
                : "hover:bg-gray-700 hover:text-yellow-300"
            }`}
          >
            <LogIn size={20} />
            <span className="hidden sm:inline">Giriş Yap</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
