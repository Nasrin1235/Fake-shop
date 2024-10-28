import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../contex/ProductsContext";
import { Link } from "react-router-dom";
import "./DetailsPage.css";

function DetailPages() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const result = products.find((product) => product.id === Number(id));

  if (!result) return <h1>Product not found</h1>;

  const { rate, count } = result.rating;

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

  // Ezafe kardane size-ha bar asas kategori
  const sizes =
    result.category === "men's clothing" ||
    result.category === "women's clothing"
      ? ["S", "M", "L", "XL"]
      : [];

  return (
    <div className="container">
      <img src={result.image} alt={result.title} />
      <div className="information">
        <h3>{result.title}</h3>
        <p className="description">{result.description}</p>
        <p className="category">{result.category}</p>
        <span className="price">Price: {result.price} $</span>

        {/* Rating */}
        <div className="rating">
          <div className="stars">{renderStars(rate)}</div>
          <p>({count} reviews)</p>
        </div>

        {/* Namayesh size-ha bar asas kategori */}
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
        <a href="">Add to </a>
        <Link to="/products">Back to shop</Link>
      </div>
    </div>
  );
}

export default DetailPages;
