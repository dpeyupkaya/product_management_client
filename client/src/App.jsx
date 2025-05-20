import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/ekle" element={<AddProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
