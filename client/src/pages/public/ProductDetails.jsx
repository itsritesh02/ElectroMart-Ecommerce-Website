import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/slice/cartSlice";

import QuantitySelector from "../../components/ProductPage/QuantitySelector";
import SimilarProducts from "../../components/ProductPage/SimilarProducts";

import "./ProductDetails.css";

function ProductDetails() {

  // URL se product id lena
  // Example: /product/2
  // id = "2"
  const { id } = useParams();

  // Redux action ko dispatch karne ke liye
  const dispatch = useDispatch();

  // Temporary products data
  const products = [
    {
      id: 1,
      name: "MacBook Air",
      price: 99999,
      rating: 4.8,
      image: "https://picsum.photos/500?1",
      description:
        "Apple MacBook Air with powerful performance, Retina Display and all day battery.",
    },

    {
      id: 2,
      name: "iPhone 16",
      price: 79999,
      rating: 4.9,
      image: "https://picsum.photos/500?2",
      description:
        "iPhone 16 with powerful performance, beautiful display and advanced camera.",
    },

    {
      id: 3,
      name: "Samsung S26",
      price: 65999,
      rating: 4.7,
      image: "https://picsum.photos/500?3",
      description:
        "Samsung S26 with premium design, powerful processor and excellent camera.",
    },

    {
      id: 4,
      name: "Sony Headphones",
      price: 12999,
      rating: 4.6,
      image: "https://picsum.photos/500?4",
      description:
        "Sony wireless headphones with high quality sound and comfortable design.",
    },
  ];

  // URL se mili id string hoti hai
  // Isliye Number(id) karke number me convert kar rahe hain
  const product = products.find(
    (item) => item.id === Number(id)
  );

  // Console me check karne ke liye
  console.log("URL ID:", id);
  console.log("PRODUCT:", product);

  // Agar product nahi mila
  if (!product) {
    return <h1>Product Not Found</h1>;
  }

  return (
    <div className="details">

      {/* Product Details Section */}
      <div className="details-container">

        {/* Left Side - Product Image */}
        <div className="left">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>

        {/* Right Side - Product Information */}
        <div className="right">

          <h1>{product.name}</h1>

          {/* Rating */}
          <div className="rating">

            <FaStar />

            <span>
              {product.rating}
            </span>

          </div>

          {/* Price */}
          <h2>
            ₹{product.price}
          </h2>

          {/* Description */}
          <p>
            {product.description}
          </p>

          {/* Quantity */}
          <QuantitySelector />

          {/* Add To Cart */}
          <button
            className="cart-btn"
            onClick={() => dispatch(addToCart(product))}
          >
            Add To Cart
          </button>

          {/* Buy Now */}
          <button className="buy-btn">
            Buy Now
          </button>

        </div>

      </div>

      {/* Similar Products */}
      <SimilarProducts />

    </div>
  );
}

export default ProductDetails;