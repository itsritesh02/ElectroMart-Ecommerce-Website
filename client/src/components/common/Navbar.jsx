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

  // =========================
  // AUTH DATA
  // =========================

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );


  // =========================
  // CART DATA
  // =========================

  const cartItems = useSelector(
    (state) => state.cart.items
  );


  // =========================
  // WISHLIST DATA
  // =========================

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );


  // =========================
  // DISPATCH
  // =========================

  const dispatch = useDispatch();


  // =========================
  // NAVIGATE
  // =========================

  const navigate = useNavigate();


  // =========================
  // CART COUNT
  // =========================

  const cartCount = cartItems.reduce(
    (total, item) => {

      return total + item.quantity;

    },
    0
  );


  // =========================
  // WISHLIST COUNT
  // ==========================

  const wishlistCount =
    wishlistItems.length;


  // =========================
  // LOGOUT
  // =========================

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

        <button type="button">
          <FaSearch />
        </button>

      </div>


      {/* =========================
          NAV LINKS
      ========================== */}

      <div className="navbar-links">


        {/* HOME */}

        <Link to="/">
          Home
        </Link>


        {/* PRODUCTS */}

        <Link to="/products">
          Products
        </Link>


        {/* =========================
            MY ORDERS
        ========================== */}

        {isAuthenticated && (

          <Link to="/my-orders">
            My Orders
          </Link>

        )}


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
            AUTH
        ========================== */}

        {isAuthenticated ? (

          <>


            {/* =========================
                ADMIN DASHBOARD
            ========================== */}

            {user?.role === "admin" && (

              <Link
                to="/admin/dashboard"
                className="admin-link"
              >
                Admin
              </Link>

            )}


            {/* =========================
                PROFILE
            ========================== */}

            <Link
              to="/profile"
              className="profile-link"
            >

              <FaUser />

              <span>
                {user?.name || "Profile"}
              </span>

            </Link>


            {/* =========================
                LOGOUT
            ========================== */}

            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>

        ) : (

          <>


            {/* LOGIN */}

            <Link to="/login">
              Login
            </Link>


            {/* REGISTER */}

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