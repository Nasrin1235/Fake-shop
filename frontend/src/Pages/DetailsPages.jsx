import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../contex/ProductsContext";
import { Link } from "react-router-dom";
import "./DetailsPage.css";

function DetailPages() {
  const { id } = useParams();
  const { AddToCart, stockQuantity, setStockQuantity} = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.status}`);
        }
        const result = await response.json();
        setProduct(result);
        setStockQuantity(result.stockQuantity); 
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchProduct();
  }, [id, setStockQuantity]);

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
            console.log("Added to cart:", product.title); 
            // window.location.reload();
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
