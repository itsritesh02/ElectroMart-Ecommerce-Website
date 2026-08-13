
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import "./AdminProducts.css"


function AdminProducts() {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  // ==========================
  // GET PRODUCTS
  // ==========================

  useEffect(() => {

    const getProducts = async () => {

      try {

        const res = await api.get("/products");

        console.log(
          "PRODUCTS:",
          res.data
        );

        setProducts(
          res.data.products || []
        );

      } catch (error) {

        console.error(
          "Get Products Error:",
          error
        );

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


  // ==========================
  // DELETE PRODUCT
  // ==========================

  const handleDelete = async (productId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );


    if (!confirmDelete) {
      return;
    }


    try {

      const res = await api.delete(
        `/ products / ${ productId } `
      );


      console.log(
        "DELETE PRODUCT:",
        res.data
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

    }

  };


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <div className="admin-products">

        <h2>
          Loading products...
        </h2>

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

          <h1>
            Products
          </h1>

          <p>
            Manage your store products
          </p>

        </div>


        <Link
          to="/admin/products/add"
          className="add-product-btn"
        >
          + Add Product
        </Link>

      </div>


      {/* ==========================
          COUNT
      ========================== */}

      <div className="product-count">

        Total Products:

        <strong>
          {products.length}
        </strong>

      </div>


      {/* ==========================
          NO PRODUCTS
      ========================== */}

      {products.length === 0 ? (

        <div className="no-products">

          <h2>
            No Products Found
          </h2>

          <p>
            Add your first product.
          </p>


          <Link
            to="/admin/products/add"
            className="add-product-btn"
          >
            Add Product
          </Link>

        </div>

      ) : (


        /* ==========================
           PRODUCTS TABLE
        ========================== */

        <div className="products-table-container">

          <table className="products-table">

            <thead>

              <tr>

                <th>
                  Image
                </th>

                <th>
                  Product
                </th>

                <th>
                  Category
                </th>

                <th>
                  Price
                </th>

                <th>
                  Date
                </th>

                <th>
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {products.map((product) => (

                <tr
                  key={product._id}
                >


                  {/* IMAGE */}

                  <td>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="admin-product-image"
                    />

                  </td>


                  {/* PRODUCT */}

                  <td>

                    <div className="admin-product-info">

                      <strong>
                        {product.name}
                      </strong>

                      <span>
                        {product.description}
                      </span>

                    </div>

                  </td>


                  {/* CATEGORY */}

                  <td>
                    {product.category}
                  </td>


                  {/* PRICE */}

                  <td>

                    <strong>
                      ₹{product.price}
                    </strong>

                  </td>


                  {/* DATE */}

                  <td>

                    {product.createdAt
                      ? new Date(
                          product.createdAt
                        ).toLocaleDateString()
                      : "N/A"}

                  </td>


                  {/* ACTIONS */}

                  <td>

                    <div className="product-actions">


                      {/* EDIT */}

                      <Link
                        to={`/ admin / products / edit / ${ product._id } `}
                        className="edit-product-btn"
                      >
                        Edit
                      </Link>


                      {/* DELETE */}

                      <button
                        type="button"
                        className="delete-product-btn"
                        onClick={() =>
                          handleDelete(
                            product._id
                          )
                        }
                      >
                        Delete
                      </button>


                    </div>

                  </td>


                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

}


export default AdminProducts;

