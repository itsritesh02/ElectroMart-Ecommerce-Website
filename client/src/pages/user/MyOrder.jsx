import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

import "./MyOrder.css";


function MyOrders() {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // ==========================================
  // GET MY ORDERS
  // ==========================================

  const getMyOrders = async () => {

    try {

      setLoading(true);


      const res =
        await api.get(
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


      Swal.fire({

        icon: "error",

        title: "Failed",

        text:
          error.response?.data?.message ||
          "Failed to load orders",

        confirmButtonText: "OK",

      });


    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    getMyOrders();

  }, []);


  // ==========================================
  // CANCEL ORDER
  // ==========================================

  const handleCancelOrder = async (
    order
  ) => {

    const result =
      await Swal.fire({

        icon: "warning",

        title: "Cancel Order?",

        html: `
          <p>
            Are you sure you want to cancel
            <strong>${order.items?.length || 0}</strong>
            product(s)?
          </p>
        `,

        showCancelButton: true,

        confirmButtonText:
          "Yes, Cancel Order",

        cancelButtonText:
          "Keep Order",

        confirmButtonColor:
          "#dc2626",

        cancelButtonColor:
          "#6b7280",

        reverseButtons: true,

      });


    if (
      !result.isConfirmed
    ) {

      return;

    }


    try {

      const res =
        await api.put(
          `/orders/my-orders/${order._id}/cancel`
        );


      console.log(
        "ORDER CANCELLED:",
        res.data
      );


      // ==========================================
      // UPDATE LOCAL ORDER
      // ==========================================

      setOrders((prevOrders) =>

        prevOrders.map(
          (item) =>

            item._id === order._id

              ? {
                ...item,

                orderStatus:
                  "Cancelled",

              }

              : item
        )

      );


      Swal.fire({

        icon: "success",

        title:
          "Order Cancelled",

        text:
          "Your order has been cancelled successfully.",

        confirmButtonText:
          "OK",

        confirmButtonColor:
          "#111827",

      });


    } catch (error) {

      console.error(
        "Cancel Order Error:",
        error
      );


      Swal.fire({

        icon: "error",

        title:
          "Cancellation Failed",

        text:
          error.response?.data?.message ||
          "Unable to cancel order.",

        confirmButtonText:
          "Try Again",

        confirmButtonColor:
          "#dc2626",

      });

    }

  };


  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (
    date
  ) => {

    if (!date) {

      return "N/A";

    }


    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  };


  // ==========================================
  // FORMAT TIME
  // ==========================================

  const formatTime = (
    date
  ) => {

    if (!date) {

      return "N/A";

    }


    return new Date(
      date
    ).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="my-orders-loading">

        <h2>
          Loading Orders...
        </h2>

      </div>

    );

  }


  // ==========================================
  // EMPTY
  // ==========================================

  if (
    orders.length === 0
  ) {

    return (

      <div className="my-orders-empty">

        <h1>
          No Orders Yet
        </h1>

        <p>
          You haven't placed any orders yet.
        </p>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="my-orders-page">


      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="my-orders-header">

        <div>

          <h1>
            My Orders
          </h1>

          <p>
            Track and manage your orders
          </p>

        </div>


        <div className="orders-total-count">

          Total Orders:

          <strong>
            {orders.length}
          </strong>

        </div>

      </div>


      {/* ==========================================
          ORDERS
      ========================================== */}

      <div className="my-orders-list">

        {orders.map(
          (order) => (

            <div
              className="my-order-card"
              key={order._id}
            >


              {/* ==========================================
                  ORDER HEADER
              ========================================== */}

              <div className="my-order-top">

                <div>

                  <span>
                    Order ID
                  </span>

                  <strong>
                    #{order._id.slice(-10)}
                  </strong>

                </div>


                <div>

                  <span>
                    Ordered On
                  </span>

                  <strong>
                    {formatDate(
                      order.createdAt
                    )}
                  </strong>

                  <small>
                    {formatTime(
                      order.createdAt
                    )}
                  </small>

                </div>


                <div>

                  <span>
                    Order Status
                  </span>

                  <strong
                    className={
                      `order-status status-${(
                        order.orderStatus ||
                        "Pending"
                      ).toLowerCase()}`
                    }
                  >

                    {order.orderStatus ||
                      "Pending"}

                  </strong>

                </div>

              </div>


              {/* ==========================================
                  PRODUCTS
              ========================================== */}

              <div className="my-order-products">

                {order.items?.map(
                  (item, index) => (

                    <div
                      className="my-order-product"
                      key={
                        item.product ||
                        index
                      }
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />


                      <div className="my-order-product-info">

                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          Price: ₹
                          {Number(
                            item.price || 0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                        <p>
                          Quantity:{" "}
                          {item.quantity}
                        </p>

                      </div>


                      <strong>

                        ₹
                        {(
                          Number(
                            item.price || 0
                          ) *
                          Number(
                            item.quantity || 0
                          )
                        ).toLocaleString(
                          "en-IN"
                        )}

                      </strong>

                    </div>

                  )
                )}

              </div>


              {/* ==========================================
                  BOTTOM
              ========================================== */}

              <div className="my-order-bottom">


                <div className="my-order-payment">

                  <span>
                    Payment
                  </span>

                  <strong>

                    {order.paymentMethod ===
                      "razorpay"

                      ? "Online Payment"

                      : "Cash on Delivery"}

                  </strong>


                  <span>
                    Payment Status
                  </span>

                  <strong
                    className={
                      `payment-status payment-${(
                        order.paymentStatus ||
                        "Pending"
                      ).toLowerCase()}`
                    }
                  >

                    {order.paymentStatus ||
                      "Pending"}

                  </strong>

                </div>


                {/* TOTAL */}

                <div className="my-order-total">

                  <span>
                    Total Amount
                  </span>

                  <strong>

                    ₹
                    {Number(
                      order.totalAmount || 0
                    ).toLocaleString(
                      "en-IN"
                    )}

                  </strong>

                </div>


                {/* CANCEL BUTTON */}

                {(
                  order.orderStatus ===
                  "Pending" ||

                  order.orderStatus ===
                  "Processing"

                ) && (

                    <button
                      type="button"
                      className="cancel-order-btn"
                      onClick={() =>
                        handleCancelOrder(
                          order
                        )
                      }
                    >

                      Cancel Order

                    </button>

                  )}


                {/* CANCELLED */}

                {order.orderStatus ===
                  "Cancelled" && (

                    <span className="cancelled-label">

                      Order Cancelled

                    </span>

                  )}

              </div>

            </div>

          )
        )}

      </div>

    </div>

  );

}


export default MyOrders;