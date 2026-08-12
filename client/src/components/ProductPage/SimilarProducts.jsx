import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./SimilarProducts.css";


function SimilarProducts({ category, currentProductId }) {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  // ==========================
  // GET PRODUCTS
  // ==========================

  useEffect(() => {

    const getSimilarProducts = async () => {

      try {

        const res = await api.get("/products");

        const allProducts =
          res.data.products || [];


        // Same category ke products
        const similarProducts =
          allProducts.filter(
            (product) =>
              product.category === category &&
              product._id !== currentProductId
          );


        setProducts(similarProducts);

      } catch (error) {

        console.error(
          "Similar Products Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    if (category && currentProductId) {

      getSimilarProducts();

    }

  }, [category, currentProductId]);


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <section className="similar-products">

        <h2>
          Similar Products
        </h2>

        <p>
          Loading...
        </p>

      </section>

    );

  }


  // ==========================
  // NO PRODUCTS
  // ==========================

  if (products.length === 0) {

    return null;

  }


  return (

    <section className="similar-products">


      <h2>
        Similar Products
      </h2>


      <div className="similar-products-grid">

        {products.slice(0, 4).map((product) => (

          <div
            className="similar-product-card"
            key={product._id}
          >


            {/* Image */}

            <Link
              to={`/product/${product._id}`}
            >

              <img
                src={product.image}
                alt={product.name}
              />

            </Link>


            {/* Info */}

            <div className="similar-product-info">

              <h3>
                {product.name}
              </h3>


              <p>
                {product.category}
              </p>


              <h4>
                ₹{product.price}
              </h4>


              <Link
                to={`/product/${product._id}`}
                className="similar-view-btn"
              >
                View Product
              </Link>

            </div>

          </div>

        ))}

      </div>

    </section>

  );

}


export default SimilarProducts;