import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "oln" && password === "oln") {
      setError("");
      navigate("/");
    } else {
      setError("Incorrect user name or password");
    }
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <h2 className="login-title">LOGIN</h2>
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
      </div>
    </section>
  );
};

export default LoginPage;
