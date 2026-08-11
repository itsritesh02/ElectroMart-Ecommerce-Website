import { useState } from "react";

import "./AdminProducts.css";


function AdminProducts() {

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "MacBook Air",
      price: 99999,
      category: "Laptop",
    },
    {
      id: 2,
      name: "iPhone 16",
      price: 79999,
      category: "Mobile",
    },
    {
      id: 3,
      name: "Samsung S26",
      price: 65999,
      category: "Mobile",
    },
  ]);


  const handleDelete = (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    setProducts(
      products.filter(
        (product) => product.id !== id
      )
    );

  };


  return (

    <div className="admin-products">

      {/* Header */}

      <div className="products-header">

        <div>

          <h1>
            Products
          </h1>

          <p>
            Manage your store products
          </p>

        </div>


        <button className="add-product-btn">
          + Add Product
        </button>

      </div>


      {/* Product Table */}

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

              <tr key={product.id}>

                <td>
                  {product.id}
                </td>

                <td>
                  {product.name}
                </td>

                <td>
                  {product.category}
                </td>

                <td>
                  ₹{product.price}
                </td>

                <td>

                  <button className="edit-btn">
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(product.id)
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

    </div>

  );
}


export default AdminProducts;