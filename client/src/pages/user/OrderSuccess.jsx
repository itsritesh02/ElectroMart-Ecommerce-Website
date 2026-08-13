import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import api from "../../services/api";

import "./OrderSuccess.css";


function OrderSuccess() {

  const { id } = useParams();


  // ==========================
  // ORDER STATE
  // ==========================

  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);


  // ==========================
  // GET SINGLE ORDER
  // ==========================

  useEffect(() => {

    const getOrder = async () => {

      try {

        const res = await api.get(
          `/orders/${id}`
        );


        console.log(
          "ORDER:",
          res.data
        );


        setOrder(
          res.data.order
        );

      } catch (error) {

        console.error(
          "Get Order Error:",
          error
        );


        alert(
          error.response?.data?.message ||
          "Failed to load order"
        );

      } finally {

        setLoading(false);

      }

    };


    if (id) {
      getOrder();
    }

  }, [id]);


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <div className="order-success-page">

        <h2>
          Loading order...
        </h2>

      </div>

    );

  }


  // ==========================
  // ORDER NOT FOUND
  // ==========================

  if (!order) {

    return (

      <div className="order-success-page">

        <div className="order-not-found">

          <h1>
            Order Not Found
          </h1>

          <p>
            We couldn't find this order.
          </p>

          <Link
            to="/my-orders"
            className="back-orders-btn"
          >
            My Orders
          </Link>

        </div>

      </div>

    );

  }


  return (

    <div className="order-success-page">


      {/* ==========================
          SUCCESS MESSAGE
      ========================== */}

      <div className="success-header">

        <div className="success-icon">
          ✓
        </div>

        <h1>
          Order Placed Successfully!
        </h1>

        <p>
          Thank you for your purchase.
        </p>

      </div>


      {/* ==========================
          ORDER INFORMATION
      ========================== */}

      <div className="order-info-card">

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


        <div>

          <span>
            Order Status
          </span>

          <strong
            className={`status-${order.orderStatus.toLowerCase()}`}
          >
            {order.orderStatus}
          </strong>

        </div>


        <div>

          <span>
            Payment
          </span>

          <strong>
            {order.paymentMethod}
          </strong>

        </div>

      </div>


      {/* ==========================
          ORDER ITEMS
      ========================== */}

      <div className="order-details-card">

        <h2>
          Order Items
        </h2>


        <div className="order-success-items">

          {order.items.map((item, index) => (

            <div
              className="order-success-item"
              key={index}
            >


              <img
                src={item.image}
                alt={item.name}
              />


              <div className="success-item-info">

                <h3>
                  {item.name}
                </h3>

                <p>
                  ₹{item.price}
                </p>

                <span>
                  Quantity: {item.quantity}
                </span>

              </div>


              <strong>

                ₹
                {item.price *
                  item.quantity}

              </strong>

            </div>

          ))}

        </div>

      </div>


      {/* ==========================
          SHIPPING ADDRESS
      ========================== */}

      <div className="shipping-card">

        <h2>
          Shipping Address
        </h2>


        <p>
          <strong>
            {order.shippingAddress.fullName}
          </strong>
        </p>

        <p>
          {order.shippingAddress.address}
        </p>

        <p>
          {order.shippingAddress.city} -{" "}
          {order.shippingAddress.pincode}
        </p>

        <p>
          Phone:{" "}
          {order.shippingAddress.phone}
        </p>

        <p>
          Email:{" "}
          {order.shippingAddress.email}
        </p>

      </div>


      {/* ==========================
          TOTAL
      ========================== */}

      <div className="order-total-card">

        <span>
          Total Amount
        </span>

        <strong>
          ₹{order.totalAmount}
        </strong>

      </div>


      {/* ==========================
          BUTTONS
      ========================== */}

      <div className="order-actions">

        <Link
          to="/my-orders"
          className="my-orders-btn"
        >
          My Orders
        </Link>


        <Link
          to="/products"
          className="continue-shopping-btn"
        >
          Continue Shopping
        </Link>

      </div>

    </div>

  );

}


export default OrderSuccess;