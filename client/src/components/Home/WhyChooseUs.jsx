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
      title: "Free Shipping",
      description: "Free delivery on all orders above ₹999.",
    },
    {
      icon: <FaShieldAlt />,
      title: "Secure Payment",
      description: "100% secure online payment with trusted gateways.",
    },
    {
      icon: <FaUndo />,
      title: "Easy Returns",
      description: "7 Days easy return & replacement policy.",
    },
    {
      icon: <FaHeadset />,
      title: "24/7 Support",
      description: "Our support team is always ready to help you.",
    },
  ];

  return (
    <section className="why-choose">
      <h2>Why Choose ElectroMart?</h2>

      <div className="why-grid">
        {features.map((feature, index) => (
          <div className="why-card" key={index}>
            <div className="why-icon">{feature.icon}</div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChooseUs;