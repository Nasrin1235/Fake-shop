// src/context/ProductsContext.jsx
import { createContext, useEffect, useState } from "react"; 
import { api } from "../services/config";                               

const ProductContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [productsIncart, setProductsIncart] = useState(() => {
    const savedCart = localStorage.getItem('productsIncart')
    return savedCart ? JSON.parse(savedCart) : []
  })
  
  const totolItems = productsIncart.reduce((acc, product) => acc + product.quantity, 0)
  const totalPrice = productsIncart.reduce((acc, product) => acc + product.quantity * product.price, 0)

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

  function AddToCard(id) {
    setProductsIncart(
      preCart => {
        const existingProduct = productsIncart.find(product => product.id === id)
        if (existingProduct) {
          return preCart.map(product =>
            product.id === id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          )
        }

        const newProduct = products.find(product => product.id === id)
        if (newProduct) {
          return [...preCart, { ...newProduct, quantity: 1 }]
        }
        return preCart
      }
    )
  }

  function clearCart() {
    setProductsIncart([])
  }

  return (
    <ProductContext.Provider value={{ products, productsIncart, totolItems, totalPrice, AddToCard, clearCart, }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductsProvider, ProductContext };






