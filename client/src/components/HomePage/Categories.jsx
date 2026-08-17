import { Link } from "react-router-dom";

import {
  FaLaptop,
  FaMobileAlt,
  FaHeadphones,
  FaCamera,
  FaGamepad,
  FaTv,
  FaTabletAlt,
  FaClock,
} from "react-icons/fa";

import "./Categories.css";

function Categories() {
  const categories = [
    {
      name: "Laptop",
      icon: <FaLaptop />,
    },

    {
      name: "Mobile",
      icon: <FaMobileAlt />,
    },

    {
      name: "Headphones",
      icon: <FaHeadphones />,
    },

    {
      name: "Camera",
      icon: <FaCamera />,
    },

    {
      name: "Gaming",
      icon: <FaGamepad />,
    },

    {
      name: "Smart TV",
      icon: <FaTv />,
    },

    {
      name: "Tablet",
      icon: <FaTabletAlt />,
    },

    {
      name: "Smart Watch",
      icon: <FaClock />,
    },
  ];

  return (
    <section className="categories">

      {/* ==========================
          HEADER
      ========================== */}

      <div className="categories-header">

        <div>

          <span className="categories-label">
            EXPLORE
          </span>

          <h2>
            Shop By Category
          </h2>

        </div>

        <Link
          to="/products"
          className="view-all-categories"
        >
          View All →
        </Link>

      </div>


      {/* ==========================
          CATEGORY GRID
      ========================== */}

      <div className="category-grid">

        {categories.map((item) => (

          <Link
            key={item.name}
            to={`/products?category=${encodeURIComponent(
              item.name
            )}`}
            className="category-card"
          >

            <div className="category-icon">
              {item.icon}
            </div>

            <h3>
              {item.name}
            </h3>

            <span className="category-arrow">
              →
            </span>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default Categories;