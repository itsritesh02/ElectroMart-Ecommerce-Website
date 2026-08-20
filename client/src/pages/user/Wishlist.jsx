import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

import {
  removeFromWishlist,
  clearWishlist,
} from "../../redux/slice/wishlistSlice";

import {
  addToCart,
  removeFromCart,
} from "../../redux/slice/cartSlice";

import "./Wishlist.css";


function Wishlist() {

  const dispatch = useDispatch();


  // ==========================
  // GET WISHLIST
  // ==========================

  const wishlistItems = useSelector(
    (state) =>
      state.wishlist?.items || []
  );


  // ==========================
  // GET CART
  // ==========================

  const cartItems = useSelector(
    (state) =>
      state.cart?.items || []
  );


  // ==========================
  // CHECK PRODUCT IN CART
  // ==========================

  const isInCart = (productId) => {

    return cartItems.some(
      (cartItem) =>
        cartItem.id === productId ||
        cartItem._id === productId
    );

  };


  // =====================================================
  // ADD / REMOVE FROM CART
  // =====================================================

  const handleCartToggle = (item) => {

    const productId = item.id;


    // ==========================
    // ALREADY IN CART
    // ==========================

    if (isInCart(productId)) {

      dispatch(
        removeFromCart(productId)
      );


      Swal.fire({
        icon: "success",

        title: "Removed from Cart",

        text: `${item.name} has been removed from your cart.`,

        timer: 1500,

        showConfirmButton: false,
      });


      return;
    }


    // ==========================
    // ADD TO CART
    // ==========================

    dispatch(
      addToCart({

        _id: item.id,

        id: item.id,

        name: item.name,

        price: Number(item.price),

        image: item.image,

        category: item.category,

        quantity: 1,

      })
    );


    // ==========================
    // SUCCESS ALERT
    // ==========================

    Swal.fire({

      icon: "success",

      title: "Added to Cart!",

      text: `${item.name} has been added to your cart.`,

      timer: 1500,

      showConfirmButton: false,

    });

  };


  // ==========================
  // REMOVE FROM WISHLIST
  // ==========================

  const handleRemove = (item) => {

    Swal.fire({

      title: "Remove Product?",

      text: `Remove ${item.name} from your wishlist?`,

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, Remove",

      cancelButtonText: "Cancel",

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#6b7280",

    }).then((result) => {

      if (result.isConfirmed) {

        dispatch(
          removeFromWishlist(item.id)
        );


        Swal.fire({

          icon: "success",

          title: "Removed!",

          text: "Product removed from wishlist.",

          timer: 1500,

          showConfirmButton: false,

        });

      }

    });

  };


  // ==========================
  // CLEAR WISHLIST
  // ==========================

  const handleClearWishlist = () => {

    Swal.fire({

      title: "Clear Wishlist?",

      text: "All wishlist products will be removed.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, Clear",

      cancelButtonText: "Cancel",

      confirmButtonColor: "#dc2626",

      cancelButtonColor: "#6b7280",

    }).then((result) => {

      if (result.isConfirmed) {

        dispatch(
          clearWishlist()
        );


        Swal.fire({

          icon: "success",

          title: "Wishlist Cleared!",

          text: "All products have been removed.",

          timer: 1500,

          showConfirmButton: false,

        });

      }

    });

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


  // ==========================
  // UI
  // ==========================

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


        {/* ==========================
            CLEAR WISHLIST
        ========================== */}

        <button
          type="button"
          className="clear-wishlist-btn"
          onClick={handleClearWishlist}
        >
          Clear Wishlist
        </button>

      </div>


      {/* ==========================
          WISHLIST GRID
      ========================== */}

      <div className="wishlist-grid">

        {wishlistItems.map((item) => {

          const productInCart =
            isInCart(item.id);


          return (

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
                  ₹{Number(item.price)}
                </h3>


                {/* ==========================
                    BUTTONS
                ========================== */}

                <div className="wishlist-buttons">


                  {/* ==========================
                      VIEW PRODUCT
                  ========================== */}

                  <Link
                    to={`/product/${item.id}`}
                    className="wishlist-view-btn"
                  >
                    View Product
                  </Link>


                  {/* ==========================
                      ADD / REMOVE CART
                  ========================== */}

                  <button
                    type="button"

                    className={`wishlist-cart-btn ${productInCart
                        ? "added-to-cart"
                        : ""
                      }`}

                    onClick={() =>
                      handleCartToggle(item)
                    }
                  >

                    {productInCart
                      ? "✓ Remove From Cart"
                      : "Add To Cart"}

                  </button>


                  {/* ==========================
                      REMOVE FROM WISHLIST
                  ========================== */}

                  <button
                    type="button"

                    className="wishlist-remove-btn"

                    onClick={() =>
                      handleRemove(item)
                    }
                  >
                    Remove From Wishlist
                  </button>


                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}


export default Wishlist;