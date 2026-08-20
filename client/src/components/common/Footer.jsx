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
  FaArrowRight,
} from "react-icons/fa";

import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* =========================
          FOOTER MAIN
      ========================= */}

      <div className="footer-container">

        {/* BRAND */}

        <div className="footer-column footer-brand">

          <Link to="/" className="footer-logo">
            Electro<span>Mart</span>
          </Link>

          <p className="footer-description">
            Your trusted destination for quality electronics,
            smart gadgets and everyday technology.
          </p>

          <div className="footer-socials">

            <a href="https://www.facebook.com/mj.miraje05?mibextid=wwXIfr&rdid=2KVRiRpFPiRXZ0fo&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FRcj7GfuL%2F%3Fmibextid%3DwwXIfr#" aria-label="Facebook">
              <FaFacebookF />
            </a>

            <a href="https://www.instagram.com/dc.mirage0?igsh=M2ptajV1cmFqczc0&igsi=M2ptajV1cmFqczc0&utm_source=qr" aria-label="Instagram">
              <FaInstagram />
            </a>

            {/* <a href="#" aria-label="Twitter">
              <FaTwitter />
            </a>

            <a href="#" aria-label="YouTube">
              <FaYoutube />
            </a> */}

            <a href="https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGYDeHtqshgSQAAAaAd_MF4jGAgK967ZVZvoYXXe94iRxSM4w92klEtIh5sxbMoYVI_lluj6Ww--uqsAbvieZE6T1jNZIQLUUHmoUtVQpFgRzk0RPZdSaf_CQsoTr2YFr6LDCQ=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fritesh-kumar-2707b2413%3Futm_source%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dmember_ios" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>

          </div>

        </div>


        {/* QUICK LINKS */}

        <div className="footer-column">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <Link to="/">
                <FaArrowRight />
                Home
              </Link>
            </li>

            <li>
              <Link to="/products">
                <FaArrowRight />
                Products
              </Link>
            </li>

            <li>
              <Link to="/wishlist">
                <FaArrowRight />
                Wishlist
              </Link>
            </li>

            <li>
              <Link to="/cart">
                <FaArrowRight />
                Cart
              </Link>
            </li>

            <li>
              <Link to="/my-orders">
                <FaArrowRight />
                My Orders
              </Link>
            </li>

          </ul>

        </div>


        {/* CUSTOMER SERVICE */}

        <div className="footer-column">

          <h3>Customer Service</h3>

          <ul>

            <li>
              <Link to="/profile">
                <FaArrowRight />
                My Account
              </Link>
            </li>

            <li>
              <Link to="/my-orders">
                <FaArrowRight />
                Track Orders
              </Link>
            </li>

            <li>
              <Link to="/wishlist">
                <FaArrowRight />
                My Wishlist
              </Link>
            </li>

            <li>
              <Link to="/cart">
                <FaArrowRight />
                Shopping Cart
              </Link>
            </li>

            <li>
              <Link to="/contact">
                <FaArrowRight />
                Contact Us
              </Link>
            </li>

          </ul>

        </div>


        {/* CONTACT */}

        <div className="footer-column footer-contact">

          <h3>Contact Us</h3>

          <div className="contact-item">

            <div className="contact-icon">
              <FaMapMarkerAlt />
            </div>

            <span>
              Banur, Rajpura, India
            </span>

          </div>


          <div className="contact-item">

            <div className="contact-icon">
              <FaPhoneAlt />
            </div>

            <span>
              +91 8252957877
            </span>

          </div>


          <div className="contact-item">

            <div className="contact-icon">
              <FaEnvelope />
            </div>

            <span>
              itsritesh02@gmail.com
            </span>

          </div>

        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================= */}

      <div className="footer-bottom">

        <p>
          © 2026 ElectroMart. All rights reserved.
        </p>

        <div className="footer-legal">

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <span>•</span>

          <Link to="/terms">
            Terms & Conditions
          </Link>

        </div>

      </div>

    </footer>
  );
}

export default Footer;