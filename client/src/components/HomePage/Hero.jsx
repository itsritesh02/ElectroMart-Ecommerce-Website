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
          SMART TECH • BETTER LIFE
        </span>

        <h1>
          Discover
          <span> Smart Technology</span>
        </h1>

        <p>
          Shop the latest smartphones, laptops, headphones,
          smart watches and everyday tech essentials —
          all in one place at prices you'll love.
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
            <span>Premium Products</span>
          </div>

          <div className="hero-feature">
            <strong>✓</strong>
            <span>Secure Checkout</span>
          </div>

          <div className="hero-feature">
            <strong>✓</strong>
            <span>Fast & Reliable Delivery</span>
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
            alt="Latest technology and electronics"
          />

        </div>

        <div className="hero-floating-card">

          <span className="floating-icon">
            ⚡
          </span>

          <div>
            <strong>Trending Tech</strong>

            <small>
              Shop the latest
            </small>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;