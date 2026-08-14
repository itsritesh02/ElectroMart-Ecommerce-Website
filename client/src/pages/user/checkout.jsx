
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import api from "../../services/api";
import { clearCart } from "../../redux/slice/cartSlice";

import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const { items } = useSelector(
    (state) => state.cart
  );

  const [loading, setLoading] = useState(false);

  const [shippingAddress, setShippingAddress] =
    useState({
      fullName: user?.name || "",
      address: "",
      city: "",
      pincode: "",
      phone: "",
      email: user?.email || "",
    });

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const totalAmount = items.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateAddress = () => {
    const {
      fullName,
      address,
      city,
      pincode,
      phone,
      email,
    } = shippingAddress;

    if (
      !fullName ||
      !address ||
      !city ||
      !pincode ||
      !phone ||
      !email
    ) {
      alert("Please fill all shipping details");
      return false;
    }

    return true;
  };

  const createOrder = async (
    paymentId = null
  ) => {
    const res = await api.post("/orders", {
      items,
      totalAmount,
      paymentMethod,
      shippingAddress,
      paymentId,
    });

    dispatch(clearCart());

    navigate(
      `/ order - success / ${ res.data.order._id } `
    );
  };

  const handleCashOnDelivery = async () => {
    try {
      setLoading(true);

      await createOrder();
    } catch (error) {
      console.error(
        "COD Order Error:",
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

  const handleRazorpay = async () => {
    try {
      setLoading(true);

      const res = await api.post(
        "/payment/create-order",
        {
          amount: totalAmount,
        }
      );

      const razorpayOrder =
        res.data.order;

      if (!window.Razorpay) {
        alert(
          "Razorpay SDK not loaded"
        );

        setLoading(false);

        return;
      }

      const options = {
        key: import.meta.env
          .VITE_RAZORPAY_KEY_ID,

        amount: razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        name: "ElectroMart",

        description:
          "ElectroMart Order",

        order_id:
          razorpayOrder.id,

        prefill: {
          name:
            shippingAddress.fullName,

          email:
            shippingAddress.email,

          contact:
            shippingAddress.phone,
        },

        handler: async function (
          response
        ) {
          try {
            setLoading(true);

            const verifyResponse =
              await api.post(
                "/payment/verify",
                {
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                }
              );

            if (
              !verifyResponse.data.verified
            ) {
              alert(
                "Payment verification failed"
              );

              setLoading(false);

              return;
            }

            await createOrder(
              response.razorpay_payment_id
            );
          } catch (error) {
            console.error(
              "Payment Verification Error:",
              error
            );

            alert(
              error.response?.data?.message ||
                "Payment verification failed"
            );

            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: {
          color: "#111827",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment Failed:",
            response.error
          );

          alert(
            response.error?.description ||
              "Payment failed"
          );

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Unable to start payment"
      );

      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty");

      navigate("/products");

      return;
    }

    if (!validateAddress()) {
      return;
    }

    if (paymentMethod === "cod") {
      await handleCashOnDelivery();

      return;
    }

    await handleRazorpay();
  };

  if (items.length === 0) {
    return (
      <div className="checkout-page">

        <div className="empty-checkout">

          <h2>
            Your cart is empty
          </h2>

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

      <div className="checkout-header">

        <h1>
          Checkout
        </h1>

        <p>
          Complete your order
        </p>

      </div>


      <form
        className="checkout-content"
        onSubmit={handleSubmit}
      >

        <div className="checkout-left">

          <div className="checkout-card">

            <h2>
              Shipping Address
            </h2>


            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={
                  shippingAddress.fullName
                }
                onChange={handleChange}
                placeholder="Enter full name"
              />

            </div>


            <div className="form-group">

              <label>
                Address
              </label>

              <textarea
                name="address"
                value={
                  shippingAddress.address
                }
                onChange={handleChange}
                placeholder="Enter complete address"
                rows="4"
              />

            </div>


            <div className="checkout-row">

              <div className="form-group">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={
                    shippingAddress.city
                  }
                  onChange={handleChange}
                  placeholder="City"
                />

              </div>


              <div className="form-group">

                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={
                    shippingAddress.pincode
                  }
                  onChange={handleChange}
                  placeholder="Pincode"
                />

              </div>

            </div>


            <div className="checkout-row">

              <div className="form-group">

                <label>
                  Phone
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={
                    shippingAddress.phone
                  }
                  onChange={handleChange}
                  placeholder="Phone number"
                />

              </div>


              <div className="form-group">

                <label>
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={
                    shippingAddress.email
                  }
                  onChange={handleChange}
                  placeholder="Email"
                />

              </div>

            </div>

          </div>


          <div className="checkout-card">

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
                  paymentMethod ===
                  "razorpay"
                }
                onChange={(e) =>
                  setPaymentMethod(
                    e.target.value
                  )
                }
              />

              <span>
                Online Payment
              </span>

            </label>

          </div>

        </div>


        <div className="checkout-right">

          <div className="checkout-card order-summary">

            <h2>
              Order Summary
            </h2>


            <div className="checkout-items">

              {items.map((item) => (

                <div
                  className="checkout-item"
                  key={item._id}
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
                      ₹{item.price} ×{" "}
                      {item.quantity}
                    </p>

                  </div>

                  <strong>
                    ₹
                    {item.price *
                      item.quantity}
                  </strong>

                </div>

              ))}

            </div>


            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{totalAmount}
              </strong>

            </div>


            <button
              type="submit"
              className="place-order-btn"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : paymentMethod ===
                    "razorpay"
                  ? "Pay Now"
                  : "Place Order"}
            </button>

          </div>

        </div>

      </form>

    </div>
  );
}

export default Checkout;
