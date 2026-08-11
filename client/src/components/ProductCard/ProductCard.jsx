import { FaShoppingCart, FaStar, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../redux/slice/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/slice/wishlistSlice";

import "./ProductCard.css";


function ProductCard({ product }) {

  // Redux dispatch
  const dispatch = useDispatch();


  // Wishlist se products lena
  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );


  // Check karna ki product wishlist me already hai ya nahi
  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );


  // Wishlist button
  const handleWishlist = () => {

    if (isWishlisted) {

      dispatch(
        removeFromWishlist(product.id)
      );

    } else {

      dispatch(
        addToWishlist(product)
      );

    }

  };


  // Cart button
  const handleAddToCart = () => {

    dispatch(
      addToCart(product)
    );

  };


  return (

    <div className="product-card">


      {/* =========================
          PRODUCT LINK
      ========================== */}

      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >

        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />


        <h3>
          {product.name}
        </h3>

      </Link>


      {/* =========================
          RATING
      ========================== */}

      <div className="rating">

        <FaStar />

        <span>
          {product.rating}
        </span>

      </div>


      {/* =========================
          PRICE
      ========================== */}

      <h2>
        ₹ {product.price}
      </h2>


      {/* =========================
          WISHLIST
      ========================== */}

      <button
        className={
          isWishlisted
            ? "wishlist-btn active"
            : "wishlist-btn"
        }
        onClick={handleWishlist}
      >

        <FaHeart />

        {isWishlisted
          ? "Remove Wishlist"
          : "Add To Wishlist"
        }

      </button>


      {/* =========================
          CART
      ========================== */}

      <button
        className="cart-btn"
        onClick={handleAddToCart}
      >

        <FaShoppingCart />

        Add To Cart

      </button>


    </div>

  );
}


export default ProductCard;