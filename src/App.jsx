import "./App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Homepage/Home";
import Admin from "./pages/Admin/Admin";
import SuperAdmin from "./pages/SuperAdmin/SuperAdmin";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cart from "./layouts/Cart";
import Wishlist from "./components/Wishlist";
import ProductDetail from "./layouts/ProductDetail";
import QuickView from "./components/QuickView";
import Account from "./pages/Account";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./pages/Preloader";

const AppRoutes = () => {
  const location = useLocation();
  const hideChrome =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/super");

  return (
    <>
      <ScrollToTop />
      {!hideChrome && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/super" element={<SuperAdmin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/account" element={<Account />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/:id/quickview" element={<QuickView />} />
      </Routes>
      {!hideChrome && <Footer />}
    </>
  );
};

function App() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);

  return (
    <>
      {!isPreloaderDone && <Preloader onComplete={() => setIsPreloaderDone(true)} />}
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App
