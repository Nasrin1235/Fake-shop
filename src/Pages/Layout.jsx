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

const Layout = ({ children }) => {
  const {mode, modeSwitch} = useContext(ProductContext)
  const showMode =  mode === 'lightMode' ? '' : 'dark'

  return (
    <div>
      <header className="header">
        <a className="shop-name">Shop</a>
        <div className="header-icons">
          <button data-role="mode" onClick={modeSwitch} className={showMode}></button>
          <a>
            <FontAwesomeIcon icon={faUser} className="icon" />
          </a>
          <a href="/cart">
            <FontAwesomeIcon icon={faBasketShopping} className="icon" />
          </a>
          <a>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          </a>
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