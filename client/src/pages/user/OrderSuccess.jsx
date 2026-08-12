import { Link, useParams } from "react-router-dom";

import "./OrderSuccess.css";

function OrderSuccess() {

  const { id } = useParams();

  return (
    <div className="order-success-page">

      <div className="order-success-card">

        {/* ==========================
            SUCCESS ICON
        ========================== */}

        <div className="success-icon">
          ✓
        </div>


        {/* ==========================
            MESSAGE
        ========================== */}

        <h1>
          Order Placed Successfully!
        </h1>

        <p>
          Thank you for your purchase.
          Your order has been placed successfully.
        </p>


        {/* ==========================
            ORDER ID
        ========================== */}

        <div className="order-id-box">

          <span>
            Order ID
          </span>

          <strong>
            {id}
          </strong>

        </div>


        {/* ==========================
            BUTTONS
        ========================== */}

        <div className="success-buttons">

          <Link
            to="/products"
            className="continue-shopping-btn"
          >
            Continue Shopping
          </Link>


          <Link
            to="/user/orders"
            className="view-orders-btn"
          >
            View My Orders
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;