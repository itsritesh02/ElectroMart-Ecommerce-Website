import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./AdminProducts.css";


function AdminProducts() {

  const navigate = useNavigate();


  // ==========================
  // PRODUCTS STATE
  // ==========================

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);


  // ==========================
  // GET ALL PRODUCTS
  // ==========================

  useEffect(() => {

    const getProducts = async () => {

      try {

        const res = await api.get("/products");

        console.log("PRODUCTS:", res.data);

        setProducts(res.data.products);

      } catch (error) {

        console.error(
          "Fetch Products Error:",
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

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );


    if (!confirmDelete) {
      return;
    }


    try {

      await api.delete(
        `/products/${id}`
      );


      alert(
        "Product deleted successfully"
      );


      // Deleted product ko UI se remove karo
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product._id !== id
        )
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

      <div className="products-header">

        <div>

          <h1>
            Products
          </h1>

          <p>
            Manage your store products
          </p>

        </div>


        <button
          className="add-product-btn"
          onClick={() =>
            navigate("/admin/products/add")
          }
        >
          + Add Product
        </button>

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
                  ID
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
                  Actions
                </th>

              </tr>

            </thead>


            <tbody>

              {products.map((product) => (

                <tr
                  key={product._id}
                >

                  {/* ID */}

                  <td>
                    {product._id}
                  </td>


                  {/* Product */}

                  <td>

                    <div>

                      <strong>
                        {product.name}
                      </strong>

                    </div>

                  </td>


                  {/* Category */}

                  <td>
                    {product.category}
                  </td>


                  {/* Price */}

                  <td>
                    ₹{product.price}
                  </td>


                  {/* Actions */}

                  <td>

                    {/* EDIT */}

                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(
                          `/admin/products/edit/${product._id}`
                        )
                      }
                    >
                      Edit
                    </button>


                    {/* DELETE */}

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(
                          product._id
                        )
                      }
                    >
                      Delete
                    </button>

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