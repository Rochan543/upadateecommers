import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
import PaypalReturnPage from "./pages/shopping-view/paypal-return";
import PaymentSuccessPage from "./pages/shopping-view/payment-success";
import SearchProducts from "./pages/shopping-view/search";
import AdminUsers from "./pages/admin-view/users";
import AdminUserOrders from "./pages/admin-view/user-orders";
import WhatsAppChat from "./components/common/WhatsAppChat";
import AboutUs from "./pages/static/AboutUs";
import PrivacyPolicy from "./pages/static/PrivacyPolicy";
import TermsConditions from "./pages/static/TermsConditions";
import RefundPolicy from "./pages/static/RefundPolicy";
import ContactUs from "./pages/static/ContactUs";
import CookieConsent from "./components/common/CookieConsent";
import PublicLayout from "./components/public-view/layout";
import PublicHome from "./pages/public-view/home";
import AdminAnnouncements from "./pages/admin-view/announcements";
import AdminSubscribers from "./pages/admin-view/subscribers"; // ✅ ADD
import Favorites from "./pages/shopping-view/favorites";




function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;

  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>

      {/* ✅ ADDED: PUBLIC HOME (NO AUTH REQUIRED) */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<PublicHome />} />
        </Route>

        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
            {/* ✅ ADD THESE */}
          <Route path="users" element={<AdminUsers />} />
          <Route path="users/:userId" element={<AdminUserOrders />} />
          <Route path="announcements" element={<AdminAnnouncements />} />
          <Route path="subscribers" element={<AdminSubscribers />} /> // ✅ ADD
          <Route path="favorites" element={<Favorites />} />


        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >

          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="search" element={<SearchProducts />} />
          
        </Route>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
        

        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* ✅ ONLY ADDED LINE */}
      <WhatsAppChat />
      {/* ✅ COOKIE CONSENT (ADSENSE REQUIRED) */}
       <CookieConsent />
      
    </div>
  );
}



export default App;
