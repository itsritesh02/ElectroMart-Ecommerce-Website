import "./Categories.css";
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

function Categories() {
  const categories = [
    { name: "Laptops", icon: <FaLaptop /> },
    { name: "Mobiles", icon: <FaMobileAlt /> },
    { name: "Headphones", icon: <FaHeadphones /> },
    { name: "Cameras", icon: <FaCamera /> },
    { name: "Gaming", icon: <FaGamepad /> },
    { name: "Smart TV", icon: <FaTv /> },
    { name: "Tablets", icon: <FaTabletAlt /> },
    { name: "Smart Watch", icon: <FaClock /> },
  ];

  return (
    <section className="categories">

      <h2>Shop By Category</h2>

      <div className="category-grid">

        {categories.map((item, index) => (

          <Link
            to="/products"
            key={index}
            className="category-card"
          >

            <div className="icon">

              {item.icon}

            </div>

            <h3>{item.name}</h3>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default Categories;