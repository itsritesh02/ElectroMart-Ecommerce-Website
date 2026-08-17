
import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

import Home from "../pages/public/Home";
import Product from "../pages/public/Product";
import ProductDetails from "../pages/public/ProductDetails";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import UserDashboard from "../pages/user/UserDashboard";
import Cart from "../pages/user/Cart";
import Wishlist from "../pages/user/Wishlist";
import Profile from "../pages/user/Profile";
import OrderSuccess from "../pages/user/OrderSuccess";
import Checkout from "../pages/user/Checkout";
import MyOrders from "../pages/user/MyOrder";

import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminUsers from "../pages/admin/AdminUsers";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* PUBLIC */}

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/products"
          element={<Product />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

      </Route>


      {/* USER */}

      <Route element={<ProtectedRoute />}>

        <Route element={<MainLayout />}>

          <Route
            path="/user/dashboard"
            element={<UserDashboard />}
          />

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/profile"
            element={<Profile/>}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/order-success/:id"
            element={<OrderSuccess />}
          />

          <Route
            path="/my-orders"
            element={<MyOrders />}
          />

        </Route>

      </Route>


      {/* ADMIN */}

      <Route element={<AdminRoute />}>

        <Route element={<MainLayout />}>

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
            element={<EditProduct />}
          />

          <Route
            path="/admin/orders"
            element={<AdminOrders />}
          />

          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />

        </Route>

      </Route>


      {/* AUTH */}

      <Route element={<AuthLayout />}>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Route>

    </Routes>
  );
};

export default AppRoutes;

