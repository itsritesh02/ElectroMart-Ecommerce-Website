import { Routes, Route } from "react-router-dom";


// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";


// Public Pages
import Home from "../pages/public/Home";
import Product from "../pages/public/Product";
import ProductDetails from "../pages/public/ProductDetails";


// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";


// User Pages
import Cart from "../pages/user/Cart";
import Wishlist from "../pages/user/Wishlist";
import Profile from "../pages/user/Profile";


const AppRoutes = () => {

  return (

    <Routes>


      {/* =========================
          MAIN LAYOUT
      ========================== */}

      <Route element={<MainLayout />}>


        {/* Home */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* Products */}

        <Route
          path="/products"
          element={<Product />}
        />


        {/* Product Details */}

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />


        {/* Cart */}

        <Route
          path="/cart"
          element={<Cart />}
        />


        {/* Wishlist */}

        <Route
          path="/wishlist"
          element={<Wishlist />}
        />


        {/* Profile */}

        <Route
          path="/profile"
          element={<Profile />}
        />


      </Route>


      {/* =========================
          AUTH LAYOUT
      ========================== */}

      <Route element={<AuthLayout />}>


        {/* Login */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* Register */}

        <Route
          path="/register"
          element={<Register />}
        />


      </Route>


    </Routes>

  );
};


export default AppRoutes;