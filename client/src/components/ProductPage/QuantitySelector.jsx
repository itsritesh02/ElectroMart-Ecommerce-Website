import "./QuantitySelector.css";

function QuantitySelector({
  quantity,
  setQuantity,
}) {

  const handleDecrease = () => {

    if (quantity > 1) {
      setQuantity(quantity - 1);
    }

  };


  const handleIncrease = () => {

    setQuantity(quantity + 1);

  };


  return (

    <div className="quantity-selector">

      <button
        type="button"
        onClick={handleDecrease}
      >
        -
      </button>


      <span>
        {quantity}
      </span>


      <button
        type="button"
        onClick={handleIncrease}
      >
        +
      </button>

    </div>

  );

}


export default QuantitySelector;