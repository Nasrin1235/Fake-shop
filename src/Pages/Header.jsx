import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBasketShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import './Header.css'; 
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <a className="shop-name">Shop</a>
      <div className="header-icons">
        <Link><FontAwesomeIcon icon={faUser} className="icon" /></Link>
        <Link to="/cart"><FontAwesomeIcon icon={faBasketShopping} className="icon" /></Link>
        <Link><FontAwesomeIcon icon={faMagnifyingGlass} className="icon" /></Link>
      </div>
    </div>
  );
}

export default Header;