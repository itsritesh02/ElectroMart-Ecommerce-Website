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
            TITLE
        ========================== */}

        <h1>
          Order Placed Successfully!
        </h1>


        <p className="success-message">
          Thank you for your order.
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
            to="/user/dashboard"
            className="dashboard-btn"
          >
            Go To Dashboard
          </Link>


          <Link
            to="/products"
            className="shopping-btn"
          >
            Continue Shopping
          </Link>

        </div>

      </div>

    </div>

  );

}


export default OrderSuccess;