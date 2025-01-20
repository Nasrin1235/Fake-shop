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
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        setIsLoggedIn(true);
       
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.token); 
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
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token"); 
    navigate("/login");
  };

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
                <label className="input-label">Passsword</label>
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
