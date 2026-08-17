import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../../redux/slice/cartSlice";

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart?.items || []
  );

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  const handleRemove = async (item) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Remove Product?",
      text: `Are you sure you want to remove "${item.name}" from your cart?`,
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    dispatch(removeFromCart(item.id));

    Swal.fire({
      icon: "success",
      title: "Removed",
      text: "Product removed from cart.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleClearCart = async () => {
    const result = await Swal.fire({
      icon: "warning",
      title: "Clear Cart?",
      text: "All products will be removed from your cart.",
      showCancelButton: true,
      confirmButtonText: "Yes, Clear Cart",
      cancelButtonText: "Cancel",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    dispatch(clearCart());

    Swal.fire({
      icon: "success",
      title: "Cart Cleared",
      text: "All products have been removed.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">

        <h1 className="cart-empty-title">
          Your Cart is Empty
        </h1>

        <p className="cart-empty-text">
          Add some products to your cart.
        </p>

        <button
          type="button"
          className="cart-continue-btn"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>

      </div>
    );
  }

  return (
    <div className="cart-page">

      {/* PAGE TITLE */}
      <h1 className="cart-page-title">
        Shopping Cart
      </h1>

      <div className="cart-container">

        {/* CART ITEMS */}
        <div className="cart-items">

          {cartItems.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              <img
                src={item.image}
                alt={item.name}
                className="cart-item-image"
              />

              <div className="cart-item-details">

                <h2 className="cart-item-name">
                  {item.name}
                </h2>

                <p className="cart-item-price">
                  ₹{Number(item.price)}
                </p>

                {/* QUANTITY */}
                <div className="cart-quantity">

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                  >
                    -
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                  >
                    +
                  </button>

                </div>

                {/* ITEM TOTAL */}
                <p className="cart-item-total">
                  Item Total: ₹
                  {Number(item.price) *
                    Number(item.quantity)}
                </p>

                {/* REMOVE */}
                <button
                  type="button"
                  className="cart-remove-btn"
                  onClick={() => handleRemove(item)}
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* CART SUMMARY */}
        <div className="cart-summary">

          <h2 className="cart-summary-title">
            Cart Summary
          </h2>

          <div className="cart-summary-row">

            <span>
              Total Items
            </span>

            <span>
              {totalItems}
            </span>

          </div>

          <div className="cart-summary-row">

            <span>
              Total
            </span>

            <strong>
              ₹{totalPrice}
            </strong>

          </div>

          {/* CHECKOUT */}
          <button
            type="button"
            className="cart-checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed To Checkout
          </button>

          {/* CLEAR CART */}
          <button
            type="button"
            className="cart-clear-btn"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;