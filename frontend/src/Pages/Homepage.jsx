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
          <span>women</span>
          <video className="hover-video" autoPlay muted loop>
            <source src="WB.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          className="category"
          style={{ backgroundImage: "url('man.jpg')" }}
          onClick={() => handleCategoryClick("men's clothing")}
        >
          
          <span>Men</span>
          <video className="hover-video" autoPlay muted loop>
            <source src="MB.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          className="category"
          style={{ backgroundImage: "url('digital.jpg')" }}
          onClick={() => handleCategoryClick("electronics")}
        >
          
          <span>Electronics</span>
          <video className="hover-video" autoPlay muted loop>
            <source src="DB.mp4" type="video/mp4" />
          </video>
        </div>
        <div
          className="category"
          style={{ backgroundImage: "url('jew.jpg')" }}
          onClick={() => handleCategoryClick("jewelery")}
        >
          
          <span>Jewelery</span>
          <video className="hover-video" autoPlay muted loop>
            <source src="JB.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
