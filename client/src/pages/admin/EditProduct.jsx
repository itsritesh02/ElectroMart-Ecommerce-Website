import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../services/api";

import "./EditProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================
  // FORM DATA
  // ==========================

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  // ==========================
  // LOADING
  // ==========================

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==========================
  // GET PRODUCT
  // ==========================

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);

        const res = await api.get(
          `/products/${id}`
        );

        const product = res.data.product;

        setFormData({
          name: product.name || "",
          price: product.price || "",
          category: product.category || "",
          description: product.description || "",
          image: product.image || "",
        });
      } catch (error) {
        console.error(
          "Get Product Error:",
          error
        );

        // ==========================
        // ERROR SWEET ALERT
        // ==========================

        await Swal.fire({
          icon: "error",
          title: "Product Not Found",
          text:
            error.response?.data?.message ||
            "Failed to load product.",
          confirmButtonText: "OK",
          confirmButtonColor: "#dc2626",
        });

        navigate("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getProduct();
    }
  }, [id, navigate]);

  // ==========================
  // HANDLE CHANGE
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================
  // UPDATE PRODUCT
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ==========================
    // VALIDATION
    // ==========================

    if (
      !formData.name.trim() ||
      !formData.price ||
      !formData.category.trim() ||
      !formData.description.trim() ||
      !formData.image.trim()
    ) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill all fields.",
        confirmButtonText: "OK",
        confirmButtonColor: "#f59e0b",
      });

      return;
    }

    try {
      setSaving(true);

      // ==========================
      // UPDATE API
      // ==========================

      const res = await api.put(
        `/products/${id}`,
        {
          name: formData.name,
          price: Number(formData.price),
          category: formData.category,
          description: formData.description,
          image: formData.image,
        }
      );

      console.log(
        "PRODUCT UPDATED:",
        res.data
      );

      // ==========================
      // SUCCESS SWEET ALERT
      // ==========================

      await Swal.fire({
        icon: "success",
        title: "Product Updated!",
        text:
          "Product updated successfully.",
        confirmButtonText: "Continue",
        confirmButtonColor: "#111827",
      });

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "Update Product Error:",
        error
      );

      // ==========================
      // ERROR SWEET ALERT
      // ==========================

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Failed to update product.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setSaving(false);
    }
  };

  // ==========================
  // LOADING SCREEN
  // ==========================

  if (loading) {
    return (
      <div className="edit-product-page">

        <div className="products-loading">

          <h2>
            Loading product...
          </h2>

          <p>
            Please wait while we load
            the product details.
          </p>

        </div>

      </div>
    );
  }

  // ==========================
  // PAGE
  // ==========================

  return (
    <div className="edit-product-page">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="edit-product-header">

        <div>

          <h1>
            Edit Product
          </h1>

          <p>
            Update your ElectroMart product
          </p>

        </div>

        <button
          type="button"
          className="back-btn"
          onClick={() =>
            navigate("/admin/products")
          }
          disabled={saving}
        >
          Back
        </button>

      </div>


      {/* ==========================
          FORM
      ========================== */}

      <form
        className="edit-product-form"
        onSubmit={handleSubmit}
      >

        {/* ==========================
            PRODUCT NAME
        ========================== */}

        <div className="form-group">

          <label htmlFor="name">
            Product Name
          </label>

          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            disabled={saving}
          />

        </div>


        {/* ==========================
            PRICE + CATEGORY
        ========================== */}

        <div className="form-row">

          {/* PRICE */}

          <div className="form-group">

            <label htmlFor="price">
              Price
            </label>

            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              min="0"
              disabled={saving}
            />

          </div>


          {/* CATEGORY */}

          <div className="form-group">

            <label htmlFor="category">
              Category
            </label>

            <input
              id="category"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter category"
              disabled={saving}
            />

          </div>

        </div>


        {/* ==========================
            DESCRIPTION
        ========================== */}

        <div className="form-group">

          <label htmlFor="description">
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="5"
            disabled={saving}
          />

        </div>


        {/* ==========================
            IMAGE URL
        ========================== */}

        <div className="form-group">

          <label htmlFor="image">
            Image URL
          </label>

          <input
            id="image"
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            disabled={saving}
          />

        </div>


        {/* ==========================
            IMAGE PREVIEW
        ========================== */}

        {formData.image && (

          <div className="image-preview">

            <p>
              Image Preview
            </p>

            <img
              src={formData.image}
              alt="Product preview"
              onError={(e) => {
                e.currentTarget.style.display =
                  "none";
              }}
            />

          </div>

        )}


        {/* ==========================
            ACTIONS
        ========================== */}

        <div className="form-actions">

          {/* CANCEL */}

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate("/admin/products")
            }
            disabled={saving}
          >
            Cancel
          </button>


          {/* UPDATE */}

          <button
            type="submit"
            className="save-product-btn"
            disabled={saving}
          >
            {saving
              ? "Updating..."
              : "Update Product"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditProduct;