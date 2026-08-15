
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./AdminProducts.css";

function AdminProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await api.get("/products");

        setProducts(res.data.products || []);
      } catch (error) {
        console.error("Get Products Error:", error);

        alert(
          error.response?.data?.message ||
            "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(productId);

      await api.delete(
        `/products/${productId} `
      );

      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) =>
            product._id !== productId
        )
      );

      alert(
        "Product deleted successfully"
      );
    } catch (error) {
      console.error(
        "Delete Product Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="admin-products">
        <h2>Loading products...</h2>
      </div>
    );
  }

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <div>
          <h1>Products</h1>

          <p>
            Manage your ElectroMart products
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
          + Add Product
        </button>
      </div>

      <div className="products-count">
        Total Products:
        <strong>{products.length}</strong>
      </div>

      {products.length === 0 ? (
        <div className="no-products">
          <h2>No Products Found</h2>

          <p>
            Add your first product to get
            started.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/products/add"
              )
            }
          >
            Add Product
          </button>
        </div>
      ) : (
        <div className="admin-products-grid">
          {products.map((product) => (
            <div
              className="admin-product-card"
              key={product._id}
            >
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
              </div>

              <div className="admin-product-info">
                <h2>{product.name}</h2>

                <p className="product-category">
                  {product.category}
                </p>

                <p className="product-description">
                  {product.description}
                </p>

                <strong className="product-price">
                  ₹{product.price}
                </strong>
              </div>

              <div className="admin-product-actions">
                <button
                  type="button"
                  className="edit-product-btn"
                  onClick={() =>
                    navigate(
                      `/admin/products/edit/${product._id} `
                    )
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-product-btn"
                  onClick={() =>
                    handleDelete(product._id)
                  }
                  disabled={
                    deletingId === product._id
                  }
                >
                  {deletingId === product._id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminProducts;

