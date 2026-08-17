import { useEffect, useState } from "react";

import api from "../../services/api";

import ProductCard from "../ProductCard/ProductCard";

import "./FeaturedProducts.css";


function FeaturedProducts() {

  // ==========================
  // PRODUCTS
  // ==========================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  // ==========================
  // GET PRODUCTS
  // ==========================

  useEffect(() => {

    const getProducts = async () => {

      try {

        const res = await api.get("/products");

        console.log(
          "FEATURED PRODUCTS:",
          res.data
        );

        const allProducts =
          res.data.products || [];


        // ==========================
        // LATEST 4 PRODUCTS
        // ==========================

        setProducts(
          allProducts.slice(0, 4)
        );


      } catch (error) {

        console.error(
          "Featured Products Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    getProducts();

  }, []);


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <section className="featured">

        <h2>
          Featured Products
        </h2>

        <p>
          Loading products...
        </p>

      </section>

    );

  }


  // ==========================
  // NO PRODUCTS
  // ==========================

  if (products.length === 0) {

    return (

      <section className="featured">

        <h2>
          Featured Products
        </h2>

        <p>
          No products available.
        </p>

      </section>

    );

  }


  // ==========================
  // UI
  // ==========================

  return (

    <section className="featured">

      <div className="featured-header">

        <div>

          <span className="featured-label">
            OUR PRODUCTS
          </span>

          <h2>
            Featured Products
          </h2>

          <p>
            Discover some of our latest
            products.
          </p>

        </div>

      </div>


      <div className="product-grid">

        {products.map((product) => (

          <ProductCard
            key={product._id}
            product={product}
          />

        ))}

      </div>

    </section>

  );

}


export default FeaturedProducts;