import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('register:', username, email, password)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include' 
      });

      const data = await response.json();
      console.log('Response from server:', data);  // 调试输出响应

      if (response.ok) {
        setError("");
        navigate("/login");
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <section className="register-section">
      <div className="register-container">
        <h2 className="register-title">REGISTER</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <div className="input-field">
              <label className="input-label">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="text-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </div>
            <div className="input-field">
              <label className="input-label">Email</label>
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
                autoComplete="new-password"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="submit-button">
              Register
            </button>
          </div>
        </form>
        <p className="login-prompt">Already registered?</p>
        <button onClick={handleNavigateToLogin} className="login-button">
          Go to Login
        </button>
      </div>
    </section>
  );
};

export default RegisterPage;