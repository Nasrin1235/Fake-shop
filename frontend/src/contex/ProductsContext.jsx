import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();
const productRoute = "http://localhost:3001/products";

function ProductsProvider({ children }) {
  // adding "products" and "categories"
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchData = async (endpoint, setState) => {
    try {
      const response = await fetch(`http://localhost:3001${endpoint}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setState(data);
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error.message);
    }
  };

  useEffect(() => {
    fetchData("/products", setProducts);
    fetchData("/products/categories", setCategories);
  }, []);

  //add isLoggedIn
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    // Check if the token exists in the cookie and validate it with the backend
    const checkToken = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/validate-token",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, []);

  //adding "productsIncart" and "display-mode" and save them in localStorage on changing
  const [productsIncart, setProductsIncart] = useState(() => {
    const savedCart = localStorage.getItem("productsIncart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("mode");
    return savedMode ? JSON.parse(savedMode) : "lightMode";
  });

  useEffect(() => {
    localStorage.setItem("productsIncart", JSON.stringify(productsIncart));
    localStorage.setItem("mode", JSON.stringify(mode));
  }, [productsIncart, mode]);

  // adding localStorage listener to watch "productsIncart" and "mode" for real-time display
  const handleStorageChange = (event) => {
    if (event.key === "productsIncart") {
      const updatedCart = JSON.parse(event.newValue);
      setProductsIncart(updatedCart);
    } else if (event.key === "mode") {
      const updatedMode = JSON.parse(event.newValue);
      setMode(updatedMode);
    }
  };

  useEffect(() => {
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // adding "totalItems" and "totalPrice"
  const totalItems = productsIncart.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const totalPrice = productsIncart
    .reduce((acc, product) => acc + product.quantity * product.price, 0)
    .toFixed(2);

  // adding "lowestPrice", "highestPrice" and function "calculatePriceRange"
  const [lowestPrice, setLowestPrice] = useState(null);
  const [highestPrice, setHighestPrice] = useState(null);

  function calculatePriceRange(category) {
    let allPrices = [];

    if (category === "all") {
      allPrices = products.map((product) => product.price);
    } else if (categories.includes(category)) {
      const productsInCategory = products.filter(
        (product) => product.category === category
      );
      allPrices = productsInCategory.map((product) => product.price);
    }

    if (allPrices.length > 0) {
      setLowestPrice(Math.min(...allPrices));
      setHighestPrice(Math.max(...allPrices));
    } else {
      setLowestPrice(0);
      setHighestPrice(0);
    }
  }

  // adding "givenLowestPrice", "givenHighestPrice", function "setPriceRange", "resetGivenPrice"
  const [givenLowestPrice, setGivenLowestPrice] = useState("");
  const [givenHighestPrice, setGivenHighestPrice] = useState("");

  function setPriceRange(e) {
    const { name, value } = e.target;
    if (name === "givenLowestPrice") {
      setGivenLowestPrice(value);
    }
    if (name === "givenHighestPrice") {
      setGivenHighestPrice(value);
    }
  }

  function resetGivenPrice() {
    setGivenLowestPrice("");
    setGivenHighestPrice("");
  }

  // adding function "modeSwitch", "deleteProduct"(in cart), "AddToCart", "clearCart"
  function modeSwitch() {
    const newMode = mode === "lightMode" ? "darkMode" : "lightMode";
    setMode(newMode);
  }

  async function deleteProduct(id) {
    const product = productsIncart.find((product) => product.id === id);
    if (product) {
      const quantityToAdd = product.quantity;
      const response = await fetch(`${productRoute}/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          quantityToAdd,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update product stock");
        return;
      }
      const data = await response.json();
      const updatedProduct = data.product;
      setStockQuantity(updatedProduct.stockQuantity);
    }
    const newCart = productsIncart.filter((product) => product.id !== id);

    setProductsIncart(newCart);
  }

  const [stockQuantity, setStockQuantity] = useState(null);
  async function AddToCart(id, Increment = 1) {
    let productStockQuantity;
    let product;

    // check product stock quantity
    try {
      const response = await fetch(`${productRoute}/${id}`);
      product = await response.json();
    } catch (error) {
      console.error("Error fetch product", error.message);
      return;
    }

    if (Increment > 0 && product.stockQuantity <= 0) {
      return alert("No more stocks!");
    }

    //update product data
    try {
      const response = await fetch(`${productRoute}/update-stock`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Increment,
          id,
        }),
      });
      console.log(`Stock updated for product ${id}`);
      const data = await response.json();
      product = data.product;
      console.log("data is", data);
    } catch (error) {
      console.error("Error updating stock:", error.message);
      return;
    }
    console.log(product);
    productStockQuantity = product.stockQuantity;
    setStockQuantity(productStockQuantity);

    setProductsIncart((preCart) => {
      if (product.quantity > 0) {
        // If the product exists in the cart, update it
        const productExistsInCart = preCart.find((item) => item.id === id);
        if (productExistsInCart) {
          return preCart.map((item) =>
            item.id === id ? product : item
          );
        }
        // If the product doesn't exist in the cart, add it
        return [...preCart, product];
      } else {
        // If quantity is 0, remove the product from the cart
        return preCart.filter((item) => item.id !== id);
      }
    });
  }

  function clearCart() {
    setProductsIncart([]);
    localStorage.setItem("productsIncart", JSON.stringify([]));
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        productsIncart,
        totalItems,
        totalPrice,
        mode,
        categories,
        lowestPrice,
        highestPrice,
        givenLowestPrice,
        givenHighestPrice,
        stockQuantity,
        isLoggedIn,
        setIsLoggedIn,
        setStockQuantity,
        AddToCart,
        clearCart,
        deleteProduct,
        modeSwitch,
        calculatePriceRange,
        setPriceRange,
        resetGivenPrice,
        setGivenLowestPrice,
        setGivenHighestPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export { ProductsProvider, ProductContext };
