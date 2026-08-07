import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <h2>ElectroMart</h2>

      <div>

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/login">Login</Link>

        <Link to="/register">Register</Link>

      </div>

    </nav>
  );
}

export default Navbar;