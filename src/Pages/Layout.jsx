import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBasketShopping,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import "./Footer.css";
import { useContext } from 'react'
import { ProductContext } from '../contex/ProductsContext'
import { Link, NavLink } from "react-router-dom";


const Layout = ({ children }) => {
  const {mode, modeSwitch} = useContext(ProductContext)
  const showMode =  mode === 'lightMode' ? '' : 'dark'

  const { totalItems } = useContext(ProductContext);
  return (
    <div>
      <header className="header">
        <a className="shop-name">Shop</a>
        <div className="header-icons">
          <button data-role="mode" onClick={modeSwitch} className={showMode}></button>
          <NavLink to="/checkout" className="icon">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </NavLink>

          <NavLink to="/cart" className="icon">
            <FontAwesomeIcon icon={faBasketShopping} />
            {totalItems > 0 && <span className="item-count">{totalItems}</span>}
          </NavLink>
          <Link to="/search">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          </Link>
        </div>
      </header>

      <main className={showMode}>{children}</main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Fake Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
