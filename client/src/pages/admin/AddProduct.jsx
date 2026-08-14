
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.description ||
      !formData.image
    ) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        "/products",
        {
          name: formData.name,
          price: Number(formData.price),
          category: formData.category,
          description: formData.description,
          image: formData.image,
        }
      );

      console.log(
        "PRODUCT ADDED:",
        res.data
      );

      alert(
        "Product added successfully"
      );

      navigate("/admin/products");
    } catch (error) {
      console.error(
        "Add Product Error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-product-page">

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
          onClick={() =>
            navigate("/admin/products")
          }
        >
          Back
        </button>

      </div>


      <form
        className="add-product-form"
        onSubmit={handleSubmit}
      >

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
          />

        </div>


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
              placeholder="Enter category"
            />

          </div>

        </div>


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
          />

        </div>


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
          />

        </div>


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


        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate("/admin/products")
            }
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
              ? "Adding..."
              : "Add Product"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddProduct;

