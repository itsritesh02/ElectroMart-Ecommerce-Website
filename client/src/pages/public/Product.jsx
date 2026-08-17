import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import api from "../../services/api";

import FilterSidebar from "../../components/ProductPage/FilterSidebar";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./Product.css";

function Product() {
  // ==========================
  // URL SEARCH PARAMS
  // ==========================

  const [searchParams] = useSearchParams();

  // ==========================
  // PRODUCTS
  // ==========================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  // ==========================
  // CATEGORY
  // ==========================

  const [category, setCategory] = useState(
    searchParams.get("category") || "All"
  );

  // ==========================
  // SORT
  // ==========================

  const [sort, setSort] = useState("");

  // ==========================
  // UPDATE CATEGORY FROM URL
  // ==========================

  useEffect(() => {
    const categoryFromURL =
      searchParams.get("category");

    setCategory(
      categoryFromURL || "All"
    );
  }, [searchParams]);

  // ==========================
  // GET PRODUCTS
  // ==========================

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          "/products"
        );

        setProducts(
          res.data.products || []
        );
      } catch (error) {
        console.error(
          "Fetch Products Error:",
          error
        );

        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // ==========================
  // FILTER PRODUCTS
  // ==========================

  let filteredProducts =
    products.filter((product) => {
      const categoryMatch =
        category === "All" ||
        product.category?.toLowerCase() ===
        category.toLowerCase();

      return categoryMatch;
    });

  // ==========================
  // SORT PRODUCTS
  // ==========================

  if (sort === "low-high") {
    filteredProducts = [
      ...filteredProducts,
    ].sort(
      (a, b) =>
        Number(a.price) -
        Number(b.price)
    );
  }

  if (sort === "high-low") {
    filteredProducts = [
      ...filteredProducts,
    ].sort(
      (a, b) =>
        Number(b.price) -
        Number(a.price)
    );
  }

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <div className="products-page">
        <div className="products-loading">
          <h2>
            Loading Products...
          </h2>

          <p>
            Please wait while we fetch
            the latest products.
          </p>
        </div>
      </div>
    );
  }

  // ==========================
  // PAGE
  // ==========================

  return (
    <div className="products-page">

      <div className="products-container">

        {/* FILTER SIDEBAR */}

        <aside className="left">
          <FilterSidebar
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
          />
        </aside>

        {/* PRODUCTS */}

        <main className="right">

          <div className="products-heading">

            <div>

              <h1>
                {category !== "All"
                  ? category
                  : "All Products"}
              </h1>

              <p>
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1
                  ? "product"
                  : "products"}{" "}
                found
              </p>

            </div>

          </div>

          {filteredProducts.length === 0 ? (

            <div className="no-products">

              <h2>
                No Products Found
              </h2>

              <p>
                No products available in{" "}
                {category}.
              </p>

              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setSort("");
                }}
              >
                Clear Filters
              </button>

            </div>

          ) : (

            <div className="product-grid">

              {filteredProducts.map(
                (product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                )
              )}

            </div>

          )}

        </main>

      </div>

    </div>
  );
}

export default Product;