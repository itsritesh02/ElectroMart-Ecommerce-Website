import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import api from "../../services/api";

import "./AdminOrderDetails.css";

function AdminOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // ==========================
  // GET ORDER
  // ==========================

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await api.get(
          `/admin/orders/${id}`
        );

        console.log(
          "ADMIN ORDER:",
          res.data
        );

        setOrder(res.data.order);
      } catch (error) {
        console.error(
          "Get Admin Order Error:",
          error
        );

        await Swal.fire({
          icon: "error",
          title: "Failed",
          text:
            error.response?.data?.message ||
            "Failed to load order",
          confirmButtonText: "OK",
        });
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
      <div className="admin-order-details">
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
      <div className="admin-order-details">
        <div className="order-not-found">
          <h1>
            Order Not Found
          </h1>

          <p>
            This order could not be found.
          </p>

          <Link
            to="/admin/orders"
            className="back-orders-btn"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-order-details">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="order-details-header">

        <div>
          <h1>
            Order Details
          </h1>

          <p>
            Order ID: {order._id}
          </p>
        </div>

        <Link
          to="/admin/orders"
          className="back-orders-btn"
        >
          ← Back to Orders
        </Link>

      </div>

      {/* ==========================
          ORDER SUMMARY
      ========================== */}

      <div className="order-summary-card">

        <div>
          <span>
            Order Date
          </span>

          <strong>
            {order.createdAt
              ? new Date(
                order.createdAt
              ).toLocaleDateString()
              : "N/A"}
          </strong>
        </div>

        <div>
          <span>
            Order Status
          </span>

          <strong
            className={`status-${(
              order.orderStatus ||
              "Pending"
            ).toLowerCase()}`}
          >
            {order.orderStatus || "Pending"}
          </strong>
        </div>

        <div>
          <span>
            Payment Method
          </span>

          <strong>
            {order.paymentMethod ||
              "N/A"}
          </strong>
        </div>

        <div>
          <span>
            Payment Status
          </span>

          <strong
            className={`payment-${(
              order.paymentStatus ||
              "Pending"
            ).toLowerCase()}`}
          >
            {order.paymentStatus ||
              "Pending"}
          </strong>
        </div>

      </div>

      {/* ==========================
          CUSTOMER
      ========================== */}

      <div className="details-card">

        <h2>
          Customer Information
        </h2>

        <div className="customer-details">

          <div>
            <span>
              Name
            </span>

            <strong>
              {order.user?.name ||
                "Unknown User"}
            </strong>
          </div>

          <div>
            <span>
              Email
            </span>

            <strong>
              {order.user?.email ||
                "No email"}
            </strong>
          </div>

        </div>

      </div>

      {/* ==========================
          ORDER ITEMS
      ========================== */}

      <div className="details-card">

        <h2>
          Order Items
        </h2>

        <div className="admin-order-items">

          {order.items?.map(
            (item, index) => (
              <div
                className="admin-order-item"
                key={index}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="admin-item-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    Price: ₹{item.price}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                </div>

                <strong>
                  ₹
                  {Number(item.price) *
                    Number(item.quantity)}
                </strong>

              </div>
            )
          )}

        </div>

        {/* TOTAL */}

        <div className="order-total">

          <span>
            Total Amount
          </span>

          <strong>
            ₹{order.totalAmount}
          </strong>

        </div>

      </div>

      {/* ==========================
          SHIPPING ADDRESS
      ========================== */}

      <div className="details-card">

        <h2>
          Shipping Address
        </h2>

        <div className="shipping-details">

          <p>
            <strong>
              {order.shippingAddress
                ?.fullName ||
                "N/A"}
            </strong>
          </p>

          <p>
            {order.shippingAddress
              ?.address ||
              "N/A"}
          </p>

          <p>
            {order.shippingAddress
              ?.city ||
              "N/A"}

            {" - "}

            {order.shippingAddress
              ?.pincode ||
              "N/A"}
          </p>

          <p>
            Phone:{" "}
            {order.shippingAddress
              ?.phone ||
              "N/A"}
          </p>

          <p>
            Email:{" "}
            {order.shippingAddress
              ?.email ||
              "N/A"}
          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminOrderDetails;