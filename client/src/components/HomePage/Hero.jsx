import { Link } from "react-router-dom";

import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* ==========================
          HERO CONTENT
      ========================== */}

      <div className="hero-content">

        <span className="hero-badge">
          NEW COLLECTION 2026
        </span>

        <h1>
          Upgrade Your
          <span> Tech Life</span>
        </h1>

        <p>
          Discover the latest laptops, smartphones,
          headphones, smart watches and accessories
          at great prices.
        </p>

        <div className="hero-buttons">

          <Link
            to="/products"
            className="shop-btn"
          >
            Shop Now
          </Link>

          <Link
            to="/products"
            className="explore-btn"
          >
            Explore Products
          </Link>

        </div>

        {/* ==========================
            HERO FEATURES
        ========================== */}

        <div className="hero-features">

          <div className="hero-feature">
            <strong>✓</strong>
            <span>Quality Products</span>
          </div>

          <div className="hero-feature">
            <strong>✓</strong>
            <span>Secure Payment</span>
          </div>

          <div className="hero-feature">
            <strong>✓</strong>
            <span>Fast Delivery</span>
          </div>

        </div>

      </div>


      {/* ==========================
          HERO IMAGE
      ========================== */}

      <div className="hero-image">

        <div className="hero-image-card">

          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000&q=80"
            alt="Modern electronics workspace"
          />

        </div>

        <div className="hero-floating-card">

          <span className="floating-icon">
            ⚡
          </span>

          <div>
            <strong>Latest Tech</strong>

            <small>
              Explore now
            </small>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;