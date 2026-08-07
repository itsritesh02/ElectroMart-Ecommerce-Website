import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaHeart,
  FaUser
} from "react-icons/fa";

import "./Navbar.css";

function Navbar() {
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

          <div className="count">0</div>

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