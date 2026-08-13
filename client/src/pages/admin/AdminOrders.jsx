```jsx
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import "./AdminDashboard.css";


function AdminDashboard() {

  // ==========================
  // GET USER FROM REDUX
  // ==========================

  const { user } = useSelector(
    (state) => state.auth
  );


  return (

    <div className="admin-dashboard">


      {/* ==========================
          HEADER
      ========================== */}

      <div className="dashboard-header">

        <div>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Welcome back, {user?.name || "Admin"}
          </p>

        </div>

      </div>


      {/* ==========================
          DASHBOARD CARDS
      ========================== */}

      <div className="dashboard-cards">


        {/* ==========================
            PRODUCTS
        ========================== */}

        <Link
          to="/admin/products"
          className="dashboard-card"
        >

          <div className="card-icon">
            📦
          </div>

          <div className="card-content">

            <h2>
              Products
            </h2>

            <p>
              Manage store products
            </p>

          </div>

        </Link>


        {/* ==========================
            ADD PRODUCT
        ========================== */}

        <Link
          to="/admin/products/add"
          className="dashboard-card"
        >

          <div className="card-icon">
            ➕
          </div>

          <div className="card-content">

            <h2>
              Add Product
            </h2>

            <p>
              Add a new product
            </p>

          </div>

        </Link>


        {/* ==========================
            ORDERS
        ========================== */}

        <Link
          to="/admin/orders"
          className="dashboard-card"
        >

          <div className="card-icon">
            🛒
          </div>

          <div className="card-content">

            <h2>
              Orders
            </h2>

            <p>
              Manage customer orders
            </p>

          </div>

        </Link>


      </div>


      {/* ==========================
          QUICK ACTIONS
      ========================== */}

      <div className="quick-actions">

        <h2>
          Quick Actions
        </h2>


        <div className="quick-action-buttons">

          <Link
            to="/admin/products"
            className="quick-btn"
          >
            Manage Products
          </Link>


          <Link
            to="/admin/products/add"
            className="quick-btn"
          >
            Add Product
          </Link>


          <Link
            to="/admin/orders"
            className="quick-btn"
          >
            Manage Orders
          </Link>

        </div>

      </div>


    </div>

  );

}


export default AdminDashboard;
```
