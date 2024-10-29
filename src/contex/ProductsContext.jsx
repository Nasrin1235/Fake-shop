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

  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('mode')
    return savedMode ? JSON.parse(savedMode) : 'lightMode'
  })

  const totalItems = productsIncart.reduce((acc, product) => acc + product.quantity, 0)
  const totalPrice = productsIncart.reduce((acc, product) => acc + product.quantity * product.price, 0).toFixed(2)

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

  useEffect(() => {
    localStorage.setItem('productsIncart', JSON.stringify(productsIncart));
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [productsIncart, mode])

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'productsIncart') {
        const updatedCart = JSON.parse(event.newValue);
        setProductsIncart(updatedCart);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [])

  function modeSwitch() {
    const newMode = mode === 'lightMode' ? 'darkMode' : 'lightMode'
    setMode(newMode)
  }

  function deleteProduct(id) {
    const newCart = productsIncart.filter(product => product.id !== id)
    setProductsIncart(newCart)
  }

  function AddToCart(id, Increment = 1) {
    setProductsIncart(
      preCart => {
        const existingProduct = preCart.find(product => product.id === id)
        if (existingProduct) {
          if (existingProduct.quantity + Increment > 0)
            return preCart.map(product =>
              product.id === id
                ? { ...product, quantity: product.quantity + Increment }
                : product
            )
          else
            return preCart.filter(product => product.id !== id)
        }

        const newProduct = products.find(product => product.id === id)
        if (newProduct) {
          return [{ ...newProduct, quantity: 1 }, ...preCart]
        }
        return preCart
      }
    )
    console.log(productsIncart)
  }

  function clearCart() {
    setProductsIncart([])
    localStorage.setItem('productsIncart', JSON.stringify([]));
  }

  return (
    <ProductContext.Provider value={{ products, productsIncart, totalItems, totalPrice, mode, AddToCart, clearCart, deleteProduct, modeSwitch }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductsProvider, ProductContext };






