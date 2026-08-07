import "./FilterSidebar.css";

function FilterSidebar() {
  return (
    <div className="filter-sidebar">

      <h2>Filters</h2>

      <div className="filter-group">

        <h4>Category</h4>

        <label>
          <input type="checkbox" />
          Laptop
        </label>

        <label>
          <input type="checkbox" />
          Mobile
        </label>

        <label>
          <input type="checkbox" />
          Headphones
        </label>

      </div>

      <div className="filter-group">

        <h4>Price</h4>

        <label>
          <input type="radio" name="price" />
          Under ₹20,000
        </label>

        <label>
          <input type="radio" name="price" />
          ₹20k - ₹50k
        </label>

        <label>
          <input type="radio" name="price" />
          Above ₹50k
        </label>

      </div>

    </div>
  );
}

export default FilterSidebar;