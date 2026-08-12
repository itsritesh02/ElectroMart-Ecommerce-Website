import { useEffect, useState } from "react";

import api from "../../services/api";

import SearchBar from "../../components/ProductPage/SearchBar";
import FilterSidebar from "../../components/ProductPage/FilterSidebar";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./Product.css";


function Product() {

  // ==========================
  // PRODUCTS
  // ==========================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  // ==========================
  // SEARCH
  // ==========================

  const [search, setSearch] = useState("");


  // ==========================
  // CATEGORY
  // ==========================

  const [category, setCategory] = useState("All");


  // ==========================
  // SORT
  // ==========================

  const [sort, setSort] = useState("");


  // ==========================
  // GET PRODUCTS
  // ==========================

  useEffect(() => {

    const getProducts = async () => {

      try {

        const res = await api.get("/products");

        setProducts(res.data.products || []);

      } catch (error) {

        console.error(
          "Fetch Products Error:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    getProducts();

  }, []);


  // ==========================
  // FILTER PRODUCTS
  // ==========================

  let filteredProducts = products.filter((product) => {

    const searchMatch =
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());


    const categoryMatch =
      category === "All" ||
      product.category === category;


    return searchMatch && categoryMatch;

  });


  // ==========================
  // SORT PRODUCTS
  // ==========================

  if (sort === "low-high") {

    filteredProducts.sort(
      (a, b) => a.price - b.price
    );

  }


  if (sort === "high-low") {

    filteredProducts.sort(
      (a, b) => b.price - a.price
    );

  }


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <div className="products-page">

        <h2>
          Loading Products...
        </h2>

      </div>

    );

  }


  return (

    <div className="products-page">


      {/* ==========================
          SEARCH BAR
      ========================== */}

      <SearchBar
        search={search}
        setSearch={setSearch}
      />


      <div className="products-container">


        {/* ==========================
            FILTER SIDEBAR
        ========================== */}

        <div className="left">

          <FilterSidebar
            category={category}
            setCategory={setCategory}
            sort={sort}
            setSort={setSort}
          />

        </div>


        {/* ==========================
            PRODUCTS
        ========================== */}

        <div className="right">


          <h1>
            All Products
          </h1>


          <p>
            {filteredProducts.length} products found
          </p>


          {filteredProducts.length === 0 ? (

            <div className="no-products">

              <h2>
                No Products Found
              </h2>

              <p>
                Try another search or category.
              </p>

            </div>

          ) : (

            <div className="product-grid">

              {filteredProducts.map((product) => (

                <ProductCard
                  key={product._id}
                  product={product}
                />

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  );

}


export default Product;