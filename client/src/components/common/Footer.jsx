import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

import "./Footer.css";


function Footer() {

  return (

    <footer className="footer">

      {/* ==========================
          FOOTER MAIN
      ========================== */}

      <div className="footer-container">


        {/* ==========================
            BRAND
        ========================== */}

        <div className="footer-column footer-brand">

          <h2>
            Electro<span>Mart</span>
          </h2>

          <p>
            Your trusted destination for
            electronics, gadgets and
            everyday technology.
          </p>


          {/* SOCIAL MEDIA */}

          <div className="footer-socials">

            <a href="#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="#" aria-label="Instagram">
              <FaInstagram />
            </a>

            <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>

            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a>

            <a href="#" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>

          </div>

        </div>


        {/* ==========================
            QUICK LINKS
        ========================== */}

        <div className="footer-column">

          <h3>
            Quick Links
          </h3>

          <ul>

            <li>
              <Link to="/">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products">
                Products
              </Link>
            </li>

            <li>
              <Link to="/wishlist">
                Wishlist
              </Link>
            </li>

            <li>
              <Link to="/cart">
                Cart
              </Link>
            </li>

            <li>
              <Link to="/my-orders">
                My Orders
              </Link>
            </li>

          </ul>

        </div>


        {/* ==========================
            CUSTOMER
        ========================== */}

        <div className="footer-column">

          <h3>
            Customer Service
          </h3>

          <ul>

            <li>
              <Link to="/profile">
                My Account
              </Link>
            </li>

            <li>
              <Link to="/my-orders">
                Track Orders
              </Link>
            </li>

            <li>
              <Link to="/wishlist">
                My Wishlist
              </Link>
            </li>

            <li>
              <Link to="/cart">
                Shopping Cart
              </Link>
            </li>

            <li>
              <Link to="/contact">
                Contact Us
              </Link>
            </li>

          </ul>

        </div>


        {/* ==========================
            CONTACT
        ========================== */}

        <div className="footer-column footer-contact">

          <h3>
            Contact Us
          </h3>


          <div className="contact-item">

            <FaMapMarkerAlt />

            <span>
              Chandigarh, India
            </span>

          </div>


          <div className="contact-item">

            <FaPhoneAlt />

            <span>
              +91 98765 43210
            </span>

          </div>


          <div className="contact-item">

            <FaEnvelope />

            <span>
              support@electromart.com
            </span>

          </div>

        </div>

      </div>

\


      {/* ==========================
          FOOTER BOTTOM
      ========================== */}

      <div className="footer-bottom">

        <p>
          © 2026 ElectroMart. All rights
          reserved.
        </p>

        <div>

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <Link to="/terms">
            Terms & Conditions
          </Link>

        </div>

      </div>

    </footer>

  );

}


export default Footer;