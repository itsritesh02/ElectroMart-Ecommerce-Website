import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/slice/authSlice.js";

import "./AdminDashBoard.css"

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const wishlistItems = useSelector(
    (state) => state.wishlist?.items || []
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="admin-dashboard">

      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-dashboard-header">

        <div>
          <p className="admin-welcome-text">
            Admin Panel
          </p>

          <h1>
            Welcome, {user?.name || "Admin"} 👋
          </h1>

          <p className="admin-description">
            Manage your ElectroMart store from here.
          </p>
        </div>

        <button
          type="button"
          className="admin-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* =========================
          STATS
      ========================= */}

      <div className="admin-stats">

        {/* Products */}

        <div
          className="admin-stat-card"
          onClick={() => navigate("/admin/products")}
        >
          <div className="admin-stat-icon">
            📦
          </div>

          <div>
            <h2>Products</h2>

            <p>
              Manage Products
            </p>
          </div>
        </div>


        {/* Users */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            👥
          </div>

          <div>
            <h2>Users</h2>

            <p>
              Manage Customers
            </p>
          </div>

        </div>


        {/* Orders */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            🛒
          </div>

          <div>
            <h2>Orders</h2>

            <p>
              Manage Orders
            </p>
          </div>

        </div>


        {/* Wishlist */}

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
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

      </div>


      {/* =========================
          QUICK ACTIONS
      ========================= */}

      <div className="admin-quick-actions">

        <h2>
          Quick Actions
        </h2>


        <div className="admin-actions-grid">

          {/* Add Product */}

          <button
            type="button"
            onClick={() =>
              navigate("/admin/products/add")
            }
          >
            <span>
              ➕
            </span>

            <strong>
              Add Product
            </strong>

            <small>
              Add a new product
            </small>
          </button>


          {/* Manage Products */}

          <button
            type="button"
            onClick={() =>
              navigate("/admin/products")
            }
          >
            <span>
              📦
            </span>

            <strong>
              Manage Products
            </strong>

            <small>
              View and edit products
            </small>
          </button>


          {/* View Store */}

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
              View Store
            </strong>

            <small>
              Open customer store
            </small>
          </button>


          {/* Profile */}

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
              View your profile
            </small>
          </button>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;