import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBasketShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import "./Footer.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../contex/ProductsContext";

const Layout = ({ children }) => {
  const { totalItems } = useContext(ProductContext);
  return (
    <div>
      <header className="header">
        <a className="shop-name">Shop</a>
        <div className="header-icons">
          <NavLink to="/checkout" className="icon">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </NavLink>

          <NavLink to="/cart" className="icon">
            <FontAwesomeIcon icon={faBasketShopping} />
            {totalItems > 0 && <span className="item-count">{totalItems}</span>}
          </NavLink>
          <a>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          </a>
        </div>
      </header>

      <main>{children}</main>


      <footer className="footer">
        <p>© {new Date().getFullYear()} Fake Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
