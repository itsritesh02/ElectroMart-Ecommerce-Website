import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaHeart } from "react-icons/fa";

import { addToCart } from "../../redux/slice/cartSlice";
import { addToWishlist } from "../../redux/slice/wishlistSlice";

import "./ProductCard.css";


function ProductCard({ product }) {

  const dispatch = useDispatch();


  // ==========================
  // GET WISHLIST FROM REDUX
  // ==========================

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );


  // ==========================
  // CHECK WISHLIST
  // ==========================

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product._id
  );


  // ==========================
  // ADD TO CART
  // ==========================

  const handleAddToCart = () => {

    dispatch(
      addToCart({
        ...product,
        quantity: 1,
      })
    );

    alert("Product added to cart");
  };


  // ==========================
  // ADD TO WISHLIST
  // ==========================

  const handleAddToWishlist = () => {

    if (isWishlisted) {

      alert("Product already in wishlist");

      return;

    }


    dispatch(
      addToWishlist(product)
    );

    alert("Product added to wishlist");

  };


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


        {/* ==========================
            BUTTONS
        ========================== */}

        <div className="product-buttons">


          {/* VIEW DETAILS */}

          <Link
            to={`/product/${product._id}`}
            className="view-btn"
          >
            View Details
          </Link>


          {/* ADD TO CART */}

          <button
            type="button"
            className="cart-btn"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>


        </div>


        {/* ==========================
            WISHLIST
        ========================== */}

        <button
          type="button"
          className={`wishlist-card-btn ${isWishlisted
              ? "wishlisted"
              : ""
            }`}
          onClick={handleAddToWishlist}
        >

          <FaHeart />

          {isWishlisted
            ? "Wishlisted"
            : "Add To Wishlist"
          }

        </button>


      </div>

    </div>

  );

}


export default ProductCard;