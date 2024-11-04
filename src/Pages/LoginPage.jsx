import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
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

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "oln" && password === "oln") {
      setError("");
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      navigate("/");
      navigate("/");
    } else {
      setError("Incorrect user name or password");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
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
                  type="text"
                  placeholder="Enter your name"
                  className="text-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
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
