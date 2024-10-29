import { useContext } from "react";
import { ProductContext } from "../contex/ProductsContext";
import { Outlet, NavLink } from "react-router-dom";
import './ProductsPage.css'



function ProductsPage() {
  const { products, categories, mode } = useContext(ProductContext);
  const showMode = mode === 'lightMode' ? "ProductsPage" : "ProductsPage dark"

  return (
    <div className={showMode}>
      <nav>
        <ul>
          {categories.map(
            category =>
              <NavLink to={`category/${category}`} key={category}>
                <li><h3>{category}</h3></li>
              </NavLink>
          )}
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default ProductsPage;
