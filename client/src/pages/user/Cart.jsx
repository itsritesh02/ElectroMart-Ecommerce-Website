import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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


  // ==========================
  // GET CART ITEMS FROM REDUX
  // ==========================

  const cartItems = useSelector(
    (state) => state.cart.items
  );


  // ==========================
  // TOTAL PRICE
  // ==========================

  const totalPrice = cartItems.reduce(
    (total, item) => {

      return total + item.price * item.quantity;

    },
    0
  );


  // ==========================
  // TOTAL ITEMS
  // ==========================

  const totalItems = cartItems.reduce(
    (total, item) => {

      return total + item.quantity;

    },
    0
  );


  // ==========================
  // EMPTY CART
  // ==========================

  if (cartItems.length === 0) {

    return (

      <div className="empty-cart">

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


      {/* ==========================
          PAGE TITLE
      ========================== */}

      <h1>
        Shopping Cart
      </h1>


      <div className="cart-container">


        {/* ==========================
            LEFT SIDE
        ========================== */}

        <div className="cart-items">


          {cartItems.map((item) => (

            <div
              className="cart-item"
              key={item.id}
            >


              {/* ==========================
                  PRODUCT IMAGE
              ========================== */}

              <img
                src={item.image}
                alt={item.name}
                className="cart-image"
              />


              {/* ==========================
                  PRODUCT DETAILS
              ========================== */}

              <div className="cart-details">


                <h2>
                  {item.name}
                </h2>


                {/* PRICE */}

                <p className="cart-price">
                  ₹{item.price}
                </p>


                {/* ==========================
                    QUANTITY
                ========================== */}

                <div className="quantity">

                  <button
                    type="button"
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
                    type="button"
                    onClick={() =>
                      dispatch(
                        increaseQuantity(item.id)
                      )
                    }
                  >
                    +
                  </button>

                </div>


                {/* ==========================
                    ITEM TOTAL
                ========================== */}

                <p className="item-total">

                  Item Total: ₹
                  {item.price * item.quantity}

                </p>


                {/* ==========================
                    REMOVE
                ========================== */}

                <button
                  type="button"
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


        {/* ==========================
            RIGHT SIDE
        ========================== */}

        <div className="cart-summary">


          <h2>
            Cart Summary
          </h2>


          {/* TOTAL ITEMS */}

          <div className="summary-row">

            <span>
              Total Items
            </span>

            <span>
              {totalItems}
            </span>

          </div>


          {/* TOTAL PRICE */}

          <div className="summary-row">

            <span>
              Total
            </span>

            <strong>
              ₹{totalPrice}
            </strong>

          </div>


          {/* ==========================
              CHECKOUT
          ========================== */}

          <button
            type="button"
            className="checkout-btn"
            onClick={() => navigate("/checkout")}
          >
            Proceed To Checkout
          </button>

          {/* ==========================
              CLEAR CART
          ========================== */}

          <button
            type="button"
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