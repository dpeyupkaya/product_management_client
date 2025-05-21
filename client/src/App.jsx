import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";
import React from "react";
import AuthPage from "./pages/auth/Auth";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/auth" element = {<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
