import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser
} from "react-icons/fa";
import { useSelector } from "react-redux";

import "./Navbar.css";

function Navbar() {
  // Redux se cart items lena
  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // Total quantity calculate karna
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="navbar">

      {/* Logo */}
      <div className="logo">
        <Link to="/">ElectroMart</Link>
      </div>

      {/* Search */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search Electronics..."
        />

        <button>
          <FaSearch />
        </button>
      </div>

      {/* Navigation */}
      <nav className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/wishlist" className="icon-link">
          <FaHeart />
          <span>Wishlist</span>
        </Link>

        <Link to="/cart" className="icon-link cart">

          <FaShoppingCart />

          <span>Cart</span>

          {cartCount > 0 && (
            <span className="cart-count">
              {cartCount}
            </span>
          )}

        </Link>

        <Link to="/login" className="login-btn">
          <FaUser />
          Login
        </Link>

      </nav>

    </header>
  );
}

export default Navbar;