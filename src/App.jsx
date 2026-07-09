import "./App.css";
import { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthProvider from "./components/AuthProvider";
import { useAuth } from "./components/useAuth";
import ScrollToTop from "./components/ScrollToTop";
import Preloader from "./pages/Preloader";
import ShopDataProvider from "./components/ShopDataProvider";

// Lazy load components
const Home = lazy(() => import("./components/Homepage/Home"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const SuperAdmin = lazy(() => import("./pages/SuperAdmin/SuperAdmin"));
const Login = lazy(() => import("./components/Login"));
const Signup = lazy(() => import("./components/Signup"));
const Cart = lazy(() => import("./layouts/Cart"));
const Wishlist = lazy(() => import("./components/Wishlist"));
const ProductDetail = lazy(() => import("./layouts/ProductDetail"));
const QuickView = lazy(() => import("./components/QuickView"));
const Account = lazy(() => import("./pages/Account"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Shop = lazy(() => import("./pages/Shop"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Orders = lazy(() => import("./pages/Orders"));
const Addresses = lazy(() => import("./pages/Addresses"));
const PaymentMethods = lazy(() => import("./pages/PaymentMethods"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Profile = lazy(() => import("./pages/Profile"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const ReturnPolicy = lazy(() => import("./pages/ReturnPolicy"));
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const ThankYou   = lazy(() => import("./pages/ThankYou"));
// const AdminSignup = lazy(() => import("./pages/Admin/AdminSignup"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Fallback loading component
const RouteLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="w-8 h-8 border-4 border-[#6E8B3D]/20 border-t-[#6E8B3D] rounded-full animate-spin"></div>
  </div>
);

// ── Protected Route ────────────────────────────────────────────────────────────
// Waits for Firebase auth to finish initialising before deciding to redirect.
// This prevents the "refresh → login" bug caused by user being null during
// the brief window while Firebase restores the session from IndexedDB.
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <RouteLoader />;      // still initialising — show spinner
  if (!user)  return <Navigate to="/login" replace />; // definitely not logged in
  return children;
};
// ──────────────────────────────────────────────────────────────────────────────

const AppRoutes = () => {
  const location = useLocation();
  const hideChrome =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/super");

  return (
    <>
      <ScrollToTop />
      {!hideChrome && <Header />}
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* <Route path="/admin/signup" element={<AdminSignup />} /> */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/super" element={<SuperAdmin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
          <Route path="/thank-you" element={<ProtectedRoute><ThankYou /></ProtectedRoute>} />
          <Route path="/account/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/account/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
          <Route path="/account/payments" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
          <Route path="/account/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/:id/quickview" element={<QuickView />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/return-policy" element={<ReturnPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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
