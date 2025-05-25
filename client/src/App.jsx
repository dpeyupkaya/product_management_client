import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";
import React from "react";
import AuthPage from "./pages/auth/Auth";
import HomePage from "./pages/HomePage";

function AppWrapper() {
  const location = useLocation();
  const hideNavbarRoutes = ["/auth"];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
