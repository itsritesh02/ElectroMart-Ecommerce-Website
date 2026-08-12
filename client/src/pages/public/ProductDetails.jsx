import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slice/cartSlice";

import QuantitySelector from "../../components/ProductPage/QuantitySelector";
import SimilarProducts from "../../components/ProductPage/SimilarProducts";

import api from "../../services/api";

import "./ProductDetails.css";


function ProductDetails() {

  const { id } = useParams();

  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);


  // ==========================
  // GET PRODUCT
  // ==========================

  useEffect(() => {

    const getProduct = async () => {

      try {

        const res = await api.get(`/products/${id}`);

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


        {/* Product Image */}

        <div className="left">

          <img
            src={product.image}
            alt={product.name}
          />

        </div>


        {/* Product Information */}

        <div className="right">

          <h1>
            {product.name}
          </h1>


          {/* Rating */}

          <div className="rating">

            <FaStar />

            <span>
              {product.rating || "No rating"}
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

    </>

  );

}


export default ProductDetails;