import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contex/ProductsContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, setIsLoggedIn, clearCart, productsIncart, setProductsIncart} =
    useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [setIsLoggedIn]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        setIsLoggedIn(true);
  
        if (data.cart) {
          setProductsIncart(data.cart); 
          console.log("Cart data loaded:", data.cart);
        } else {
          console.warn("No cart data received from server.");
        }
      } else {
        setError(data.error || "Incorrect username or password");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
      console.error("Login error:", err);
    }
  };

  const handleLogout = async () => {
    console.log('productsIncart logout:',productsIncart)
    try {
      const response = await fetch("http://localhost:3001/api/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: productsIncart }),
      });

      if (response.ok) {
      
        setIsLoggedIn(false);
        clearCart();
        console.log("productsIncart in localstorage cleared!")
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="));
  console.log("document.cookie:", document.cookie);
  console.log("isLoggedIn:", isLoggedIn);
  console.log("token:", token);

  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="login-title">LOGIN</h2>
        {isLoggedIn && (
          <>
            <p className="success-message">You have successfully logged in!</p>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </>
        )}
        {!isLoggedIn && (
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <div className="input-field">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="text-input"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="input-field">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="text-input"
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default LoginPage;
