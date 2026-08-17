import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../services/api";

import "./AdminProducts.css";

function AdminProducts() {
  const navigate = useNavigate();

  // ==========================
  // PRODUCTS
  // ==========================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState(null);

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

  const [sort, setSort] = useState("default");

  // ==========================
  // GET PRODUCTS
  // ==========================

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);

        const res = await api.get("/products");

        setProducts(res.data.products || []);
      } catch (error) {
        console.error(
          "Get Products Error:",
          error
        );

        setProducts([]);

        // ==========================
        // ERROR SWEET ALERT
        // ==========================

        Swal.fire({
          icon: "error",
          title: "Failed to Load Products",
          text:
            error.response?.data?.message ||
            "Unable to fetch products.",
          confirmButtonText: "OK",
          confirmButtonColor: "#dc2626",
        });
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // ==========================
  // CATEGORIES
  // ==========================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return uniqueCategories.sort();
  }, [products]);

  // ==========================
  // FILTER + SEARCH + SORT
  // ==========================

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // ==========================
    // SEARCH
    // ==========================

    if (search.trim()) {
      const searchText = search
        .toLowerCase()
        .trim();

      result = result.filter((product) => {
        return (
          product.name
            ?.toLowerCase()
            .includes(searchText) ||
          product.category
            ?.toLowerCase()
            .includes(searchText) ||
          product.description
            ?.toLowerCase()
            .includes(searchText)
        );
      });
    }

    // ==========================
    // CATEGORY
    // ==========================

    if (category !== "All") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    // ==========================
    // SORT
    // ==========================

    if (sort === "low-high") {
      result.sort(
        (a, b) => a.price - b.price
      );
    }

    if (sort === "high-low") {
      result.sort(
        (a, b) => b.price - a.price
      );
    }

    if (sort === "newest") {
      result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    return result;
  }, [
    products,
    search,
    category,
    sort,
  ]);

  // ==========================
  // DELETE PRODUCT
  // ==========================

  const handleDelete = async (productId) => {
    // ==========================
    // CONFIRM DELETE
    // ==========================

    const result = await Swal.fire({
      icon: "warning",
      title: "Delete Product?",
      text:
        "Are you sure you want to delete this product?",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      reverseButtons: true,
    });

    // ==========================
    // CANCEL
    // ==========================

    if (!result.isConfirmed) {
      return;
    }

    try {
      setDeletingId(productId);

      // ==========================
      // DELETE API
      // ==========================

      await api.delete(
        `/products/${productId}`
      );

      // ==========================
      // REMOVE FROM UI
      // ==========================

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) =>
            product._id !== productId
        )
      );

      // ==========================
      // SUCCESS ALERT
      // ==========================

      Swal.fire({
        icon: "success",
        title: "Product Deleted!",
        text:
          "Product deleted successfully.",
        confirmButtonText: "OK",
        confirmButtonColor: "#111827",
      });
    } catch (error) {
      console.error(
        "Delete Product Error:",
        error
      );

      // ==========================
      // ERROR ALERT
      // ==========================

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error.response?.data?.message ||
          "Failed to delete product.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================
  // CLEAR FILTERS
  // ==========================

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
  };

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <div className="admin-products">

        <div className="products-loading">

          <h2>
            Loading products...
          </h2>

        </div>

      </div>
    );
  }

  // ==========================
  // PAGE
  // ==========================

  return (
    <div className="admin-products">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="admin-products-header">

        <div>

          <span className="page-label">
            PRODUCT MANAGEMENT
          </span>

          <h1>
            Manage Products
          </h1>

          <p>
            Search, filter, edit and manage
            your ElectroMart products.
          </p>

        </div>

        <button
          type="button"
          className="add-product-btn"
          onClick={() =>
            navigate(
              "/admin/products/add"
            )
          }
        >
          <span>+</span>
          Add Product
        </button>

      </div>


      {/* ==========================
          SEARCH + FILTER BAR
      ========================== */}

      <div className="product-toolbar">

        {/* SEARCH */}

        <div className="product-search">

          <span className="search-icon">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              type="button"
              className="clear-search"
              onClick={() =>
                setSearch("")
              }
            >
              ×
            </button>
          )}

        </div>


        {/* CATEGORY */}

        <div className="filter-box">

          <span>
            Category
          </span>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option value="All">
              All Categories
            </option>

            {categories.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

          </select>

        </div>


        {/* SORT */}

        <div className="filter-box">

          <span>
            Sort
          </span>

          <select
            value={sort}
            onChange={(e) =>
              setSort(e.target.value)
            }
          >

            <option value="default">
              Default
            </option>

            <option value="newest">
              Newest
            </option>

            <option value="low-high">
              Price: Low to High
            </option>

            <option value="high-low">
              Price: High to Low
            </option>

          </select>

        </div>

      </div>


      {/* ==========================
          RESULT INFO
      ========================== */}

      <div className="products-result-bar">

        <div>

          <strong>
            {filteredProducts.length}
          </strong>

          <span>
            {" "}
            products found
          </span>

        </div>

        {(search ||
          category !== "All" ||
          sort !== "default") && (

            <button
              type="button"
              className="clear-filters"
              onClick={clearFilters}
            >
              Clear Filters
            </button>

          )}

      </div>


      {/* ==========================
          NO PRODUCTS
      ========================== */}

      {products.length === 0 ? (

        <div className="no-products">

          <div className="empty-icon">
            📦
          </div>

          <h2>
            No Products Found
          </h2>

          <p>
            Add your first product to
            get started.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/products/add"
              )
            }
          >
            + Add Product
          </button>

        </div>

      ) : filteredProducts.length === 0 ? (

        <div className="no-products">

          <div className="empty-icon">
            🔍
          </div>

          <h2>
            No Matching Products
          </h2>

          <p>
            Try another search or category.
          </p>

          <button
            type="button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>

        </div>

      ) : (

        /* ==========================
           PRODUCT GRID
        ========================== */

        <div className="admin-products-grid">

          {filteredProducts.map(
            (product) => (

              <div
                className="admin-product-card"
                key={product._id}
              >

                {/* IMAGE */}

                <div className="admin-product-image">

                  <img
                    src={
                      product.image ||
                      "/placeholder.png"
                    }
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src =
                        "/placeholder.png";
                    }}
                  />

                  <span className="category-badge">
                    {product.category}
                  </span>

                </div>


                {/* INFO */}

                <div className="admin-product-info">

                  <h2>
                    {product.name}
                  </h2>

                  <p className="product-description">
                    {product.description}
                  </p>

                  <div className="product-bottom">

                    <strong className="product-price">
                      ₹
                      {Number(
                        product.price
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                    <span className="product-stock">
                      Product
                    </span>

                  </div>

                </div>


                {/* ACTIONS */}

                <div className="admin-product-actions">

                  <button
                    type="button"
                    className="edit-product-btn"
                    onClick={() =>
                      navigate(
                        `/admin/products/edit/${product._id}`
                      )
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    type="button"
                    className="delete-product-btn"
                    onClick={() =>
                      handleDelete(
                        product._id
                      )
                    }
                    disabled={
                      deletingId ===
                      product._id
                    }
                  >
                    {deletingId ===
                      product._id
                      ? "Deleting..."
                      : "🗑️ Delete"}
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      )}

    </div>
  );
}

export default AdminProducts;