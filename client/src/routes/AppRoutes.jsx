
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
import Cart from '../pages/user/Cart';


const AppRoutes = () => {
  return (
    



      <Routes>

        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/wishlist" element={<h1>Wishlist Page</h1>} />
       
          <Route path=
          "products" element={<Product/>}/>
          <Route path="/product/:id" element={<ProductDetails/>} />
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

