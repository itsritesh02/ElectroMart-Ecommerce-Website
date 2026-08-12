import "./FilterSidebar.css";


function FilterSidebar({
  category,
  setCategory,
  sort,
  setSort,
}) {

  return (

    <aside className="filter-sidebar">


      {/* ==========================
          FILTER TITLE
      ========================== */}

      <div className="filter-header">

        <h2>
          Filters
        </h2>

      </div>


      {/* ==========================
          CATEGORY
      ========================== */}

      <div className="filter-section">

        <h3>
          Category
        </h3>


        <label>

          <input
            type="radio"
            name="category"
            value="All"
            checked={category === "All"}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          All Products

        </label>


        <label>

          <input
            type="radio"
            name="category"
            value="Mobile"
            checked={category === "Mobile"}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          Mobile

        </label>


        <label>

          <input
            type="radio"
            name="category"
            value="Laptop"
            checked={category === "Laptop"}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          Laptop

        </label>


        <label>

          <input
            type="radio"
            name="category"
            value="Headphones"
            checked={category === "Headphones"}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          Headphones

        </label>


        <label>

          <input
            type="radio"
            name="category"
            value="Tablet"
            checked={category === "Tablet"}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          Tablet

        </label>


        <label>

          <input
            type="radio"
            name="category"
            value="Accessories"
            checked={category === "Accessories"}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          Accessories

        </label>

      </div>


      {/* ==========================
          SORT
      ========================== */}

      <div className="filter-section">

        <h3>
          Sort By
        </h3>


        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >

          <option value="">
            Default
          </option>


          <option value="low-high">
            Price: Low to High
          </option>


          <option value="high-low">
            Price: High to Low
          </option>

        </select>

      </div>


      {/* ==========================
          CLEAR FILTER
      ========================== */}

      <button
        className="clear-filter-btn"
        onClick={() => {

          setCategory("All");

          setSort("");

        }}
      >
        Clear Filters
      </button>


    </aside>

  );

}


export default FilterSidebar;