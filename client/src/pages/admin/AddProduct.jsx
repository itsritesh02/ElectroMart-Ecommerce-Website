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

  // ==========================
  // INPUT CHANGE
  // ==========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================
  // ADD PRODUCT
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
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

      alert(
        res.data.message ||
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

      <div className="add-product-card">

        {/* ==========================
            HEADER
        ========================== */}

        <h1>
          Add Product
        </h1>

        <p>
          Add a new product to your store
        </p>


        <form onSubmit={handleSubmit}>

          {/* PRODUCT NAME */}

          <div className="form-group">

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* PRICE */}

          <div className="form-group">

            <label>
              Price
            </label>

            <input
              type="number"
              name="price"
              placeholder="Enter product price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
            />

          </div>


          {/* CATEGORY */}

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Category
              </option>

              <option value="Mobile">
                Mobile
              </option>

              <option value="Laptop">
                Laptop
              </option>

              <option value="Headphones">
                Headphones
              </option>

              <option value="Tablet">
                Tablet
              </option>

              <option value="Accessories">
                Accessories
              </option>

            </select>

          </div>


          {/* IMAGE */}

          <div className="form-group">

            <label>
              Product Image URL
            </label>

            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
              required
            />

          </div>


          {/* DESCRIPTION */}

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />

          </div>


          {/* BUTTONS */}

          <div className="form-buttons">

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
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Adding..."
                : "Add Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddProduct;