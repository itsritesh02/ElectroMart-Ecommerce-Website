
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { logout } from "../../redux/slice/authSlice.js";

import "./AdminDashBoard.css";

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ==========================
  // GET USER
  // ==========================

  const { user } = useSelector(
    (state) => state.auth
  );

  // ==========================
  // GET WISHLIST
  // ==========================

  const wishlistItems = useSelector(
    (state) =>
      state.wishlist?.items || []
  );

  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      dispatch(logout());

      await Swal.fire({
        title: "Logged Out",
        text: "You have been logged out successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#111827",
      });

      navigate("/login");
    }
  };

  return (
    <div className="admin-dashboard">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="admin-header">

        <div className="admin-header-content">

          <span className="admin-badge">
            ADMIN DASHBOARD
          </span>

          <h1>
            Welcome back,{" "}
            <span>
              {user?.name || "Admin"}
            </span>{" "}
            
          </h1>

          <p>
            Manage your ElectroMart store
            from one place.
          </p>

        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* ==========================
          QUICK ACTIONS
      ========================== */}

      <div className="quick-actions-section">

        {/* SECTION HEADER */}

        <div className="section-heading">

          <div>

            <span>
              QUICK ACTIONS
            </span>

            <h2>
              Store Management
            </h2>

          </div>

          <p>
            Quickly access important sections
          </p>

        </div>


        {/* ==========================
            QUICK ACTIONS GRID
        ========================== */}

        <div className="quick-actions-grid">


          {/* ADD PRODUCT */}

          <button
            type="button"
            className="quick-action"
            onClick={() =>
              navigate("/admin/products/add")
            }
          >

            <div className="quick-icon">
              ➕
            </div>

            <div>

              <h3>
                Add Product
              </h3>

              <p>
                Add a new product to your store
              </p>

            </div>

            <span>
              →
            </span>

          </button>


          {/* MANAGE PRODUCTS */}

          <button
            type="button"
            className="quick-action"
            onClick={() =>
              navigate("/admin/products")
            }
          >

            <div className="quick-icon">
              📦
            </div>

            <div>

              <h3>
                Manage Products
              </h3>

              <p>
                Edit or delete existing products
              </p>

            </div>

            <span>
              →
            </span>

          </button>


          {/* MANAGE USERS */}

          <button
            type="button"
            className="quick-action"
            onClick={() =>
              navigate("/admin/users")
            }
          >

            <div className="quick-icon">
              👥
            </div>

            <div>

              <h3>
                Manage Users
              </h3>

              <p>
                View and manage customers
              </p>

            </div>

            <span>
              →
            </span>

          </button>


          {/* MANAGE ORDERS */}

          <button
            type="button"
            className="quick-action"
            onClick={() =>
              navigate("/admin/orders")
            }
          >

            <div className="quick-icon">
              🛒
            </div>

            <div>

              <h3>
                Manage Orders
              </h3>

              <p>
                Track and update customer orders
              </p>

            </div>

            <span>
              →
            </span>

          </button>


          {/* WISHLIST */}

          <button
            type="button"
            className="quick-action"
            onClick={() =>
              navigate("/wishlist")
            }
          >

            <div className="quick-icon">
              ❤️
            </div>

            <div>

              <h3>
                Wishlist
              </h3>

              <p>
                {wishlistItems.length} wishlist{" "}
                {wishlistItems.length === 1
                  ? "item"
                  : "items"}
              </p>

            </div>

            <span>
              →
            </span>

          </button>


          {/* VIEW STORE */}

          <button
            type="button"
            className="quick-action"
            onClick={() =>
              navigate("/products")
            }
          >

            <div className="quick-icon">
              🛍️
            </div>

            <div>

              <h3>
                View Store
              </h3>

              <p>
                Open the customer store
              </p>

            </div>

            <span>
              →
            </span>

          </button>


          {/* MY PROFILE */}

          <button
            type="button"
            className="quick-action"
            onClick={() =>
              navigate("/profile")
            }
          >

            <div className="quick-icon">
              👤
            </div>

            <div>

              <h3>
                My Profile
              </h3>

              <p>
                View your account profile
              </p>

            </div>

            <span>
              →
            </span>

          </button>


        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;
