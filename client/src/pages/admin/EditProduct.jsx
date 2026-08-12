import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import "./AddProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ==========================
  // GET SINGLE PRODUCT
  // ==========================

  useEffect(() => {
    const fetchProduct = async () => {
      try {
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
          "Fetch Product Error:",
          error
        );

        alert(
          error.response?.data?.message ||
          "Failed to load product"
        );

        navigate("/admin/products");

      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

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
  // UPDATE PRODUCT
  // ==========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUpdating(true);

    try {
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

      alert(
        res.data.message ||
        "Product updated successfully"
      );

      navigate("/admin/products");

    } catch (error) {
      console.error(
        "Update Product Error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to update product"
      );

    } finally {
      setUpdating(false);
    }
  };

  // ==========================
  // LOADING
  // ==========================

  if (loading) {
    return (
      <div className="add-product-page">
        <div className="add-product-card">
          <h2>
            Loading Product...
          </h2>
        </div>
      </div>
    );
  }

  // ==========================
  // PAGE
  // ==========================

  return (
    <div className="add-product-page">

      <div className="add-product-card">

        <h1>
          Edit Product
        </h1>

        <p>
          Update product information
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
              disabled={updating}
            >
              Cancel
            </button>


            <button
              type="submit"
              className="save-btn"
              disabled={updating}
            >
              {updating
                ? "Updating..."
                : "Update Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;