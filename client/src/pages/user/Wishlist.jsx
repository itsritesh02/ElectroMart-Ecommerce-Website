import { useSelector, useDispatch } from "react-redux";

import {
  removeFromWishlist,
  clearWishlist,
} from "../../redux/slice/wishlistSlice";

import {
  addToCart,
} from "../../redux/slice/cartSlice";

import "./Wishlist.css";


function Wishlist() {

  // Redux se wishlist items lena
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );


  // Redux actions ke liye
  const dispatch = useDispatch();


  // Wishlist empty
  if (wishlistItems.length === 0) {

    return (
      <div className="wishlist-empty">

        <h1>
          Your Wishlist is Empty
        </h1>

        <p>
          Add some products to your wishlist.
        </p>

      </div>
    );

  }


  return (
    <div className="wishlist-page">

      <div className="wishlist-header">

        <h1>
          My Wishlist
        </h1>

        <button
          className="clear-wishlist-btn"
          onClick={() =>
            dispatch(clearWishlist())
          }
        >
          Clear Wishlist
        </button>

      </div>


      <div className="wishlist-grid">

        {wishlistItems.map((product) => (

          <div
            className="wishlist-card"
            key={product.id}
          >


            {/* Product Image */}

            <img
              src={product.image}
              alt={product.name}
              className="wishlist-image"
            />


            {/* Product Details */}

            <div className="wishlist-details">

              <h2>
                {product.name}
              </h2>


              <p className="wishlist-price">
                ₹{product.price}
              </p>


              <p>
                ⭐ {product.rating}
              </p>


              {/* Add To Cart */}

              <button
                className="wishlist-cart-btn"
                onClick={() =>
                  dispatch(addToCart(product))
                }
              >
                Add To Cart
              </button>


              {/* Remove */}

              <button
                className="wishlist-remove-btn"
                onClick={() =>
                  dispatch(
                    removeFromWishlist(product.id)
                  )
                }
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}


export default Wishlist;