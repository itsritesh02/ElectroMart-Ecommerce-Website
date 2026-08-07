import FilterSidebar from "../../components/Product/FilterSidebar"
import ProductGrid from "../../components/Product/ProductGrid"
import SearchBar from "../../components/Product/SearchBar"

import './Product.css'
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
  )
}

export default Product
