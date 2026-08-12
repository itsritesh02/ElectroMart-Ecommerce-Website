import "./SearchBar.css";

function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar-container">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="button">
        Search
      </button>

    </div>
  );
}

export default SearchBar;