import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaUser,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/slice/authSlice";

import "./Navbar.css";


function Navbar() {

  // Redux se auth data lena
  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );


  // Redux se cart items lena
  const cartItems = useSelector(
    (state) => state.cart.items
  );


  // Redux se wishlist items lena
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );


  // Redux action ke liye
  const dispatch = useDispatch();


  // Page change karne ke liye
  const navigate = useNavigate();


  // Cart total quantity
  const cartCount = cartItems.reduce(
    (total, item) => {
      return total + item.quantity;
    },
    0
  );


  // Wishlist total products
  const wishlistCount = wishlistItems.length;


  // Logout function
  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");

  };


  return (
    <nav className="navbar">


      {/* =========================
          LOGO
      ========================== */}

      <Link
        to="/"
        className="navbar-logo"
      >
        ElectroMart
      </Link>


      {/* =========================
          SEARCH
      ========================== */}

      <div className="search-box">

        <input
          type="text"
          placeholder="Search products..."
        />

        <button>
          <FaSearch />
        </button>

      </div>


      {/* =========================
          NAV LINKS
      ========================== */}

      <div className="navbar-links">


        <Link to="/">
          Home
        </Link>


        <Link to="/products">
          Products
        </Link>


        {/* =========================
            WISHLIST
        ========================== */}

        <Link
          to="/wishlist"
          className="nav-icon-link"
        >

          <FaHeart />

          <span>
            Wishlist
          </span>

          {wishlistCount > 0 && (
            <span className="nav-count">
              {wishlistCount}
            </span>
          )}

        </Link>


        {/* =========================
            CART
        ========================== */}

        <Link
          to="/cart"
          className="nav-icon-link"
        >

          <FaShoppingCart />

          <span>
            Cart
          </span>

          {cartCount > 0 && (
            <span className="nav-count">
              {cartCount}
            </span>
          )}

        </Link>


        {/* =========================
            AUTH LINKS
        ========================== */}

        {isAuthenticated ? (

          <>

            {/* Profile */}

            <Link
              to="/profile"
              className="profile-link"
            >

              <FaUser />

              <span>
                {user?.name || "Profile"}
              </span>

            </Link>


            {/* Logout */}

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>

        ) : (

          <>

            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>

          </>

        )}

      </div>

    </nav>
  );
}


export default Navbar;