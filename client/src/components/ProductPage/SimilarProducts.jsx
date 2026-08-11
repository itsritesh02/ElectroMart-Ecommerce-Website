import ProductCard from "../ProductCard/ProductCard";
import "./SimilarProducts.css";

function SimilarProducts() {

  const products = [

    {
      id: 2,
      name: "iPhone 16",
      price: 79999,
      rating: 4.8,
      image: "https://picsum.photos/300?5"
    },

    {
      id: 3,
      name: "Samsung S26",
      price: 65999,
      rating: 4.7,
      image: "https://picsum.photos/300?6"
    },

    {
      id: 4,
      name: "Sony Headphones",
      price: 12999,
      rating: 4.5,
      image: "https://picsum.photos/300?7"
    }

  ];

  return (

    <section className="similar-products">

      <h2>Similar Products</h2>

      <div className="similar-grid">

        {products.map((product) => (

          <ProductCard

            key={product.id}

            product={product}

          />

        ))}

      </div>

    </section>

  );
}

export default SimilarProducts;