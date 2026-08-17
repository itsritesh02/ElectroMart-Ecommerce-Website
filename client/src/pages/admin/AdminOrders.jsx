import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

import "./AdminOrders.css";


function AdminOrders() {

  // ==========================
  // ORDERS
  // ==========================

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);


  // ==========================
  // SELECTED ORDER
  // ==========================

  const [selectedOrder, setSelectedOrder] =
    useState(null);


  // ==========================
  // GET ORDERS
  // ==========================

  useEffect(() => {

    const getOrders = async () => {

      try {

        const res = await api.get(
          "/orders/admin/orders"
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


    getOrders();

  }, []);


  // ==========================
  // CHANGE ORDER STATUS
  // ==========================

  const handleStatusChange = async (
    orderId,
    newStatus
  ) => {

    const result = await Swal.fire({

      icon: "question",

      title: "Change Order Status?",

      text:
        `Are you sure you want to change the order status to ${newStatus}?`,

      showCancelButton: true,

      confirmButtonText: "Yes, Change",

      cancelButtonText: "Cancel",

      reverseButtons: true,

    });


    if (!result.isConfirmed) {

      return;

    }


    try {

      const res = await api.put(
        `/orders/admin/orders/${orderId}/status`,
        {
          orderStatus: newStatus,
        }
      );


      console.log(
        "STATUS UPDATED:",
        res.data
      );


      const updatedOrder =
        res.data.order;


      setOrders((prevOrders) =>

        prevOrders.map((order) =>

          order._id === orderId

            ? {
              ...order,

              orderStatus:
                updatedOrder.orderStatus,

              paymentStatus:
                updatedOrder.paymentStatus,
            }

            : order

        )

      );


      // Update modal also
      setSelectedOrder((prev) => {

        if (
          !prev ||
          prev._id !== orderId
        ) {

          return prev;

        }


        return {

          ...prev,

          orderStatus:
            updatedOrder.orderStatus,

          paymentStatus:
            updatedOrder.paymentStatus,

        };

      });


      Swal.fire({

        icon: "success",

        title: "Status Updated",

        text:
          "Order status updated successfully.",

        timer: 1500,

        showConfirmButton: false,

      });


    } catch (error) {

      console.error(
        "Update Order Status Error:",
        error
      );


      Swal.fire({

        icon: "error",

        title: "Update Failed",

        text:
          error.response?.data?.message ||
          "Failed to update order status",

        confirmButtonText: "OK",

      });

    }

  };


  // ==========================
  // FORMAT DATE
  // ==========================

  const formatDate = (date) => {

    if (!date) {

      return "N/A";

    }


    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  };


  // ==========================
  // FORMAT TIME
  // ==========================

  const formatTime = (date) => {

    if (!date) {

      return "N/A";

    }


    return new Date(date).toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }
    );

  };


  // ==========================
  // OPEN ORDER DETAILS
  // ==========================

  const handleViewDetails = (order) => {

    setSelectedOrder(order);

  };


  // ==========================
  // CLOSE ORDER DETAILS
  // ==========================

  const handleCloseDetails = () => {

    setSelectedOrder(null);

  };


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <div className="admin-orders-loading">

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
                  Payment Status
                </th>

                <th>
                  Order Status
                </th>

                <th>
                  Ordered At
                </th>

                <th>
                  Details
                </th>

              </tr>

            </thead>


            <tbody>

              {orders.map((order) => (

                <tr
                  key={order._id}
                >


                  {/* ==========================
                      ORDER ID
                  ========================== */}

                  <td>

                    <span className="order-id">

                      {order._id.slice(
                        -10
                      )}

                    </span>

                  </td>


                  {/* ==========================
                      CUSTOMER
                  ========================== */}

                  <td>

                    <div className="customer-info">

                      <strong>

                        {order.user?.name ||
                          order.shippingAddress?.fullName ||
                          "Unknown User"}

                      </strong>


                      <span>

                        {order.user?.email ||
                          order.shippingAddress?.email ||
                          "No email"}

                      </span>

                    </div>

                  </td>


                  {/* ==========================
                      ITEMS
                  ========================== */}

                  <td>

                    <strong>

                      {order.items?.length || 0}

                    </strong>

                  </td>


                  {/* ==========================
                      TOTAL
                  ========================== */}

                  <td>

                    <strong className="order-total">

                      ₹
                      {Number(
                        order.totalAmount || 0
                      ).toLocaleString("en-IN")}

                    </strong>

                  </td>


                  {/* ==========================
                      PAYMENT METHOD
                  ========================== */}

                  <td>

                    <span className="payment-method">

                      {order.paymentMethod ===
                        "razorpay"

                        ? "Online"

                        : "COD"}

                    </span>

                  </td>


                  {/* ==========================
                      PAYMENT STATUS
                  ========================== */}

                  <td>

                    <span
                      className={
                        `payment-status payment-${(
                          order.paymentStatus ||
                          "Pending"
                        ).toLowerCase()}`
                      }
                    >

                      {order.paymentStatus ||
                        "Pending"}

                    </span>

                  </td>


                  {/* ==========================
                      ORDER STATUS
                  ========================== */}

                  <td>

                    <select
                      value={
                        order.orderStatus ||
                        "Pending"
                      }

                      onChange={(e) =>
                        handleStatusChange(
                          order._id,
                          e.target.value
                        )
                      }

                      className={
                        `status-select status-${(
                          order.orderStatus ||
                          "Pending"
                        ).toLowerCase()}`
                      }
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


                  {/* ==========================
                      ORDER DATE + TIME
                  ========================== */}

                  <td>

                    <div className="order-date">

                      <strong>

                        {formatDate(
                          order.createdAt
                        )}

                      </strong>

                      <span>

                        {formatTime(
                          order.createdAt
                        )}

                      </span>

                    </div>

                  </td>


                  {/* ==========================
                      VIEW DETAILS
                  ========================== */}

                  <td>

                    <button
                      type="button"
                      className="view-details-btn"
                      onClick={() =>
                        handleViewDetails(
                          order
                        )
                      }
                    >

                      View Details

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}


      {/* ==================================================
          ORDER DETAILS MODAL
      ================================================== */}

      {selectedOrder && (

        <div
          className="order-modal-overlay"
          onClick={handleCloseDetails}
        >

          <div
            className="order-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            {/* ==========================
                MODAL HEADER
            ========================== */}

            <div className="order-modal-header">

              <div>

                <h2>
                  Order Details
                </h2>

                <p>

                  Order ID:{" "}

                  <strong>
                    {selectedOrder._id}
                  </strong>

                </p>

              </div>


              <button
                type="button"
                className="modal-close-btn"
                onClick={handleCloseDetails}
              >

                ×

              </button>

            </div>


            {/* ==========================
                ORDER DATE
            ========================== */}

            <div className="order-time-box">

              <div>

                <span>
                  Order Date
                </span>

                <strong>

                  {formatDate(
                    selectedOrder.createdAt
                  )}

                </strong>

              </div>


              <div>

                <span>
                  Order Time
                </span>

                <strong>

                  {formatTime(
                    selectedOrder.createdAt
                  )}

                </strong>

              </div>


              <div>

                <span>
                  Last Updated
                </span>

                <strong>

                  {formatDate(
                    selectedOrder.updatedAt
                  )}

                </strong>

              </div>

            </div>


            {/* ==========================
                CUSTOMER + SHIPPING
            ========================== */}

            <div className="details-grid">


              {/* CUSTOMER */}

              <div className="details-section">

                <h3>
                  Customer Information
                </h3>


                <div className="detail-row">

                  <span>
                    Name
                  </span>

                  <strong>

                    {selectedOrder.user?.name ||
                      selectedOrder.shippingAddress?.fullName ||
                      "N/A"}

                  </strong>

                </div>


                <div className="detail-row">

                  <span>
                    Email
                  </span>

                  <strong>

                    {selectedOrder.user?.email ||
                      selectedOrder.shippingAddress?.email ||
                      "N/A"}

                  </strong>

                </div>


                <div className="detail-row">

                  <span>
                    Phone
                  </span>

                  <strong>

                    {selectedOrder.shippingAddress?.phone ||
                      "N/A"}

                  </strong>

                </div>

              </div>


              {/* SHIPPING */}

              <div className="details-section">

                <h3>
                  Shipping Address
                </h3>


                <div className="shipping-address">

                  <strong>

                    {selectedOrder.shippingAddress?.fullName}

                  </strong>


                  <p>

                    {selectedOrder.shippingAddress?.address}

                  </p>


                  <p>

                    {selectedOrder.shippingAddress?.city}

                    {" - "}

                    {selectedOrder.shippingAddress?.pincode}

                  </p>


                  <p>

                    Phone:{" "}

                    {selectedOrder.shippingAddress?.phone}

                  </p>

                </div>

              </div>

            </div>


            {/* ==========================
                PAYMENT INFORMATION
            ========================== */}

            <div className="details-section">

              <h3>
                Payment Information
              </h3>


              <div className="payment-details-grid">


                <div>

                  <span>
                    Payment Method
                  </span>

                  <strong>

                    {selectedOrder.paymentMethod ===
                      "razorpay"

                      ? "Online Payment"

                      : "Cash on Delivery"}

                  </strong>

                </div>


                <div>

                  <span>
                    Payment Status
                  </span>

                  <strong
                    className={
                      `payment-status payment-${(
                        selectedOrder.paymentStatus ||
                        "Pending"
                      ).toLowerCase()}`
                    }
                  >

                    {selectedOrder.paymentStatus ||
                      "Pending"}

                  </strong>

                </div>


                <div>

                  <span>
                    Payment ID
                  </span>

                  <strong>

                    {selectedOrder.paymentId ||
                      "Not Available"}

                  </strong>

                </div>


                <div>

                  <span>
                    Order Status
                  </span>

                  <strong
                    className={
                      `modal-status status-${(
                        selectedOrder.orderStatus ||
                        "Pending"
                      ).toLowerCase()}`
                    }
                  >

                    {selectedOrder.orderStatus ||
                      "Pending"}

                  </strong>

                </div>

              </div>

            </div>


            {/* ==========================
                ORDER ITEMS
            ========================== */}

            <div className="details-section">

              <h3>
                Ordered Products
              </h3>


              <div className="modal-items">

                {selectedOrder.items?.map(
                  (item, index) => (

                    <div
                      className="modal-item"
                      key={
                        item.product ||
                        index
                      }
                    >


                      {/* IMAGE */}

                      <img
                        src={item.image}
                        alt={item.name}
                      />


                      {/* PRODUCT INFO */}

                      <div className="modal-item-info">

                        <h4>
                          {item.name}
                        </h4>


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


                      {/* ITEM TOTAL */}

                      <strong className="modal-item-total">

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

            </div>


            {/* ==========================
                TOTAL
            ========================== */}

            <div className="modal-total">

              <span>
                Total Amount
              </span>

              <strong>

                ₹
                {Number(
                  selectedOrder.totalAmount || 0
                ).toLocaleString(
                  "en-IN"
                )}

              </strong>

            </div>


            {/* ==========================
                MODAL FOOTER
            ========================== */}

            <div className="order-modal-footer">

              <button
                type="button"
                onClick={handleCloseDetails}
                className="modal-close-bottom-btn"
              >

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}


export default AdminOrders;