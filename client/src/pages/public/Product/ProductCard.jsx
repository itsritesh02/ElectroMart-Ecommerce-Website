import { FaShoppingCart, FaStar } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <h3>{product.name}</h3>

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