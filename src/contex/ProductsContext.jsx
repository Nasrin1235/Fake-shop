// src/context/ProductsContext.jsx
import { createContext, useEffect, useState } from "react"; 
import { api } from "../services/config";                               

const ProductContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/products");
        console.log("Fetched Products:", response); 
        setProducts(response); 
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductsProvider, ProductContext };






