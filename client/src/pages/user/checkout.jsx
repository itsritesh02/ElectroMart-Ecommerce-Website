
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import { clearCart } from "../../redux/slice/cartSlice";

import "./Checkout.css";


function Checkout() {

  const navigate = useNavigate();

  const dispatch = useDispatch();


  // ==========================
  // GET USER
  // ==========================

  const { user } = useSelector(
    (state) => state.auth
  );


  // ==========================
  // GET CART
  // ==========================

  const cartItems = useSelector(
    (state) => state.cart.items
  );


  // ==========================
  // TOTAL PRICE
  // ==========================

  const totalAmount = cartItems.reduce(
    (total, item) => {

      return total +
        item.price * item.quantity;

    },
    0
  );


  // ==========================
  // SHIPPING ADDRESS
  // ==========================

  const [shippingAddress, setShippingAddress] =
    useState({

      fullName: user?.name || "",

      email: user?.email || "",

      phone: "",

      address: "",

      city: "",

      pincode: "",

    });


  // ==========================
  // PAYMENT METHOD
  // ==========================

  const [paymentMethod, setPaymentMethod] =
    useState("cod");


  // ==========================
  // LOADING
  // ==========================

  const [loading, setLoading] =
    useState(false);


  // ==========================
  // HANDLE INPUT
  // ==========================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setShippingAddress((prev) => ({

      ...prev,

      [name]: value,

    }));

  };


  // ==========================
  // PLACE ORDER
  // ==========================

  const handlePlaceOrder = async (e) => {

    e.preventDefault();


    // ==========================
    // EMPTY CART
    // ==========================

    if (cartItems.length === 0) {

      alert("Your cart is empty");

      navigate("/products");

      return;

    }


    // ==========================
    // VALIDATION
    // ==========================

    const {
      fullName,
      email,
      phone,
      address,
      city,
      pincode,
    } = shippingAddress;


    if (
      !fullName ||
      !email ||
      !phone ||
      !address ||
      !city ||
      !pincode
    ) {

      alert(
        "Please fill all shipping details"
      );

      return;

    }


    try {

      setLoading(true);


      // ==========================
      // PREPARE ORDER ITEMS
      // ==========================

      const items = cartItems.map(
        (item) => ({

          product: item.product || item.id,

          name: item.name,

          price: item.price,

          image: item.image,

          quantity: item.quantity,

        })
      );


      // ==========================
      // CREATE ORDER
      // ==========================

      const res = await api.post(
        "/orders",
        {

          items,

          shippingAddress,

          paymentMethod,

          totalAmount,

        }
      );


      console.log(
        "ORDER CREATED:",
        res.data
      );


      // ==========================
      // CLEAR CART
      // ==========================

      dispatch(clearCart());


      // ==========================
      // GO TO SUCCESS PAGE
      // ==========================

      navigate(
        `/ order - success / ${ res.data.order._id } `
      );


    } catch (error) {

      console.error(
        "Place Order Error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to place order"
      );


    } finally {

      setLoading(false);

    }

  };


  // ==========================
  // EMPTY CART
  // ==========================

  if (cartItems.length === 0) {

    return (

      <div className="checkout-page">

        <div className="checkout-empty">

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            Add products before checkout.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/products")
            }
          >
            Continue Shopping
          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="checkout-page">


      {/* ==========================
          PAGE HEADER
      ========================== */}

      <div className="checkout-header">

        <h1>
          Checkout
        </h1>

        <p>
          Complete your order
        </p>

      </div>


      <div className="checkout-container">


        {/* ==========================
            LEFT SIDE
        ========================== */}

        <div className="checkout-form-card">

          <h2>
            Shipping Information
          </h2>


          <form
            onSubmit={handlePlaceOrder}
          >


            {/* FULL NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={shippingAddress.fullName}
                onChange={handleChange}
                placeholder="Enter full name"
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={shippingAddress.email}
                onChange={handleChange}
                placeholder="Enter email"
              />

            </div>


            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />

            </div>


            {/* ADDRESS */}

            <div className="form-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                value={shippingAddress.address}
                onChange={handleChange}
                placeholder="Enter complete address"
                rows="4"
              />

            </div>


            {/* CITY */}

            <div className="form-group">

              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                value={shippingAddress.city}
                onChange={handleChange}
                placeholder="Enter city"
              />

            </div>


            {/* PINCODE */}

            <div className="form-group">

              <label>
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={shippingAddress.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
              />

            </div>


            {/* ==========================
                PAYMENT
            ========================== */}

            <div className="payment-section">

              <h2>
                Payment Method
              </h2>


              <label className="payment-option">

                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={
                    paymentMethod === "cod"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <span>
                  Cash on Delivery
                </span>

              </label>


              <label className="payment-option">

                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={
                    paymentMethod === "razorpay"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                <span>
                  Razorpay
                </span>

              </label>

            </div>


            {/* ==========================
                PLACE ORDER
            ========================== */}

            <button
              type="submit"
              className="place-order-btn"
              disabled={loading}
            >

              {loading
                ? "Placing Order..."
                : "Place Order"}

            </button>


          </form>

        </div>


        {/* ==========================
            RIGHT SIDE
        ========================== */}

        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>


          {/* ITEMS */}

          <div className="summary-items">

            {cartItems.map((item) => (

              <div
                className="summary-item"
                key={item.id}
              >

                <div>

                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    Qty: {item.quantity}
                  </span>

                </div>


                <strong>
                  ₹{item.price * item.quantity}
                </strong>

              </div>

            ))}

          </div>


          {/* TOTAL */}

          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹{totalAmount}
            </strong>

          </div>


        </div>

      </div>

    </div>

  );

}


export default Checkout;

