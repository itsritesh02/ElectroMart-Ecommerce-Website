import { FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />

        <h3>{product.name}</h3>
      </Link>

      <div className="rating">
        <FaStar />
        <span>{product.rating}</span>
      </div>

      <h2>₹ {product.price}</h2>

      <button>
        <FaShoppingCart />
        Add To Cart
      </button>

    </div>
  );
}

export default ProductCard;