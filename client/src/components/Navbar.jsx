import { Link } from "react-router-dom";
import React from "react";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex gap-4">
      <Link to="/">Ürünler</Link>
      <Link to="/ekle">Ürün Ekle</Link>
    </nav>
  );
}

export default Navbar;
