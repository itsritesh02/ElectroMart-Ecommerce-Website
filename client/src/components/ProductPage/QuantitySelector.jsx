import { useState } from "react";
import "./QuantitySelector.css";

function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="quantity">

      <button onClick={decrease}>-</button>

      <span>{quantity}</span>

      <button onClick={increase}>+</button>

    </div>
  );
}

export default QuantitySelector;