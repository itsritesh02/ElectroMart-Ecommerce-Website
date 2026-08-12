import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import api from "../../services/api";

import { addToCart } from "../../redux/slice/cartSlice";

import QuantitySelector from "../../components/ProductPage/QuantitySelector";
import SimilarProducts from "../../components/ProductPage/SimilarProducts";

import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // ==========================
  // PRODUCT
  // ==========================

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  // ==========================
  // QUANTITY
  // ==========================

  const [quantity, setQuantity] = useState(1);

  // ==========================
  // GET SINGLE PRODUCT
  // ==========================

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await api.get(
          `/products/${id}`
        );

        console.log("PRODUCT:", res.data);

        setProduct(res.data.product);

      } catch (error) {
        console.error(
          "Fetch Product Error:",
          error
        );

      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  // ==========================
  // ADD TO CART
  // ==========================
  const handleAddToCart = () => {

    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    alert(
      `${quantity} product added to cart`
    );
  };

  // ==========================
  // BUY NOW
  // ==========================

  const handleBuyNow = () => {

    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    navigate("/cart");
  };
  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <div className="details-container">

        <h2>
          Loading Product...
        </h2>

      </div>
    );
  }

  // ==========================
  // PRODUCT NOT FOUND
  // ==========================

  if (!product) {
    return (
      <div className="details-container">

        <h2>
          Product Not Found
        </h2>

      </div>
    );
  }

  return (
    <>
      <div className="details-container">

        {/* ==========================
            PRODUCT IMAGE
        ========================== */}

        <div className="left">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>


        {/* ==========================
            PRODUCT INFORMATION
        ========================== */}

        <div className="right">

          <h1>
            {product.name}
          </h1>


          {/* CATEGORY */}

          <p className="product-category">
            Category: {product.category}
          </p>


          {/* RATING */}

          <div className="rating">

            <FaStar />

            <span>
              {product.rating || "No rating"}
            </span>

          </div>


          {/* PRICE */}

          <h2>
            ₹{product.price}
          </h2>


          {/* DESCRIPTION */}

          <p>
            {product.description}
          </p>


          {/* QUANTITY */}

          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
          />


          {/* BUTTONS */}

          <div className="details-buttons">

            <button
              type="button"
              className="cart-btn"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>


            <button
              type="button"
              className="buy-btn"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>


      {/* ==========================
          SIMILAR PRODUCTS
      ========================== */}

      <SimilarProducts
        category={product.category}
        currentProductId={product._id}
      />

    </>
  );
}

export default ProductDetails;