import { useState, useContext } from 'react';
import { ProductContext } from "../contex/ProductsContext";
import { Link } from 'react-router-dom';
import './SearchPage.css';

function SearchPage() {
  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-page">
      <form className="search-form">

        <input
          type="text"
          placeholder="Search by product name..."
          className="input"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </form>

      {searchTerm && (
        <div className="search-results">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="search-item" key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img src={product.image} alt={product.title} className="product-image"/>
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">${product.price}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchPage;

