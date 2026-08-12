import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaStar, FaHeart } from "react-icons/fa";

import { addToCart } from "../../redux/slice/cartSlice";
import { addToWishlist } from "../../redux/slice/wishlistSlice";

import "./ProductCard.css";


function ProductCard({ product }) {

  const dispatch = useDispatch();


  // ==========================
  // ADD TO CART
  // ==========================

  const handleAddToCart = () => {

    dispatch(
      addToCart({
        product,
        quantity: 1,
      })
    );

    alert("Product added to cart");

  };


  // ==========================
  // ADD TO WISHLIST
  // ==========================

  const handleAddToWishlist = () => {

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
          PRODUCT DETAILS
      ========================== */}

      <div className="product-info">


        {/* Product Name */}

        <h2>
          {product.name}
        </h2>


        {/* Category */}

        <p className="product-category">
          {product.category}
        </p>


        {/* Rating */}

        <div className="product-rating">

          <FaStar />

          <span>
            {product.rating || "No rating"}
          </span>

        </div>


        {/* Price */}

        <h3 className="product-price">
          ₹{product.price}
        </h3>


        {/* ==========================
            BUTTONS
        ========================== */}

        <div className="product-buttons">


          {/* View Details */}

          <Link
            to={`/product/${product._id}`}
            className="view-btn"
          >
            View Details
          </Link>


          {/* Add To Cart */}

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
          className="wishlist-card-btn"
          onClick={handleAddToWishlist}
        >

          <FaHeart />

          Add To Wishlist

        </button>


      </div>

    </div>

  );

}


export default ProductCard;