import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Swal from "sweetalert2";

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

  const { items } = useSelector(
    (state) => state.cart
  );

  // ==========================
  // LOADING
  // ==========================

  const [loading, setLoading] = useState(false);

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
  // TOTAL AMOUNT
  // ==========================

  const totalAmount = items.reduce(
    (total, item) => {
      return (
        total +
        Number(item.price || 0) *
        Number(item.quantity || 1)
      );
    },
    0
  );

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
  // VALIDATE SHIPPING
  // ==========================

  const validateShippingAddress = () => {
    const {
      fullName,
      email,
      phone,
      address,
      city,
      pincode,
    } = shippingAddress;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !city.trim() ||
      !pincode.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Details",
        text: "Please fill all shipping details.",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563eb",
      });

      return false;
    }

    return true;
  };

  // ==========================
  // PREPARE ORDER ITEMS
  // ==========================

  const prepareOrderItems = () => {
    return items.map((item) => {
      // Product ID can be stored in different ways
      const productId =
        item.product?._id ||
        item.product?.id ||
        item.product ||
        item._id ||
        item.id;

      return {
        product: productId,

        name: item.name,

        price: Number(item.price || 0),

        quantity: Number(item.quantity || 1),

        image: item.image || "",
      };
    });
  };

  // ==========================
  // CREATE DATABASE ORDER
  // ==========================

  const createDatabaseOrder = async (
    paymentId = null
  ) => {
    const orderItems = prepareOrderItems();

    // ==========================
    // CHECK PRODUCT IDS
    // ==========================

    const invalidItem = orderItems.find(
      (item) => !item.product
    );

    if (invalidItem) {
      throw new Error(
        `Product ID missing for ${invalidItem.name}`
      );
    }

    console.log(
      "ORDER ITEMS:",
      orderItems
    );

    // ==========================
    // CREATE ORDER
    // ==========================

    const res = await api.post(
      "/orders",
      {
        items: orderItems,

        shippingAddress,

        paymentMethod,

        totalAmount,

        paymentId,
      }
    );

    // ==========================
    // CLEAR CART
    // ==========================

    dispatch(clearCart());

    // ==========================
    // SUCCESS PAGE
    // ==========================

    navigate(
      `/order-success/${res.data.order._id}`
    );
  };

  // ==========================
  // COD
  // ==========================

  const handleCOD = async () => {
    try {
      setLoading(true);

      await createDatabaseOrder();
    } catch (error) {
      console.error(
        "COD Order Error:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Order Failed",
        text:
          error.response?.data?.message ||
          error.message ||
          "Failed to place order.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // RAZORPAY
  // ==========================

  const handleRazorpay = async () => {
    try {
      setLoading(true);

      // ==========================
      // CREATE RAZORPAY ORDER
      // ==========================

      const orderResponse =
        await api.post(
          "/payment/create-order",
          {
            amount: totalAmount,
          }
        );

      const razorpayOrder =
        orderResponse.data.order;

      // ==========================
      // CHECK SDK
      // ==========================

      if (!window.Razorpay) {
        Swal.fire({
          icon: "error",
          title: "Payment Error",
          text:
            "Razorpay SDK is not loaded.",
          confirmButtonText: "OK",
          confirmButtonColor: "#dc2626",
        });

        setLoading(false);

        return;
      }

      // ==========================
      // RAZORPAY OPTIONS
      // ==========================

      const options = {
        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount:
          razorpayOrder.amount,

        currency:
          razorpayOrder.currency,

        name: "ElectroMart",

        description:
          "ElectroMart Order",

        order_id:
          razorpayOrder.id,

        // ==========================
        // PREFILL
        // ==========================

        prefill: {
          name:
            shippingAddress.fullName,

          email:
            shippingAddress.email,

          contact:
            shippingAddress.phone,
        },

        theme: {
          color: "#111827",
        },

        // ==========================
        // PAYMENT SUCCESS
        // ==========================

        handler: async (response) => {
          try {
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
              verifyResponse.status !== 200
            ) {
              Swal.fire({
                icon: "error",
                title:
                  "Payment Verification Failed",
                text:
                  "We could not verify your payment.",
                confirmButtonText: "OK",
                confirmButtonColor:
                  "#dc2626",
              });

              setLoading(false);

              return;
            }

            // ==========================
            // CREATE DATABASE ORDER
            // ==========================

            await createDatabaseOrder(
              response.razorpay_payment_id
            );
          } catch (error) {
            console.error(
              "Payment Verification Error:",
              error
            );

            Swal.fire({
              icon: "error",
              title:
                "Payment Verification Failed",
              text:
                error.response?.data?.message ||
                error.message ||
                "Payment verification failed.",
              confirmButtonText: "Try Again",
              confirmButtonColor:
                "#dc2626",
            });

            setLoading(false);
          }
        },

        // ==========================
        // MODAL CLOSE
        // ==========================

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      // ==========================
      // RAZORPAY INSTANCE
      // ==========================

      const razorpay =
        new window.Razorpay(options);

      // ==========================
      // PAYMENT FAILED
      // ==========================

      razorpay.on(
        "payment.failed",
        (response) => {
          console.error(
            "Payment Failed:",
            response.error
          );

          Swal.fire({
            icon: "error",
            title: "Payment Failed",
            text:
              response.error?.description ||
              "Payment failed. Please try again.",
            confirmButtonText: "Try Again",
            confirmButtonColor: "#dc2626",
          });

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay Error:",
        error
      );

      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Unable to create payment order.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#dc2626",
      });

      setLoading(false);
    }
  };

  // ==========================
  // SUBMIT
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ==========================
    // EMPTY CART
    // ==========================

    if (items.length === 0) {
      await Swal.fire({
        icon: "warning",
        title: "Cart is Empty",
        text:
          "Please add products before checkout.",
        confirmButtonText:
          "Continue Shopping",
        confirmButtonColor: "#2563eb",
      });

      navigate("/products");

      return;
    }

    // ==========================
    // VALIDATE
    // ==========================

    if (!validateShippingAddress()) {
      return;
    }

    // ==========================
    // PAYMENT
    // ==========================

    if (paymentMethod === "cod") {
      await handleCOD();
    } else {
      await handleRazorpay();
    }
  };

  // ==========================
  // EMPTY CART
  // ==========================

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

  // ==========================
  // PAGE
  // ==========================

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

        {/* ==========================
            LEFT
        ========================== */}

        <div className="checkout-left">

          {/* SHIPPING */}

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
                Email
              </label>

              <input
                type="email"
                name="email"
                value={
                  shippingAddress.email
                }
                onChange={handleChange}
                placeholder="Enter email"
              />
            </div>

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
                placeholder="Enter phone number"
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

          </div>

          {/* PAYMENT */}

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
                  paymentMethod === "razorpay"
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

        {/* ==========================
            RIGHT
        ========================== */}

        <div className="checkout-right">

          <div className="checkout-card order-summary">

            <h2>
              Order Summary
            </h2>

            <div className="checkout-items">

              {items.map((item) => (

                <div
                  className="checkout-item"
                  key={
                    item._id ||
                    item.id ||
                    item.product?._id ||
                    item.product
                  }
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
                      ₹
                      {Number(
                        item.price || 0
                      )}
                      {" × "}
                      {Number(
                        item.quantity || 1
                      )}
                    </p>
                  </div>

                  <strong>
                    ₹
                    {Number(
                      item.price || 0
                    ) *
                      Number(
                        item.quantity || 1
                      )}
                  </strong>

                </div>

              ))}

            </div>

            <div className="summary-total">

              <span>
                Total Amount
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