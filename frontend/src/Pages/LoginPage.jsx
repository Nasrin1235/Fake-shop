import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
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

  const handleLogin = (e) => {
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
        localStorage.setItem("isLoggedIn", "true"); //
        localStorage.setItem("username", data.username); //
        // Do not store the token in localStorage, it will be handled by the cookie
        // The server will set the token in the cookie
       
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
    localStorage.removeItem("isLoggedIn"); //
    localStorage.removeItem("username"); //
    // Remove the token cookie on logout
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("token"); 
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