import { useState, useContext } from "react";
import axios from "../utils/axiosInstance";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/auth/login", credentials);
      login(res.data.token);
      navigate("/forum");
    } catch (err) {
      setError("Email ou mot de passe invalide");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Login;