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


  // Input value change
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // Form submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);


    try {

      // Backend API call
      const res = await api.post(
        "/products",
        formData
      );


      console.log(
        "Product Created:",
        res.data
      );


      alert(
        res.data.message ||
        "Product added successfully!"
      );


      // Products page par jao
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


        <h1>
          Add Product
        </h1>


        <p>
          Add a new product to your store
        </p>


        <form onSubmit={handleSubmit}>


          {/* Product Name */}

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


          {/* Price */}

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


          {/* Category */}

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


          {/* Image */}

          <div className="form-group">

            <label>
              Product Image URL
            </label>


            <input
              type="url"
              name="image"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={handleChange}
              required
            />

          </div>


          {/* Description */}

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
              value={formData.description}
              onChange={handleChange}
              required
            />

          </div>


          {/* Buttons */}

          <div className="form-buttons">


            {/* Cancel */}

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


            {/* Submit */}

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >

              {loading
                ? "Adding..."
                : "Add Product"
              }

            </button>


          </div>


        </form>

      </div>

    </div>

  );
}


export default AddProduct;