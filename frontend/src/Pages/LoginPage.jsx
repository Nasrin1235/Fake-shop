import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../contex/ProductsContext";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useContext(ProductContext);

  const navigate = useNavigate();


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

        // Do not store the token in localStorage, it will be handled by the cookie
        // The server will set the token in the cookie

        navigate("/");
      } else {
        setError(data.error || "Incorrect username or password");
      }
    } catch (err) {
      setError("Something went wrong, please try again.");
      console.error("Login error:", err);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);

    // Remove the token cookie on logout
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    navigate("/login");
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
                <label className="input-label">Name</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="text-input"
                  value={email}
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
                  value={password}
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
