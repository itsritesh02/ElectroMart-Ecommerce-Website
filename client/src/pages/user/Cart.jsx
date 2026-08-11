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

  // Redux action bhejne ke liye
  const dispatch = useDispatch();

  // Total price calculate karna
  const totalPrice = cartItems.reduce(
    (total, item) => {
      return total + item.price * item.quantity;
    },
    0
  );

  // Total quantity calculate karna
  const totalItems = cartItems.reduce(
    (total, item) => {
      return total + item.quantity;
    },
    0
  );

  // Agar cart empty hai
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">

        <h1>Your Cart is Empty</h1>

        <p>
          Add some products to your cart.
        </p>

      </div>
    );
  }

  return (
    <div className="cart-page">

      <h1>Shopping Cart</h1>

      <div className="cart-container">

        {/* LEFT SIDE - PRODUCTS */}

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


              {/* Product Information */}

              <div className="cart-details">

                <h2>
                  {item.name}
                </h2>

                <p className="cart-price">
                  ₹{item.price}
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


        {/* RIGHT SIDE - SUMMARY */}

        <div className="cart-summary">

          <h2>
            Cart Summary
          </h2>

          <p>
            Total Items: {totalItems}
          </p>

          <h2>
            Total: ₹{totalPrice}
          </h2>


          <button className="checkout-btn">
            Proceed To Checkout
          </button>


          <button
            className="clear-btn"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default Cart;