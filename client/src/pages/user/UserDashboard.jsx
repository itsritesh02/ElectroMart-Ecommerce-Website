import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/slice/authSlice";

import "./UserDashboard.css";


function UserDashboard() {

  const dispatch = useDispatch();

  const navigate = useNavigate();


  // ==========================
  // GET USER
  // ==========================

  const { user } = useSelector(
    (state) => state.auth
  );


  // ==========================
  // GET CART
  // ==========================

  const cartItems = useSelector(
    (state) => state.cart.items
  );


  // ==========================
  // GET WISHLIST
  // ==========================

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );


  // ==========================
  // CART COUNT
  // ==========================

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );


  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");

  };


  return (

    <div className="account-dashboard">


      {/* ==========================
          WELCOME SECTION
      ========================== */}

      <section className="account-header">

        <div className="account-header-content">

          <p className="account-greeting">
            Welcome back,
          </p>

          <h1 className="account-title">
            {user?.name || "User"} 👋
          </h1>

          <p className="account-subtitle">
            Manage your account and
            shopping activity.
          </p>

        </div>


        <button
          type="button"
          className="account-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </section>


      {/* ==========================
          STAT CARDS
      ========================== */}

      <section className="account-stat-section">

        <div className="account-stat-grid">


          {/* CART */}

          <div
            className="account-stat-box"
            onClick={() => navigate("/cart")}
          >

            <div className="account-stat-icon">
              🛒
            </div>

            <div className="account-stat-info">

              <h2>
                {cartCount}
              </h2>

              <p>
                Cart Items
              </p>

            </div>

          </div>


          {/* WISHLIST */}

          <div
            className="account-stat-box"
            onClick={() => navigate("/wishlist")}
          >

            <div className="account-stat-icon">
              ❤️
            </div>

            <div className="account-stat-info">

              <h2>
                {wishlistItems.length}
              </h2>

              <p>
                Wishlist Items
              </p>

            </div>

          </div>


          {/* ACCOUNT */}

          <div className="account-stat-box">

            <div className="account-stat-icon">
              👤
            </div>

            <div className="account-stat-info">

              <h2>
                {user?.role || "User"}
              </h2>

              <p>
                Account Type
              </p>

            </div>

          </div>


        </div>

      </section>


      {/* ==========================
          QUICK ACTIONS
      ========================== */}

      <section className="account-actions">

        <div className="account-section-heading">

          <h2>
            Quick Actions
          </h2>

          <p>
            Quickly access your shopping features
          </p>

        </div>


        <div className="account-action-grid">


          {/* PRODUCTS */}

          <button
            type="button"
            className="account-action-card"
            onClick={() =>
              navigate("/products")
            }
          >

            <span className="account-action-icon">
              🛍️
            </span>

            <strong>
              Browse Products
            </strong>

            <small>
              Explore our products
            </small>

          </button>


          {/* CART */}

          <button
            type="button"
            className="account-action-card"
            onClick={() =>
              navigate("/cart")
            }
          >

            <span className="account-action-icon">
              🛒
            </span>

            <strong>
              My Cart
            </strong>

            <small>
              View your shopping cart
            </small>

          </button>


          {/* WISHLIST */}

          <button
            type="button"
            className="account-action-card"
            onClick={() =>
              navigate("/wishlist")
            }
          >

            <span className="account-action-icon">
              ❤️
            </span>

            <strong>
              My Wishlist
            </strong>

            <small>
              View saved products
            </small>

          </button>


          {/* PROFILE */}

          <button
            type="button"
            className="account-action-card"
            onClick={() =>
              navigate("/profile")
            }
          >

            <span className="account-action-icon">
              👤
            </span>

            <strong>
              My Profile
            </strong>

            <small>
              Manage your account
            </small>

          </button>


        </div>

      </section>


    </div>

  );

}


export default UserDashboard;