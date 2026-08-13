
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./AdminDashboard.css";


function AdminDashboard() {

  // ==========================
  // ORDERS STATE
  // ==========================

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);


  // ==========================
  // GET ORDERS
  // ==========================

  useEffect(() => {

    const getOrders = async () => {

      try {

        const res = await api.get(
          "/admin/orders"
        );

        console.log(
          "DASHBOARD ORDERS:",
          res.data
        );

        setOrders(
          res.data.orders || []
        );

      } catch (error) {

        console.error(
          "Dashboard Orders Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    getOrders();

  }, []);


  // ==========================
  // CALCULATE DATA
  // ==========================

  const totalOrders = orders.length;


  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus === "Pending"
  ).length;


  const deliveredOrders = orders.filter(
    (order) =>
      order.orderStatus === "Delivered"
  ).length;


  const totalSales = orders
    .filter(
      (order) =>
        order.orderStatus !== "Cancelled"
    )
    .reduce(
      (total, order) =>
        total + Number(order.totalAmount || 0),
      0
    );


  // ==========================
  // RECENT ORDERS
  // ==========================

  const recentOrders =
    orders.slice(0, 5);


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
            Manage your ElectroMart store
          </p>

        </div>

      </div>


      {/* ==========================
          LOADING
      ========================== */}

      {loading ? (

        <div className="dashboard-loading">

          <h2>
            Loading dashboard...
          </h2>

        </div>

      ) : (

        <>


          {/* ==========================
              STAT CARDS
          ========================== */}

          <div className="dashboard-stats">


            {/* TOTAL ORDERS */}

            <div className="stat-card">

              <span>
                Total Orders
              </span>

              <strong>
                {totalOrders}
              </strong>

            </div>


            {/* PENDING */}

            <div className="stat-card">

              <span>
                Pending Orders
              </span>

              <strong>
                {pendingOrders}
              </strong>

            </div>


            {/* DELIVERED */}

            <div className="stat-card">

              <span>
                Delivered Orders
              </span>

              <strong>
                {deliveredOrders}
              </strong>

            </div>


            {/* SALES */}

            <div className="stat-card">

              <span>
                Total Sales
              </span>

              <strong>
                ₹{totalSales}
              </strong>

            </div>


          </div>


          {/* ==========================
              RECENT ORDERS
          ========================== */}

          <div className="recent-orders-card">


            <div className="recent-orders-header">

              <div>

                <h2>
                  Recent Orders
                </h2>

                <p>
                  Latest customer orders
                </p>

              </div>


              <Link
                to="/admin/orders"
                className="view-all-btn"
              >
                View All
              </Link>

            </div>


            {/* ==========================
                NO ORDERS
            ========================== */}

            {recentOrders.length === 0 ? (

              <div className="no-dashboard-orders">

                <p>
                  No orders found.
                </p>

              </div>

            ) : (

              <div className="recent-orders-table-container">

                <table className="recent-orders-table">

                  <thead>

                    <tr>

                      <th>
                        Order ID
                      </th>

                      <th>
                        Customer
                      </th>

                      <th>
                        Total
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Date
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {recentOrders.map(
                      (order) => (

                        <tr
                          key={order._id}
                        >

                          <td>

                            <span className="dashboard-order-id">

                              {order._id}

                            </span>

                          </td>


                          <td>

                            <div className="dashboard-customer">

                              <strong>

                                {order.user?.name ||
                                  "Unknown"}

                              </strong>

                              <span>

                                {order.user?.email ||
                                  "No email"}

                              </span>

                            </div>

                          </td>


                          <td>

                            <strong>

                              ₹{order.totalAmount}

                            </strong>

                          </td>


                          <td>

                            <span
                              className={`dashboard - status status - ${ order.orderStatus.toLowerCase() } `}
                            >
                              {order.orderStatus}
                            </span>

                          </td>


                          <td>

                            {order.createdAt
                              ? new Date(
                                  order.createdAt
                                ).toLocaleDateString()
                              : "N/A"}

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>


        </>

      )}

    </div>

  );

}


export default AdminDashboard;
