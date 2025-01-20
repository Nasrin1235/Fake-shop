import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contex/ProductsContext";
import { Link } from "react-router-dom";
import "./DetailsPage.css";

function DetailPages() {
  const { id } = useParams();
  const { products, AddToCart, productsIncart } = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const result = products.find((product) => product.id === Number(id));
    setProduct(result);
  }, [products, id]); 

  const stockQuantity = product?.stockQuantity
  console.log("productsIncart:", productsIncart);

  if (!product) return <h1>Product not found</h1>;

  const { rate, count } = product.rating;

  const renderStars = (rate) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {Array(fullStars)
          .fill()
          .map((_, i) => (
            <span key={`full-${i}`} className="star full">
              ★
            </span>
          ))}
        {halfStar && <span className="star half">☆</span>}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <span key={`empty-${i}`} className="star empty">
              ☆
            </span>
          ))}
      </>
    );
  };

  const sizes =
  product.category === "men's clothing" ||
  product.category === "women's clothing"
      ? ["S", "M", "L", "XL"]
      : [];

  return (
    <div className="container">
      <img src={product.image} alt={product.title} />
      <div className="information">
        <h3>{product.title}</h3>
        <p className="description">{product.description}</p>
        <p className="category">{product.category}</p>
        <span className="price">Price: {product.price} €</span>

        <div className="rating">
          <div className="stars">{renderStars(rate)}</div>
          <p>({count} reviews)</p>
        </div>

        {sizes.length > 0 && (
          <div className="sizes">
            <p>Select Size:</p>
            {sizes.map((size) => (
              <button key={size} className="size-button">
                {size}
              </button>
            ))}
          </div>
        )}

        <div className="stockQuantity">
          <span>{stockQuantity} </span><span>pieses available</span>
        </div>

        {/* Add to Cart Button */}
        <a
          onClick={() => {
            AddToCart(product.id);
            console.log("Added to cart:", product.title); // Console log test
            // window.location.href = "/cart";
          }}
        >
          Add to Cart
        </a>

        <Link to="/products">Back to shop</Link>
      </div>
    </div>
  );
}

export default DetailPages;
