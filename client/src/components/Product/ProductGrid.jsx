// import "./ProductGrid.css";
import ProductCard from "../ProductCard/ProductCard";

function ProductGrid() {

  const products = [

    {
      id: 1,
      name: "MacBook Air",
      price: 99999,
      rating: 4.8,
      image: "https://picsum.photos/300?1"
    },

    {
      id: 2,
      name: "iPhone 16",
      price: 79999,
      rating: 4.9,
      image: "https://picsum.photos/300?2"
    },

    {
      id: 3,
      name: "Samsung S26",
      price: 65999,
      rating: 4.7,
      image: "https://picsum.photos/300?3"
    },

    {
      id: 4,
      name: "Sony Headphones",
      price: 12999,
      rating: 4.6,
      image: "https://picsum.photos/300?4"
    }

  ];

  return (

    <div className="product-grid">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>
  );
}

export default ProductGrid;