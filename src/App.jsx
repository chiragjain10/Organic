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
import ShopDataProvider from "./components/ShopDataProvider";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Addresses from "./pages/Addresses";
import PaymentMethods from "./pages/PaymentMethods";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ReturnPolicy from "./pages/ReturnPolicy";
import AdminLogin from "./pages/Admin/AdminLogin";
import NotFound from "./pages/NotFound";

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
        <Route path="/admin/login" element={<AdminLogin />} />
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
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/account/profile" element={<Profile />} />
        <Route path="/account/addresses" element={<Addresses />} />
        <Route path="/account/payments" element={<PaymentMethods />} />
        <Route path="/account/notifications" element={<Notifications />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/:id/quickview" element={<QuickView />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="*" element={<NotFound />} />
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
        <ShopDataProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </ShopDataProvider>
      </AuthProvider>
    </>
  );
}

export default App
