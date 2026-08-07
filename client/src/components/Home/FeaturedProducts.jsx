import ProductCard from "../HomeProduct/ProductCard";
import "./FeaturedProducts.css";


function FeaturedProducts() {

  const products = [

    {
      id: 1,
      name: "MacBook Air M4",
      price: 99999,
      rating: 4.8,
      image: "https://picsum.photos/300/250?random=1"
    },

    {
      id: 2,
      name: "iPhone 16",
      price: 79999,
      rating: 4.9,
      image: "https://picsum.photos/300/250?random=2"
    },

    {
      id: 3,
      name: "Samsung S26",
      price: 69999,
      rating: 4.7,
      image: "https://picsum.photos/300/250?random=3"
    },

    {
      id: 4,
      name: "Sony Headphones",
      price: 14999,
      rating: 4.6,
      image: "https://picsum.photos/300/250?random=4"
    }

  ];

  return (

    <section className="featured">

      <h2>Featured Products</h2>

      <div className="product-grid">

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

export default FeaturedProducts;