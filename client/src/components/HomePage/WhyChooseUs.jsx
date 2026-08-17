import "./WhyChooseUs.css";

import {
  FaShippingFast,
  FaShieldAlt,
  FaUndo,
  FaHeadset,
} from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaShippingFast />,
      title: "Fast & Free Shipping",
      description:
        "Enjoy fast and reliable delivery on eligible orders above ₹999.",
    },

    {
      icon: <FaShieldAlt />,
      title: "Secure Payments",
      description:
        "Your payments are protected with secure and trusted payment gateways.",
    },

    {
      icon: <FaUndo />,
      title: "Easy Returns",
      description:
        "Shop with confidence with our simple return and replacement policy.",
    },

    {
      icon: <FaHeadset />,
      title: "Customer Support",
      description:
        "Our support team is available to help you with your shopping experience.",
    },
  ];

  return (
    <section className="why-choose">

      <div className="why-header">

        <span>
          WHY ELECTROMART
        </span>

        <h2>
          Why Choose ElectroMart?
        </h2>

        <p>
          Everything you need for a simple and reliable
          online shopping experience.
        </p>

      </div>

      <div className="why-grid">

        {features.map((feature) => (

          <div
            className="why-card"
            key={feature.title}
          >

            <div className="why-icon">
              {feature.icon}
            </div>

            <div className="why-card-content">

              <h3>
                {feature.title}
              </h3>

              <p>
                {feature.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WhyChooseUs;