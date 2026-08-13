
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/slice/authSlice.js";

import "./AdminDashBoard.css";


function AdminDashboard() {

  const dispatch = useDispatch();

  const navigate = useNavigate();


  // ==========================
  // GET ADMIN USER
  // ==========================

  const { user } = useSelector(
    (state) => state.auth
  );


  // ==========================
  // LOGOUT
  // ==========================

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


        {/* =========================
            PRODUCTS
        ========================= */}

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

            <h2>
              Products
            </h2>

            <p>
              Manage Products
            </p>

          </div>

        </div>


        {/* =========================
            USERS
        ========================= */}

        <div
          className="admin-stat-card"
        >

          <div className="admin-stat-icon">
            👥
          </div>

          <div>

            <h2>
              Users
            </h2>

            <p>
              Manage Customers
            </p>

          </div>

        </div>


        {/* =========================
            ORDERS
        ========================= */}

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

            <h2>
              Orders
            </h2>

            <p>
              Manage Orders
            </p>

          </div>

        </div>


        {/* =========================
            PROFILE
        ========================= */}

        <div
          className="admin-stat-card"
          onClick={() =>
            navigate("/profile")
          }
        >

          <div className="admin-stat-icon">
            👤
          </div>

          <div>

            <h2>
              Profile
            </h2>

            <p>
              Manage Profile
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


          {/* =========================
              ADD PRODUCT
          ========================= */}

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


          {/* =========================
              MANAGE PRODUCTS
          ========================= */}

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


          {/* =========================
              MANAGE ORDERS
          ========================= */}

          <button
            type="button"
            onClick={() =>
              navigate("/admin/orders")
            }
          >

            <span>
              🛒
            </span>

            <strong>
              Manage Orders
            </strong>

            <small>
              View and update orders
            </small>

          </button>


          {/* =========================
              VIEW STORE
          ========================= */}

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


        </div>

      </div>


    </div>

  );

}


export default AdminDashboard;

