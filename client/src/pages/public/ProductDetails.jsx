import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import Swal from "sweetalert2";

import api from "../../services/api";

import {
  addToCart,
  removeFromCart,
} from "../../redux/slice/cartSlice";

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
  // GET AUTH STATE
  // ==========================

  const isAuthenticated = useSelector(
    (state) =>
      state.auth?.isAuthenticated
  );


  // ==========================
  // GET CART ITEMS
  // ==========================

  const cartItems = useSelector(
    (state) =>
      state.cart?.items || []
  );


  // ==========================
  // CHECK PRODUCT IN CART
  // ==========================

  const isInCart = cartItems.some(
    (item) => {

      const cartId =
        item.id || item._id;

      return (
        String(cartId) ===
        String(product?._id)
      );

    }
  );


  // ==========================
  // LOGIN REQUIRED
  // ==========================

  const showLoginFirst = () => {

    Swal.fire({

      icon: "warning",

      title: "Login First",

      text:
        "Please login first to continue shopping.",

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


  // ==========================
  // GET SINGLE PRODUCT
  // ==========================

  useEffect(() => {

    const getProduct = async () => {

      try {

        setLoading(true);

        const res = await api.get(
          `/products/${id}`
        );

        console.log(
          "PRODUCT:",
          res.data
        );

        setProduct(
          res.data.product
        );

      } catch (error) {

        console.error(
          "Fetch Product Error:",
          error
        );

        setProduct(null);

      } finally {

        setLoading(false);

      }

    };


    if (id) {

      getProduct();

    }

  }, [id]);


  // ==========================
  // ADD / REMOVE FROM CART
  // ==========================

  const handleAddToCart = () => {


    // ==========================
    // CHECK LOGIN
    // ==========================

    if (!isAuthenticated) {

      showLoginFirst();

      return;

    }


    // ==========================
    // PRODUCT NOT AVAILABLE
    // ==========================

    if (!product) {

      return;

    }


    // ==========================
    // IF ALREADY IN CART
    // REMOVE PRODUCT
    // ==========================

    if (isInCart) {

      dispatch(
        removeFromCart(product._id)
      );

      return;

    }


    // ==========================
    // ADD PRODUCT TO CART
    // ==========================

    dispatch(
      addToCart({

        id: product._id,

        _id: product._id,

        name: product.name,

        price: Number(product.price),

        image: product.image,

        category: product.category,

        quantity: Number(quantity),

      })
    );

  };


  // ==========================
  // BUY NOW
  // ==========================

  const handleBuyNow = () => {


    // ==========================
    // CHECK LOGIN
    // ==========================

    if (!isAuthenticated) {

      showLoginFirst();

      return;

    }


    if (!product) {

      return;

    }


    // ==========================
    // IF PRODUCT NOT IN CART
    // ADD FIRST
    // ==========================

    if (!isInCart) {

      dispatch(
        addToCart({

          id: product._id,

          _id: product._id,

          name: product.name,

          price: Number(product.price),

          image: product.image,

          category: product.category,

          quantity: Number(quantity),

        })
      );

    }


    // ==========================
    // GO TO CART
    // ==========================

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

            Category:{" "}

            {product.category}

          </p>


          {/* RATING */}

          <div className="rating">

            <FaStar />

            <span>

              {product.rating ||
                "No rating"}

            </span>

          </div>


          {/* PRICE */}

          <h2>

            ₹{Number(product.price)}

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


            {/* ADD / REMOVE CART */}

            <button
              type="button"
              className={
                isInCart
                  ? "cart-btn added-cart-btn"
                  : "cart-btn"
              }
              onClick={handleAddToCart}
            >

              {isInCart
                ? "Remove From Cart"
                : "Add To Cart"}

            </button>


            {/* BUY NOW */}

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


      {/* SIMILAR PRODUCTS */}

      <SimilarProducts
        category={product.category}
        currentProductId={product._id}
      />

    </>

  );

}


export default ProductDetails;