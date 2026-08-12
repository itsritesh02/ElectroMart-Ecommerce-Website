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
  // CART
  // ==========================

  const cartItems = useSelector(
    (state) => state.cart.items
  );


  // ==========================
  // USER
  // ==========================

  const user = useSelector(
    (state) => state.auth.user
  );


  // ==========================
  // FORM
  // ==========================

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "cod",
  });


  const [placingOrder, setPlacingOrder] =
    useState(false);


  // ==========================
  // TOTAL
  // ==========================

  const totalPrice = cartItems.reduce(
    (total, item) => {
      return (
        total +
        Number(item.price) * item.quantity
      );
    },
    0
  );


  // ==========================
  // INPUT CHANGE
  // ==========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // ==========================
  // PLACE ORDER
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (cartItems.length === 0) {

      alert("Your cart is empty");

      navigate("/products");

      return;
    }


    setPlacingOrder(true);


    try {

      // ==========================
      // ORDER ITEMS
      // ==========================

      const orderItems = cartItems.map(
        (item) => ({
          product: item.id,

          name: item.name,

          price: Number(item.price),

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
          items: orderItems,

          shippingAddress: {
            fullName:
              formData.fullName,

            email:
              formData.email,

            phone:
              formData.phone,

            address:
              formData.address,

            city:
              formData.city,

            pincode:
              formData.pincode,
          },

          paymentMethod:
            formData.paymentMethod,

          totalAmount:
            totalPrice,
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
      // SUCCESS
      // ==========================

      alert(
        "Order placed successfully!"
      );


      navigate(
        `/order-success/${res.data.order._id}`
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

      setPlacingOrder(false);

    }

  };


  // ==========================
  // EMPTY CART
  // ==========================

  if (cartItems.length === 0) {

    return (
      <div className="checkout-page">

        <div className="empty-checkout">

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            Please add products before checkout.
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

      <h1>
        Checkout
      </h1>


      <div className="checkout-container">


        {/* ==========================
            LEFT - FORM
        ========================== */}

        <div className="checkout-form">

          <h2>
            Delivery Information
          </h2>


          <form onSubmit={handleSubmit}>


            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
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
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            {/* PHONE */}

            <div className="form-group">

              <label>
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>


            {/* ADDRESS */}

            <div className="form-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                placeholder="Enter complete address"
                value={formData.address}
                onChange={handleChange}
                rows="4"
                required
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
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
                required
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
                placeholder="Enter pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
              />

            </div>


            {/* PAYMENT */}

            <div className="form-group">

              <label>
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={
                  formData.paymentMethod
                }
                onChange={handleChange}
                required
              >

                <option value="cod">
                  Cash on Delivery
                </option>

                <option value="razorpay">
                  Online Payment
                </option>

              </select>

            </div>


            {/* PLACE ORDER */}

            <button
              type="submit"
              className="place-order-btn"
              disabled={placingOrder}
            >

              {placingOrder
                ? "Placing Order..."
                : "Place Order"}

            </button>

          </form>

        </div>


        {/* ==========================
            RIGHT - SUMMARY
        ========================== */}

        <div className="checkout-summary">

          <h2>
            Order Summary
          </h2>


          {cartItems.map((item) => (

            <div
              className="checkout-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
              />


              <div>

                <h3>
                  {item.name}
                </h3>

                <p>
                  Quantity: {item.quantity}
                </p>

                <strong>
                  ₹
                  {Number(item.price) *
                    item.quantity}
                </strong>

              </div>

            </div>

          ))}


          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹{totalPrice}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;