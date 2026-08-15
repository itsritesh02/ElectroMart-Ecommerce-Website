
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/slice/authSlice.js";

import "./AdminDashBoard.css";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state) => state.auth
  );

  const wishlistItems = useSelector(
    (state) =>
      state.wishlist?.items || []
  );

  const handleLogout = () => {
    dispatch(logout());

    navigate("/login");
  };

  return (
    <div className="admin-dashboard">

      <div className="admin-dashboard-header">
        <div>
          <p className="admin-welcome-text">
            Admin Panel
          </p>

          <h1>
            Welcome,{" "}
            {user?.name || "Admin"} 👋
          </h1>

          <p className="admin-description">
            Manage your ElectroMart store
            from here.
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

      <div className="admin-stats">

        <div
          className="admin-stat-card"
          onClick={() =>
            navigate("/admin/products")
          }
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

        <div
          className="admin-stat-card"
          onClick={() =>
            navigate("/admin/users")
          }
        >
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

        <div
          className="admin-stat-card"
          onClick={() =>
            navigate("/admin/orders")
          }
        >
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

      <div className="admin-quick-actions">

        <h2>
          Quick Actions
        </h2>

        <div className="admin-actions-grid">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/products/add"
              )
            }
          >
            <span>➕</span>

            <strong>
              Add Product
            </strong>

            <small>
              Add a new product
            </small>
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
          >
            <span>📦</span>

            <strong>
              Manage Products
            </strong>

            <small>
              View and edit products
            </small>
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/orders"
              )
            }
          >
            <span>🛒</span>

            <strong>
              Manage Orders
            </strong>

            <small>
              View and update orders
            </small>
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            <span>🛍️</span>

            <strong>
              View Store
            </strong>

            <small>
              Open customer store
            </small>
          </button>

          <button
            type="button"
            onClick={() =>
              navigate("/profile")
            }
          >
            <span>👤</span>

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
