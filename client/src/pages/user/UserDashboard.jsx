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

    <div className="user-dashboard">


      {/* ==========================
          WELCOME SECTION
      ========================== */}

      <div className="dashboard-welcome">

        <div>

          <p className="welcome-text">
            Welcome back,
          </p>

          <h1>
            {user?.name || "User"} 👋
          </h1>

          <p className="welcome-description">
            Manage your account and
            shopping activity.
          </p>

        </div>


        <button
          type="button"
          className="dashboard-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* ==========================
          STAT CARDS
      ========================== */}

      <div className="dashboard-stats">


        {/* CART */}

        <div
          className="dashboard-stat-card"
          onClick={() => navigate("/cart")}
        >

          <div className="stat-icon">
            🛒
          </div>

          <div>

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
          className="dashboard-stat-card"
          onClick={() => navigate("/wishlist")}
        >

          <div className="stat-icon">
            ❤️
          </div>

          <div>

            <h2>
              {wishlistItems.length}
            </h2>

            <p>
              Wishlist Items
            </p>

          </div>

        </div>


        {/* ACCOUNT */}

        <div className="dashboard-stat-card">

          <div className="stat-icon">
            👤
          </div>

          <div>

            <h2>
              {user?.role || "User"}
            </h2>

            <p>
              Account Type
            </p>

          </div>

        </div>


      </div>


      {/* ==========================
          QUICK ACTIONS
      ========================== */}

      <div className="quick-actions">


        <h2>
          Quick Actions
        </h2>


        <div className="quick-actions-grid">


          {/* PRODUCTS */}

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >

            <span>
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
            onClick={() =>
              navigate("/cart")
            }
          >

            <span>
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
            onClick={() =>
              navigate("/wishlist")
            }
          >

            <span>
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
            onClick={() =>
              navigate("/profile")
            }
          >

            <span>
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

      </div>


    </div>

  );

}


export default UserDashboard;