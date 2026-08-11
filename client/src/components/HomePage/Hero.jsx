
import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Upgrade Your Tech 
        </h1>

        <p>
          Discover the latest laptops, smartphones, headphones,
          smart watches and accessories at unbeatable prices.
        </p>

        <div className="hero-buttons">

          <Link to="/products" className="shop-btn">
            Shop Now
          </Link>

          <Link to="/products" className="explore-btn">
            Explore Products
          </Link>

        </div>

      </div>

      <div className="hero-image">

        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800"
          alt="Electronics"
        />

      </div>

    </section>
  );
}

export default Hero;