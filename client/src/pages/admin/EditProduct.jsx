
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../../services/api";

import "./EditProduct.css";


function EditProduct() {

  const { id } = useParams();

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

  const [image, setImage] =
    useState(null);

  const [imagePreview, setImagePreview] =
    useState("");


  // ==========================
  // LOADING
  // ==========================

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);


  // ==========================
  // GET PRODUCT
  // ==========================

  useEffect(() => {

    const getProduct = async () => {

      try {

        const res = await api.get(
          `/ products / ${ id } `
        );


        console.log(
          "PRODUCT:",
          res.data
        );


        const product =
          res.data.product;


        setName(
          product.name || ""
        );

        setPrice(
          product.price || ""
        );

        setCategory(
          product.category || ""
        );

        setDescription(
          product.description || ""
        );

        setImagePreview(
          product.image || ""
        );


      } catch (error) {

        console.error(
          "Get Product Error:",
          error
        );


        alert(
          error.response?.data?.message ||
          "Failed to load product"
        );


        navigate(
          "/admin/products"
        );


      } finally {

        setLoading(false);

      }

    };


    if (id) {

      getProduct();

    }

  }, [id, navigate]);


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
    // IMAGE TYPE
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
    // IMAGE SIZE
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
    // PREVIEW
    // ==========================

    setImagePreview(
      URL.createObjectURL(file)
    );

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


    try {

      setSaving(true);


      let imageUrl =
        imagePreview;


      // ==========================
      // UPLOAD NEW IMAGE
      // ==========================

      if (image) {

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


        imageUrl =
          uploadRes.data.imageUrl;

      }


      // ==========================
      // UPDATE PRODUCT
      // ==========================

      const productData = {

        name,

        price: Number(price),

        category,

        description,

        image: imageUrl,

      };


      const res =
        await api.put(
          `/ products / ${ id } `,
          productData
        );


      console.log(
        "PRODUCT UPDATED:",
        res.data
      );


      alert(
        "Product updated successfully"
      );


      navigate(
        "/admin/products"
      );


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

      setSaving(false);

    }

  };


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <div className="edit-product-page">

        <h2>
          Loading product...
        </h2>

      </div>

    );

  }


  return (

    <div className="edit-product-page">


      {/* ==========================
          HEADER
      ========================== */}

      <div className="edit-product-header">

        <h1>
          Edit Product
        </h1>

        <p>
          Update your ElectroMart product
        </p>

      </div>


      {/* ==========================
          FORM
      ========================== */}

      <form
        className="edit-product-form"
        onSubmit={handleSubmit}
      >


        {/* ==========================
            NAME
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
            placeholder="Enter price"
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
            placeholder="Enter category"
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
            placeholder="Enter description"
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
              Product Image
            </p>

            <img
              src={imagePreview}
              alt="Product"
            />

          </div>

        )}


        {/* ==========================
            ACTIONS
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
            disabled={saving}
          >
            Cancel
          </button>


          <button
            type="submit"
            className="update-product-btn"
            disabled={saving}
          >

            {saving
              ? "Updating Product..."
              : "Update Product"}

          </button>

        </div>


      </form>

    </div>

  );

}


export default EditProduct;

