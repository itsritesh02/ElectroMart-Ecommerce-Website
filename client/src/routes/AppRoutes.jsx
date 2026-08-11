
import { Routes, Route } from 'react-router-dom'

 
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
import UserDashboard from "../pages/user/UserDashboard";

// Admin Pages
import AdminDashboard from "../pages/admin/AdminDashboard";

// Route Protection
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
const AppRoutes = () => {
  return (
    



      <Routes>

        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="products" element={<Product/>}/>
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/wishlist" element={<h1>Wishlist Page</h1>} /> 
        </Route>

      {/* =========================
            USER PROTECTED ROUTES
        ========================== */}

      <Route element={<ProtectedRoute/>}>

        <Route
          path="/user/dashboard"
          element={<UserDashboard />}
        />

      </Route>


      {/* =========================
            ADMIN PROTECTED ROUTES
        ========================== */}

      <Route element={<AdminRoute />}>

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

      </Route>

  


        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        
      </Routes>
    
  )
}

export default AppRoutes

