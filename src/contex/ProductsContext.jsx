import { createContext, useEffect, useState } from "react";
import { api } from "../services/config";

const ProductContext = createContext();

function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [lowestPrice, setLowestPrice] = useState(null);
  const [highestPrice, setHighestPrice] = useState(null);
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

  const fetchData = async (endpoint, setState) => {
    try {
      const response = await api.get(endpoint);
      console.log(`Fetched data from ${endpoint}:`, response);
      setState(response);
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error.message);
    }
  };

  const handleStorageChange = (event) => {
    if (event.key === 'productsIncart') {
      const updatedCart = JSON.parse(event.newValue);
      setProductsIncart(updatedCart);
    } else if (event.key === 'mode') {
      const updatedMode = JSON.parse(event.newValue);
      setMode(updatedMode);
    }
  };

  useEffect(() => {
    fetchData("/products", setProducts);
    fetchData("/products/categories", setCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem('productsIncart', JSON.stringify(productsIncart));
    localStorage.setItem('mode', JSON.stringify(mode));
  }, [productsIncart, mode])

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  function calculatePriceRange(category) {
    if (category === 'all') {
      const allPrices = products.map(product => product.price);
      setLowestPrice(Math.min(...allPrices));
      setHighestPrice(Math.max(...allPrices));
    } else if (categories.includes(category)) {
      const productsInCategory = products.filter(
        product => product.category === category
      );
      const allPrices = productsInCategory.map(product => product.price);
      setLowestPrice(Math.min(...allPrices));
      setHighestPrice(Math.max(...allPrices));
    }
  };

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
    <ProductContext.Provider value={{ products, productsIncart, totalItems, totalPrice, mode, categories, lowestPrice, highestPrice, AddToCart, clearCart, deleteProduct, modeSwitch, calculatePriceRange }}>
      {children}
    </ProductContext.Provider>
  );
}

export { ProductsProvider, ProductContext };






