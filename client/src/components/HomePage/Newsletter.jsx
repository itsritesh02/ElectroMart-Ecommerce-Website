import "./Newsletter.css";

function Newsletter() {
  return (
    <section className="newsletter">

      <div className="newsletter-content">

        <h2>Stay Updated</h2>

        <p>
          Subscribe to get the latest offers, discounts and new product updates.
        </p>

        <form className="newsletter-form">

          <input
            type="email"
            placeholder="Enter your email"
          />

          <button type="submit">
            Subscribe
          </button>

        </form>

      </div>

    </section>
  );
}

export default Newsletter;