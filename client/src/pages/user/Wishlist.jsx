import { useDispatch, useSelector } from "react-redux";

import {
  removeFromWishlist,
  clearWishlist,
} from "../../redux/slice/wishlistSlice";

import { addToCart } from "../../redux/slice/cartSlice";

import "./Wishlist.css";


function Wishlist() {

  // ==========================
  // GET WISHLIST FROM REDUX
  // ==========================

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );


  // ==========================
  // DISPATCH
  // ==========================

  const dispatch = useDispatch();


  // ==========================
  // ADD TO CART
  // ==========================

  const handleAddToCart = (product) => {

    dispatch(
      addToCart({
        product,
        quantity: 1,
      })
    );

    alert("Product added to cart");

  };


  // ==========================
  // EMPTY WISHLIST
  // ==========================

  if (wishlistItems.length === 0) {

    return (

      <div className="empty-wishlist">

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


      {/* ==========================
          HEADER
      ========================== */}

      <div className="wishlist-header">

        <div>

          <h1>
            My Wishlist
          </h1>

          <p>
            {wishlistItems.length} product
            {wishlistItems.length > 1 ? "s" : ""}
          </p>

        </div>


        <button
          className="clear-wishlist-btn"
          onClick={() =>
            dispatch(clearWishlist())
          }
        >
          Clear Wishlist
        </button>

      </div>


      {/* ==========================
          PRODUCTS
      ========================== */}

      <div className="wishlist-grid">

        {wishlistItems.map((product) => (

          <div
            className="wishlist-card"
            key={product.id}
          >


            {/* IMAGE */}

            <img
              src={product.image}
              alt={product.name}
              className="wishlist-image"
            />


            {/* DETAILS */}

            <div className="wishlist-details">

              <h2>
                {product.name}
              </h2>


              <p className="wishlist-category">
                {product.category}
              </p>


              <h3 className="wishlist-price">
                ₹{product.price}
              </h3>


              {/* ACTIONS */}

              <div className="wishlist-actions">


                <button
                  className="wishlist-cart-btn"
                  onClick={() =>
                    handleAddToCart(product)
                  }
                >
                  Add To Cart
                </button>


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

          </div>

        ))}

      </div>

    </div>

  );

}


export default Wishlist;