import { useContext, useEffect } from "react";
import { ProductContext } from "../contex/ProductsContext";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import './ProductsPage.css'

function ProductsPage() {
  const { categories, mode, lowestPrice, highestPrice, givenLowestPrice, givenHighestPrice, setPriceRange, resetGivenPrice } = useContext(ProductContext);
  const location = useLocation();
  const showMode = mode === 'lightMode' ? "ProductsPage" : "ProductsPage ProductsPageDark"
  const categoriesWithAll = ['all', ...categories]

  console.log("Current path:", location.pathname);

  useEffect(() => {
    resetGivenPrice()
  }, [location.pathname]);


  return (
    <div className={showMode}>
      <aside>
        <div className="priceBar">
          <label>
            <input type="checkbox" />
            <div id="barTitle" className="barTitle">
              <span>Price</span>
              <img src="/public/arrow-up.svg" alt="arrow-up" />
              <img src="/public/arrow-down.svg" alt="arrow-down" />
            </div>
          </label>
          <div className="priceRange">
            <div>
              <p>From</p>
              <div className="show€">
                <input
                  id="givenLowestPrice"
                  type="text"
                  name="givenLowestPrice"
                  value={givenLowestPrice || ''} 
                  placeholder={lowestPrice}
                  onChange={setPriceRange}
                />
              </div>
            </div>
            <div>
              <p>To</p>
              <div className="show€">
              <input
                  id="givenHighestPrice"
                  type="text"
                  name="givenHighestPrice"
                  value={givenHighestPrice || ''} 
                  placeholder={highestPrice}
                  onChange={setPriceRange}
                />
              </div>
            </div>
          </div>
          <div>
            <input type="range" id="myRange" min="0" max="200" value="50" />
          </div>
        </div>
      </aside>
      <div className="category">
        <nav>
          <ul>
            {categoriesWithAll.map(
              category =>
                <li key={category}><NavLink to={`category/${category}`} ><h3>{category}</h3></NavLink></li>
            )}
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default ProductsPage;
