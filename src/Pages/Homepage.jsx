import "./Homepage.css";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate(`/products`);
  };

  const handleCategoryClick = (category) => {
    navigate(`/products/category/${category}`);
  };

  return (
    <div className="homepage">
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source src="BG.mp4" type="video/mp4" />
        </video>
        <div className="overlay">
          <button className="shop-now-button" onClick={handleShopNow}>
            Shop Now
          </button>
        </div>
      </div>

      <div className="categories">
        <div
          className="category"
          style={{ backgroundImage: "url('woman.jpg')" }}
          onClick={() => handleCategoryClick("women's clothing")}
        >
          women
        </div>
        <div
          className="category"
          style={{ backgroundImage: "url('man.jpg')" }}
          onClick={() => handleCategoryClick("men's clothing")}
        >
          Men
        </div>
        <div
          className="category"
          style={{ backgroundImage: "url('digital.jpg')" }}
          onClick={() => handleCategoryClick("electronics")}
        >
          Electronics
        </div>
        <div
          className="category"
          style={{ backgroundImage: "url('jew.jpg')" }}
          onClick={() => handleCategoryClick("jewelery")}
        >
          Jewelery
        </div>
      </div>
    </div>
  );
}

export default Homepage;
