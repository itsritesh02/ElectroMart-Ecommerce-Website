
import { FaSearch, FaTimes } from "react-icons/fa";

import "./SearchBar.css";


function SearchBar({
  search,
  setSearch,
}) {

  // ==========================
  // CLEAR SEARCH
  // ==========================

  const handleClear = () => {
    setSearch("");
  };


  // ==========================
  // SEARCH
  // ==========================

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  return (

    <form
      className="search-bar-container"
      onSubmit={handleSubmit}
    >

      {/* ==========================
          SEARCH INPUT
      ========================== */}

      <div className="search-input-wrapper">

        <FaSearch className="search-icon" />

        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search products..."
        />


        {/* ==========================
            CLEAR BUTTON
        ========================== */}

        {search && (

          <button
            type="button"
            className="clear-search-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            <FaTimes />
          </button>

        )}

      </div>


      {/* ==========================
          SEARCH BUTTON
      ========================== */}

      <button
        type="submit"
        className="search-submit-btn"
      >
        <FaSearch />

        <span>
          Search
        </span>
      </button>

    </form>

  );

}


export default SearchBar;
