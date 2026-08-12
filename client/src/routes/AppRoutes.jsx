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
import UserDashboard from "../pages/user/UserDashboard";
import Cart from "../pages/user/Cart";
import Wishlist from "../pages/user/Wishlist";
import Profile from "../pages/user/Profile";


// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";


// Route Protection
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AdminProducts from "../pages/admin/AdminProducts";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import Checkout from "../pages/user/checkout";


const AppRoutes = () => {

  return (

    <Routes>


      {/* =================================
          PUBLIC ROUTES
      ================================= */}

      <Route element={<MainLayout />}>

        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Product />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
          path="/checkout"
          element={<Checkout/>}
        />

      </Route>


      {/* =================================
          USER PROTECTED ROUTES
      ================================= */}

      <Route element={<ProtectedRoute />}>

        <Route element={<MainLayout />}>

          {/* User Dashboard */}

          <Route path="/user/dashboard"
            element={<UserDashboard />}
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

      </Route>


      {/* =================================
          ADMIN PROTECTED ROUTES
      ================================= */}

      <Route element={<AdminRoute />}>

        <Route element={<MainLayout />}>

          {/* Admin Dashboard */}

          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
          <Route
            path="/admin/products"
            element={<AdminProducts />}
          />
          <Route
            path="/admin/products/add"
            element={<AddProduct />}
          />
          <Route
            path="/admin/products/edit/:id"
            element={<EditProduct/>}
          />

        </Route>

      </Route>


      {/* =================================
          AUTH ROUTES
      ================================= */}

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