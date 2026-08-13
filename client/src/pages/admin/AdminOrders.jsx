import { useEffect, useState } from "react";

import api from "../../services/api";

import "./AdminOrders.css";


function AdminOrders() {

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
          "ADMIN ORDERS:",
          res.data
        );


        setOrders(
          res.data.orders || []
        );


      } catch (error) {

        console.error(
          "Get Admin Orders Error:",
          error
        );


        alert(
          error.response?.data?.message ||
          "Failed to load orders"
        );


      } finally {

        setLoading(false);

      }

    };


    getOrders();

  }, []);


  // ==========================
  // UPDATE ORDER STATUS
  // ==========================

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {

    try {

      const res = await api.put(
        `/admin/orders/${orderId}/status`,
        {
          orderStatus: newStatus,
        }
      );


      console.log(
        "STATUS UPDATED:",
        res.data
      );


      // ==========================
      // UPDATE UI
      // ==========================

      setOrders((prevOrders) => {

        return prevOrders.map(
          (order) => {

            if (order._id === orderId) {

              return {
                ...order,
                orderStatus: newStatus,
              };

            }

            return order;

          }
        );

      });


      alert(
        "Order status updated successfully"
      );


    } catch (error) {

      console.error(
        "Update Order Status Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to update order status"
      );

    }

  };


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <div className="admin-orders">

        <h2>
          Loading orders...
        </h2>

      </div>

    );

  }


  // ==========================
  // PAGE
  // ==========================

  return (

    <div className="admin-orders">


      {/* ==========================
          HEADER
      ========================== */}

      <div className="orders-header">

        <div>

          <h1>
            Orders
          </h1>

          <p>
            Manage customer orders
          </p>

        </div>


        <div className="orders-count">

          Total Orders:

          <strong>
            {orders.length}
          </strong>

        </div>

      </div>


      {/* ==========================
          NO ORDERS
      ========================== */}

      {orders.length === 0 ? (

        <div className="no-orders">

          <h2>
            No Orders Found
          </h2>

          <p>
            No customer orders are available.
          </p>

        </div>

      ) : (

        <div className="orders-table-container">

          <table className="orders-table">

            <thead>

              <tr>

                <th>
                  Order ID
                </th>

                <th>
                  Customer
                </th>

                <th>
                  Items
                </th>

                <th>
                  Total
                </th>

                <th>
                  Payment
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

              {orders.map((order) => (

                <tr
                  key={order._id}
                >

                  {/* ORDER ID */}

                  <td>

                    <span className="order-id">

                      {order._id}

                    </span>

                  </td>


                  {/* CUSTOMER */}

                  <td>

                    <div className="customer-info">

                      <strong>

                        {order.user?.name ||
                          "Unknown User"}

                      </strong>

                      <span>

                        {order.user?.email ||
                          "No email"}

                      </span>

                    </div>

                  </td>


                  {/* ITEMS */}

                  <td>

                    {order.items?.length || 0}

                  </td>


                  {/* TOTAL */}

                  <td>

                    <strong>

                      ₹{order.totalAmount}

                    </strong>

                  </td>


                  {/* PAYMENT */}

                  <td>

                    <span className="payment-method">

                      {order.paymentMethod}

                    </span>

                  </td>


                  {/* STATUS */}

                  <td>

                    <select
                      value={
                        order.orderStatus
                      }
                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }
                      className={`status-select status-${order.orderStatus.toLowerCase()}`}
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Processing">
                        Processing
                      </option>

                      <option value="Shipped">
                        Shipped
                      </option>

                      <option value="Delivered">
                        Delivered
                      </option>

                      <option value="Cancelled">
                        Cancelled
                      </option>

                    </select>

                  </td>


                  {/* DATE */}

                  <td>

                    {order.createdAt
                      ? new Date(
                        order.createdAt
                      ).toLocaleDateString()
                      : "N/A"}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}


export default AdminOrders;