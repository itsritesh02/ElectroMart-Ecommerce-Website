import { useEffect, useState } from "react";

import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  useSelector,
  useDispatch,
} from "react-redux";

import { logout } from "../../redux/slice/authSlice";

import {
  loadCart,
  resetCart,
} from "../../redux/slice/cartSlice";

import logo from "../../assets/E-Mart.png";

import "./Navbar.css";


function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const {
    user,
    isAuthenticated,
  } = useSelector(
    (state) => state.auth
  );

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();


  /* =========================
     LOAD CART
  ========================= */

  useEffect(() => {

    if (isAuthenticated && user?.id) {

      dispatch(loadCart(user.id));

    } else {

      dispatch(resetCart());

    }

  }, [
    isAuthenticated,
    user?.id,
    dispatch,
  ]);


  /* =========================
     COUNTS
  ========================= */

  const cartCount = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  const wishlistCount =
    wishlistItems.length;


  /* =========================
     CLOSE MENU
  ========================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };


  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {

    dispatch(logout());

    dispatch(resetCart());

    setMenuOpen(false);

    navigate("/login");
  };


  /* =========================
     SEARCH
  ========================= */

  const handleSearch = (e) => {

    e.preventDefault();

    const value =
      e.currentTarget
        .querySelector("input")
        .value
        .trim();

    if (!value) return;

    closeMenu();

    navigate(
      `/products?search=${encodeURIComponent(value)}`
    );
  };


  return (

    <nav className="navbar">

      <div className="navbar-main">


        {/* =========================
            LOGO
        ========================= */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >

          <img
            src={logo}
            alt="ElectroMart"
          />

        </Link>


        {/* =========================
            SEARCH
        ========================= */}

        <form
          className="search-box"
          onSubmit={handleSearch}
        >

          <input
            type="text"
            placeholder="Search products..."
            aria-label="Search products"
          />

          <button
            type="submit"
            aria-label="Search"
          >
            <FaSearch />
          </button>

        </form>


        {/* =========================
            DESKTOP NAVIGATION
        ========================= */}

        <div className="desktop-links">

          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link
            to="/products"
            onClick={closeMenu}
          >
            Products
          </Link>

          {isAuthenticated && (
            <Link
              to="/my-orders"
              onClick={closeMenu}
            >
              My Orders
            </Link>
          )}

        </div>


        {/* =========================
            ACTIONS
        ========================= */}

        <div className="navbar-actions">


          {/* WISHLIST */}

          <Link
            to="/wishlist"
            className="nav-action"
            onClick={closeMenu}
          >

            <span className="nav-action-icon">

              <FaHeart />

              {wishlistCount > 0 && (
                <span className="nav-count">
                  {wishlistCount}
                </span>
              )}

            </span>

            <span className="nav-action-text">
              Wishlist
            </span>

          </Link>


          {/* CART */}

          <Link
            to="/cart"
            className="nav-action"
            onClick={closeMenu}
          >

            <span className="nav-action-icon">

              <FaShoppingCart />

              {cartCount > 0 && (
                <span className="nav-count">
                  {cartCount}
                </span>
              )}

            </span>

            <span className="nav-action-text">
              Cart
            </span>

          </Link>


          {/* PROFILE */}

          {isAuthenticated && (

            <Link
              to="/profile"
              className="profile-action"
              onClick={closeMenu}
            >

              <FaUser />

              <span>
                {user?.name || "Profile"}
              </span>

            </Link>

          )}


          {/* DESKTOP LOGOUT */}

          {isAuthenticated && (

            <button
              type="button"
              className="desktop-logout"
              onClick={handleLogout}
            >
              Logout
            </button>

          )}


          {/* LOGIN */}

          {!isAuthenticated && (

            <Link
              to="/login"
              className="login-action"
              onClick={closeMenu}
            >
              Login
            </Link>

          )}


          {/* REGISTER */}

          {!isAuthenticated && (

            <Link
              to="/register"
              className="register-action"
              onClick={closeMenu}
            >
              Register
            </Link>

          )}


          {/* MOBILE MENU */}

          <button
            type="button"
            className="menu-btn"
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            aria-label="Toggle menu"
          >

            {menuOpen
              ? <FaTimes />
              : <FaBars />
            }

          </button>

        </div>

      </div>


      {/* =========================
          MOBILE MENU
      ========================= */}

      <div
        className={`mobile-menu ${menuOpen ? "mobile-open" : ""
          }`}
      >

        <Link
          to="/"
          onClick={closeMenu}
        >
          Home
        </Link>


        <Link
          to="/products"
          onClick={closeMenu}
        >
          Products
        </Link>


        {isAuthenticated && (

          <Link
            to="/my-orders"
            onClick={closeMenu}
          >
            My Orders
          </Link>

        )}


        <Link
          to="/wishlist"
          onClick={closeMenu}
        >

          <FaHeart />

          <span>Wishlist</span>

          {wishlistCount > 0 && (
            <span className="mobile-count">
              {wishlistCount}
            </span>
          )}

        </Link>


        <Link
          to="/cart"
          onClick={closeMenu}
        >

          <FaShoppingCart />

          <span>Cart</span>

          {cartCount > 0 && (
            <span className="mobile-count">
              {cartCount}
            </span>
          )}

        </Link>


        {isAuthenticated && (

          <>

            {user?.role === "admin" && (

              <Link
                to="/admin/dashboard"
                className="admin-mobile-link"
                onClick={closeMenu}
              >
                Admin Dashboard
              </Link>

            )}


            <Link
              to="/profile"
              onClick={closeMenu}
            >

              <FaUser />

              <span>
                {user?.name || "Profile"}
              </span>

            </Link>


            <button
              type="button"
              className="mobile-logout"
              onClick={handleLogout}
            >
              Logout
            </button>

          </>

        )}


        {!isAuthenticated && (

          <>

            <Link
              to="/login"
              onClick={closeMenu}
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
            >
              Register
            </Link>

          </>

        )}

      </div>

    </nav>

  );
}


export default Navbar;