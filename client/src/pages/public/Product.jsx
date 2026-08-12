import FilterSidebar from "../../components/ProductPage/FilterSidebar";
import ProductGrid from "../../components/ProductPage/ProductGrid";
import SearchBar from "../../components/ProductPage/SearchBar";

import "./Product.css";

const Product = () => {
  return (
    <div className="products-page">

      <SearchBar />

      <div className="products-container">

        <div className="left">
          <FilterSidebar />
        </div>

        <div className="right">
          <ProductGrid />
        </div>

      </div>

    </div>
  );
};

export default Product;