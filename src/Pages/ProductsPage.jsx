import { useContext } from "react";
import { ProductContext } from "../contex/ProductsContext";
import { Outlet, NavLink } from "react-router-dom";
import './ProductsPage.css'



function ProductsPage() {
  const { products, categories, mode } = useContext(ProductContext);
  const showMode = mode === 'lightMode' ? "ProductsPage" : "ProductsPage ProductsPageDark"
  const categoriesWithAll = ['all', ...categories]
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
              <input type="text" />€
            </div>
            <div>
              <p>To</p>
              <input type="text" />€
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
                <NavLink to={`category/${category}`} key={category}>
                  <li><h3>{category}</h3></li>
                </NavLink>
            )}
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
}

export default ProductsPage;
