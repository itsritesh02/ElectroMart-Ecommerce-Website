import { useState } from "react";

import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    alert("Thank you for subscribing!");

    setEmail("");
  };

  return (
    <section className="newsletter">

      <div className="newsletter-content">

        <div className="newsletter-text">

          <span>
            NEWSLETTER
          </span>

          <h2>
            Stay Updated
          </h2>

          <p>
            Subscribe to receive the latest products,
            exclusive offers and ElectroMart updates.
          </p>

        </div>

        <form
          className="newsletter-form"
          onSubmit={handleSubmit}
        >

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email address"
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