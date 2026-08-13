import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./MyOrder.css"


function MyOrders() {

  // ==========================
  // ORDERS STATE
  // ==========================

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);


  // ==========================
  // GET MY ORDERS
  // ==========================

  useEffect(() => {

    const getMyOrders = async () => {

      try {

        const res = await api.get(
          "/orders/my-orders"
        );

        console.log(
          "MY ORDERS:",
          res.data
        );

        setOrders(
          res.data.orders || []
        );

      } catch (error) {

        console.error(
          "Get My Orders Error:",
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


    getMyOrders();

  }, []);


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <div className="my-orders-page">

        <h2>
          Loading orders...
        </h2>

      </div>

    );

  }


  // ==========================
  // NO ORDERS
  // ==========================

  if (orders.length === 0) {

    return (

      <div className="my-orders-page">

        <div className="no-orders">

          <h1>
            No Orders Found
          </h1>

          <p>
            You haven't placed any orders yet.
          </p>

          <Link
            to="/products"
            className="shop-now-btn"
          >
            Start Shopping
          </Link>

        </div>

      </div>

    );

  }


  return (

    <div className="my-orders-page">


      {/* ==========================
          PAGE HEADER
      ========================== */}

      <div className="orders-header">

        <h1>
          My Orders
        </h1>

        <p>
          View all your orders
        </p>

      </div>


      {/* ==========================
          ORDERS
      ========================== */}

      <div className="orders-list">

        {orders.map((order) => (

          <div
            className="order-card"
            key={order._id}
          >


            {/* ==========================
                ORDER HEADER
            ========================== */}

            <div className="order-card-header">

              <div>

                <span>
                  Order ID
                </span>

                <strong>
                  {order._id}
                </strong>

              </div>


              <div>

                <span>
                  Order Date
                </span>

                <strong>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </strong>

              </div>

            </div>


            {/* ==========================
                ORDER ITEMS
            ========================== */}

            <div className="order-items">

              {order.items.map((item, index) => (

                <div
                  className="order-item"
                  key={index}
                >

                  <img
                    src={item.image}
                    alt={item.name}
                  />


                  <div className="order-item-info">

                    <h3>
                      {item.name}
                    </h3>

                    <p>
                      ₹{item.price}
                    </p>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                  </div>


                  <strong>
                    ₹{item.price * item.quantity}
                  </strong>

                </div>

              ))}

            </div>


            {/* ==========================
                ORDER FOOTER
            ========================== */}

            <div className="order-card-footer">


              <div>

                <span>
                  Payment
                </span>

                <strong>
                  {order.paymentMethod}
                </strong>

              </div>


              <div>

                <span>
                  Status
                </span>

                <strong
                  className={`status-${order.orderStatus.toLowerCase()}`}
                >
                  {order.orderStatus}
                </strong>

              </div>


              <div>

                <span>
                  Total
                </span>

                <strong>
                  ₹{order.totalAmount}
                </strong>

              </div>


              <Link
                to={`/order-success/${order._id}`}
                className="view-order-btn"
              >
                View Order
              </Link>

            </div>


          </div>

        ))}

      </div>

    </div>

  );

}


export default MyOrders;