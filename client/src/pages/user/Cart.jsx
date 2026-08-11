import { useSelector, useDispatch } from "react-redux";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../../redux/slice/cartSlice";

import "./Cart.css";

function Cart() {

  // Redux se cart items lena
  const cartItems = useSelector(
    (state) => state.cart.items
  );

  // Redux actions ke liye
  const dispatch = useDispatch();


  // Subtotal
  const subtotal = cartItems.reduce(
    (total, item) => {
      return total + item.price * item.quantity;
    },
    0
  );


  // Total quantity
  const totalItems = cartItems.reduce(
    (total, item) => {
      return total + item.quantity;
    },
    0
  );


  // Delivery charge
  const deliveryCharge =
    subtotal >= 50000 ? 0 : 100;


  // Grand total
  const grandTotal =
    subtotal + deliveryCharge;


  // Empty cart
  if (cartItems.length === 0) {

    return (
      <div className="cart-empty">

        <h1>
          Your Cart is Empty
        </h1>

        <p>
          Add some products to your cart.
        </p>

      </div>
    );

  }


  return (
    <div className="cart-page">

      <h1>
        Shopping Cart
      </h1>


      <div className="cart-container">


        {/* =========================
            LEFT SIDE - PRODUCTS
        ========================== */}

        <div className="cart-items">

          {cartItems.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >

              {/* Product Image */}

              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
              />


              {/* Product Details */}

              <div className="cart-details">

                <h2>
                  {item.name}
                </h2>


                {/* Price */}

                <p className="cart-price">
                  ₹{item.price} × {item.quantity}
                </p>


                {/* Product Total */}

                <p className="item-total">
                  ₹{item.price * item.quantity}
                </p>


                {/* Quantity */}

                <div className="quantity">

                  <button
                    onClick={() =>
                      dispatch(
                        decreaseQuantity(item.id)
                      )
                    }
                  >
                    -
                  </button>


                  <span>
                    {item.quantity}
                  </span>


                  <button
                    onClick={() =>
                      dispatch(
                        increaseQuantity(item.id)
                      )
                    }
                  >
                    +
                  </button>

                </div>


                {/* Remove */}

                <button
                  className="remove-btn"
                  onClick={() =>
                    dispatch(
                      removeFromCart(item.id)
                    )
                  }
                >
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* =========================
            RIGHT SIDE - SUMMARY
        ========================== */}

        <div className="cart-summary">

          <h2>
            Cart Summary
          </h2>


          {/* Total Items */}

          <div className="summary-row">

            <span>
              Total Items
            </span>

            <span>
              {totalItems}
            </span>

          </div>


          {/* Subtotal */}

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <span>
              ₹{subtotal}
            </span>

          </div>


          {/* Delivery */}

          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span>
              {deliveryCharge === 0
                ? "FREE"
                : `₹${deliveryCharge}`
              }
            </span>

          </div>


          <hr />


          {/* Grand Total */}

          <div className="summary-total">

            <span>
              Grand Total
            </span>

            <strong>
              ₹{grandTotal}
            </strong>

          </div>


          {/* Checkout */}

          <button
            className="checkout-btn"
          >
            Proceed To Checkout
          </button>


          {/* Clear Cart */}

          <button
            className="clear-btn"
            onClick={() =>
              dispatch(clearCart())
            }
          >
            Clear Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;