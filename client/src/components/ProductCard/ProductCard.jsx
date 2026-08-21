import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaHeart } from "react-icons/fa";

import Swal from "sweetalert2";

import {
  addToCart,
  removeFromCart,
} from "../../redux/slice/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slice/wishlistSlice";

import "./ProductCard.css";


function ProductCard({ product }) {

  const dispatch = useDispatch();

  const navigate = useNavigate();


  // ==========================
  // GET AUTH STATE
  // ==========================

  const isAuthenticated = useSelector(
    (state) => state.auth?.isAuthenticated
  );


  // ==========================
  // GET CART FROM REDUX
  // ==========================

  const cartItems = useSelector(
    (state) =>
      state.cart?.items || []
  );


  // ==========================
  // GET WISHLIST FROM REDUX
  // ==========================

  const wishlistItems = useSelector(
    (state) =>
      state.wishlist?.items || []
  );


  // ==========================
  // PRODUCT ID
  // ==========================

  const productId = product._id;


  // ==========================
  // CHECK PRODUCT IN CART
  // ==========================

  const isInCart =
    cartItems.some(
      (item) =>
        item.id === productId ||
        item._id === productId
    );


  // ==========================
  // CHECK PRODUCT IN WISHLIST
  // ==========================

  const isWishlisted =
    wishlistItems.some(
      (item) =>
        item.id === productId ||
        item._id === productId
    );


  // =====================================================
  // LOGIN REQUIRED
  // =====================================================

  const showLoginFirst = () => {

    Swal.fire({

      icon: "warning",

      title: "Login First",

      text:
        "Please login first to add products to Cart or Wishlist.",

      confirmButtonText:
        "Go to Login",

      showCancelButton: true,

      cancelButtonText:
        "Cancel",

      reverseButtons: true,

    }).then((result) => {

      if (result.isConfirmed) {

        navigate("/login");

      }

    });

  };


  // =====================================================
  // ADD / REMOVE FROM CART
  // =====================================================

  const handleCartToggle = () => {


    // ==========================
    // CHECK LOGIN
    // ==========================

    if (!isAuthenticated) {

      showLoginFirst();

      return;

    }


    // ==========================
    // REMOVE FROM CART
    // ==========================

    if (isInCart) {

      dispatch(
        removeFromCart(productId)
      );

      return;

    }


    // ==========================
    // ADD TO CART
    // ==========================

    dispatch(
      addToCart({

        ...product,

        id: productId,

        quantity: 1,

      })
    );

  };


  // =====================================================
  // ADD / REMOVE FROM WISHLIST
  // =====================================================

  const handleWishlistToggle = () => {


    // ==========================
    // CHECK LOGIN
    // ==========================

    if (!isAuthenticated) {

      showLoginFirst();

      return;

    }


    // ==========================
    // REMOVE FROM WISHLIST
    // ==========================

    if (isWishlisted) {

      dispatch(
        removeFromWishlist(productId)
      );

      return;

    }


    // ==========================
    // ADD TO WISHLIST
    // ==========================

    dispatch(
      addToWishlist({

        ...product,

        id: productId,

      })
    );

  };


  // ==========================
  // UI
  // ==========================

  return (

    <div className="product-card">


      {/* ==========================
          PRODUCT IMAGE
      ========================== */}

      <Link
        to={`/product/${product._id}`}
        className="product-image-link"
      >

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

      </Link>


      {/* ==========================
          PRODUCT INFO
      ========================== */}

      <div className="product-info">


        {/* PRODUCT NAME */}

        <h2>
          {product.name}
        </h2>


        {/* CATEGORY */}

        <p className="product-category">
          {product.category}
        </p>


        {/* RATING */}

        <div className="product-rating">

          <FaStar />

          <span>
            {product.rating || "No rating"}
          </span>

        </div>


        {/* PRICE */}

        <h3 className="product-price">
          ₹{product.price}
        </h3>


        {/* BUTTONS */}

        <div className="product-buttons">


          {/* VIEW DETAILS */}

          <Link
            to={`/product/${product._id}`}
            className="view-btn"
          >
            View Details
          </Link>


          {/* ADD / REMOVE CART */}

          <button
            type="button"

            className={`cart-btn ${isInCart
                ? "added-to-cart"
                : ""
              }`}

            onClick={handleCartToggle}
          >

            {isInCart
              ? "✓ Remove From Cart"
              : "Add To Cart"}

          </button>


        </div>


        {/* ADD / REMOVE WISHLIST */}

        <button
          type="button"

          className={`wishlist-card-btn ${isWishlisted
              ? "wishlisted"
              : ""
            }`}

          onClick={handleWishlistToggle}
        >

          <FaHeart />

          {isWishlisted
            ? " Remove from Wishlist"
            : " Add To Wishlist"}

        </button>


      </div>

    </div>

  );

}


export default ProductCard;