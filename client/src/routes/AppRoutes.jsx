
import { Routes, Route } from 'react-router-dom'

 
// Layouts
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// Public Pages
import Home from "../pages/public/Home";
// import Products from "../pages/public/Products";
// import ProductDetails from "../pages/public/ProductDetails";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Product from '../pages/public/Product';

const AppRoutes = () => {
  return (
    <div>



      <Routes>

        {/* Public Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<h1>Cart Page</h1>} />
          <Route path="/wishlist" element={<h1>Wishlist Page</h1>} />
          <Route  path="/cart" element={<h1>Cart Page</h1>} />
          <Route path='products' element={<Product/>}/>
          {/* <Route path="/product/:id" element={<ProductDetails />} /> */}
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

