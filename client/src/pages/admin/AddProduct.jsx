import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import api from "../../services/api";

import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);

  // ==========================
  // HANDLE INPUT CHANGE
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================
  // SUBMIT PRODUCT
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
        text: "Please fill all product fields.",
        confirmButtonText: "OK",
      });

      return;
    }

    // ==========================
    // PRICE VALIDATION
    // ==========================

    if (Number(formData.price) <= 0) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Price",
        text: "Product price must be greater than 0.",
        confirmButtonText: "OK",
      });

      return;
    }

    try {
      setLoading(true);

      // ==========================
      // API REQUEST
      // ==========================

      const res = await api.post("/products", {
        name: formData.name.trim(),
        price: Number(formData.price),
        category: formData.category.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
      });

      console.log("PRODUCT ADDED:", res.data);

      // ==========================
      // SUCCESS ALERT
      // ==========================

      await Swal.fire({
        icon: "success",
        title: "Product Added!",
        text:
          res.data?.message ||
          "Product added successfully.",
        confirmButtonText: "Continue",
        confirmButtonColor: "#111827",
      });

      // ==========================
      // REDIRECT
      // ==========================

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "Add Product Error:",
        error
      );

      // ==========================
      // ERROR ALERT
      // ==========================

      Swal.fire({
        icon: "error",
        title: "Failed to Add Product",
        text:
          error.response?.data?.message ||
          "Something went wrong while adding the product.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // BACK
  // ==========================

  const handleBack = () => {
    if (loading) return;

    navigate("/admin/products");
  };

  // ==========================
  // CANCEL
  // ==========================

  const handleCancel = async () => {
    if (loading) return;

    const result = await Swal.fire({
      icon: "question",
      title: "Discard Product?",
      text: "Your entered product information will be lost.",
      showCancelButton: true,
      confirmButtonText: "Yes, Leave",
      cancelButtonText: "Stay",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (result.isConfirmed) {
      navigate("/admin/products");
    }
  };

  return (
    <div className="add-product-page">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="add-product-header">

        <div>
          <h1>
            Add Product
          </h1>

          <p>
            Add a new product to ElectroMart
          </p>
        </div>

        <button
          type="button"
          className="back-btn"
          onClick={handleBack}
          disabled={loading}
        >
          ← Back
        </button>

      </div>


      {/* ==========================
          FORM
      ========================== */}

      <form
        className="add-product-form"
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
            disabled={loading}
          />

        </div>


        {/* ==========================
            PRICE + CATEGORY
        ========================== */}

        <div className="form-row">

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
              disabled={loading}
            />

          </div>


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
              placeholder="e.g. Mobile, Laptop, Headphones"
              disabled={loading}
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
            disabled={loading}
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
            disabled={loading}
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
            FORM ACTIONS
        ========================== */}

        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="save-product-btn"
            disabled={loading}
          >
            {loading
              ? "Adding Product..."
              : "Add Product"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddProduct;