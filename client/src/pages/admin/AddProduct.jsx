
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./AddProduct.css";


function AddProduct() {

  const navigate = useNavigate();


  // ==========================
  // PRODUCT STATE
  // ==========================

  const [name, setName] = useState("");

  const [price, setPrice] = useState("");

  const [category, setCategory] =
    useState("");

  const [description, setDescription] =
    useState("");


  // ==========================
  // IMAGE STATE
  // ==========================

  const [image, setImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");


  // ==========================
  // LOADING
  // ==========================

  const [loading, setLoading] =
    useState(false);


  // ==========================
  // IMAGE CHANGE
  // ==========================

  const handleImageChange = (e) => {

    const file =
      e.target.files[0];


    if (!file) {

      return;

    }


    // ==========================
    // CHECK IMAGE TYPE
    // ==========================

    if (
      !file.type.startsWith("image/")
    ) {

      alert(
        "Please select an image file"
      );

      return;

    }


    // ==========================
    // CHECK IMAGE SIZE
    // ==========================

    if (
      file.size > 5 * 1024 * 1024
    ) {

      alert(
        "Image size must be less than 5MB"
      );

      return;

    }


    setImage(file);


    // ==========================
    // IMAGE PREVIEW
    // ==========================

    setImagePreview(
      URL.createObjectURL(file)
    );

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
      !name ||
      !price ||
      !category ||
      !description
    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }


    if (!image) {

      alert(
        "Please select a product image"
      );

      return;

    }


    try {

      setLoading(true);


      // ==========================
      // UPLOAD IMAGE
      // ==========================

      const formData =
        new FormData();


      formData.append(
        "image",
        image
      );


      const uploadRes =
        await api.post(
          "/upload/image",
          formData
        );


      console.log(
        "IMAGE UPLOAD:",
        uploadRes.data
      );


      const imageUrl =
        uploadRes.data.imageUrl;


      // ==========================
      // CREATE PRODUCT
      // ==========================

      const productData = {

        name,

        price: Number(price),

        category,

        description,

        image: imageUrl,

      };


      const productRes =
        await api.post(
          "/products",
          productData
        );


      console.log(
        "PRODUCT CREATED:",
        productRes.data
      );


      alert(
        "Product added successfully"
      );


      // ==========================
      // REDIRECT
      // ==========================

      navigate(
        "/admin/products"
      );


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


      {/* ==========================
          HEADER
      ========================== */}

      <div className="add-product-header">

        <h1>
          Add Product
        </h1>

        <p>
          Add a new product to ElectroMart
        </p>

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

          <label>
            Product Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="Enter product name"
          />

        </div>


        {/* ==========================
            PRICE
        ========================== */}

        <div className="form-group">

          <label>
            Price
          </label>

          <input
            type="number"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            placeholder="Enter product price"
            min="0"
          />

        </div>


        {/* ==========================
            CATEGORY
        ========================== */}

        <div className="form-group">

          <label>
            Category
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            placeholder="Enter product category"
          />

        </div>


        {/* ==========================
            DESCRIPTION
        ========================== */}

        <div className="form-group">

          <label>
            Description
          </label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(
                e.target.value
              )
            }
            placeholder="Enter product description"
            rows="5"
          />

        </div>


        {/* ==========================
            IMAGE
        ========================== */}

        <div className="form-group">

          <label>
            Product Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

        </div>


        {/* ==========================
            IMAGE PREVIEW
        ========================== */}

        {imagePreview && (

          <div className="image-preview">

            <p>
              Image Preview
            </p>

            <img
              src={imagePreview}
              alt="Product Preview"
            />

          </div>

        )}


        {/* ==========================
            BUTTONS
        ========================== */}

        <div className="form-actions">

          <button
            type="button"
            className="cancel-btn"
            onClick={() =>
              navigate(
                "/admin/products"
              )
            }
            disabled={loading}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="add-product-btn"
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
