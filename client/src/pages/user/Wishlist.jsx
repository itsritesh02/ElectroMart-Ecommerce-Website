import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  removeFromWishlist,
  clearWishlist,
} from "../../redux/slice/wishlistSlice";

import { addToCart } from "../../redux/slice/cartSlice";

import "./Wishlist.css";


function Wishlist() {

  const dispatch = useDispatch();


  // ==========================
  // GET WISHLIST
  // ==========================

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );


  // ==========================
  // ADD TO CART
  // ==========================

  const handleAddToCart = (item) => {

    dispatch(
      addToCart({
        product: {
          _id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
        },
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
          Save products you like here.
        </p>

        <Link
          to="/products"
          className="wishlist-shop-btn"
        >
          Continue Shopping
        </Link>

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
            {wishlistItems.length > 1
              ? "s"
              : ""}{" "}
            saved
          </p>

        </div>


        {/* CLEAR WISHLIST */}

        <button
          type="button"
          className="clear-wishlist-btn"
          onClick={() => {

            const confirmClear =
              window.confirm(
                "Are you sure you want to clear your wishlist?"
              );

            if (confirmClear) {

              dispatch(clearWishlist());

            }

          }}
        >
          Clear Wishlist
        </button>

      </div>


      {/* ==========================
          WISHLIST GRID
      ========================== */}

      <div className="wishlist-grid">


        {wishlistItems.map((item) => (

          <div
            className="wishlist-card"
            key={item.id}
          >


            {/* ==========================
                IMAGE
            ========================== */}

            <Link
              to={`/product/${item.id}`}
              className="wishlist-image-link"
            >

              <img
                src={item.image}
                alt={item.name}
                className="wishlist-image"
              />

            </Link>


            {/* ==========================
                INFO
            ========================== */}

            <div className="wishlist-info">


              <h2>
                {item.name}
              </h2>


              <p>
                {item.category}
              </p>


              <h3>
                ₹{item.price}
              </h3>


              {/* ==========================
                  BUTTONS
              ========================== */}

              <div className="wishlist-buttons">


                {/* VIEW PRODUCT */}

                <Link
                  to={`/product/${item.id}`}
                  className="wishlist-view-btn"
                >
                  View Product
                </Link>


                {/* ADD TO CART */}

                <button
                  type="button"
                  className="wishlist-cart-btn"
                  onClick={() =>
                    handleAddToCart(item)
                  }
                >
                  Add To Cart
                </button>


                {/* REMOVE */}

                <button
                  type="button"
                  className="wishlist-remove-btn"
                  onClick={() =>
                    dispatch(
                      removeFromWishlist(item.id)
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