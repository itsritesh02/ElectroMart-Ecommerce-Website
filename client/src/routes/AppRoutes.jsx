
import { Routes, Route } from 'react-router-dom'

 
// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Public Pages
import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import ProductDetails from "../pages/public/ProductDetails";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const AppRoutes = () => {
  return (
    <div>



      <Routes>

        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>

        {/* Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        
      </Routes>
    </div>
  )
}

export default AppRoutes

