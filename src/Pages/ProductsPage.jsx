import { useContext } from "react";
import { ProductContext } from "../contex/ProductsContext";
import { Outlet, NavLink } from "react-router-dom";
import './ProductsPage.css'



function ProductsPage() {
  const { products, categories, mode, lowestPrice, highestPrice, setPriceRange} = useContext(ProductContext);
  const showMode = mode === 'lightMode' ? "ProductsPage" : "ProductsPage ProductsPageDark"
  const categoriesWithAll = ['all', ...categories]

  console.log("lowestPrice", lowestPrice)
  console.log("highestPrice", highestPrice)

  return (
    <div className={showMode}>
      <aside>
        <div className="priceBar">
          <label>
            <input type="checkbox" />
            <div className="barTitle">
              <span>Price</span>
              <img src="/public/arrow-up.svg" alt="arrow-up" />
              <img src="/public/arrow-down.svg" alt="arrow-down" />
            </div>
          </label>
          <div className="priceRange">
            <div>
              <p>From</p>
              <div className="show€">
                <input type="text" name="lowestPrice" placeholder={lowestPrice} onChange={setPriceRange}/>
              </div>
            </div>
            <div>
              <p>To</p>
              <div className="show€">
                <input type="text" name="highestPrice" placeholder={highestPrice} onChange={setPriceRange}/>
              </div>
            </div>
            {/* <div>pricebar</div> */}
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
