import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token, res.data.user);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  return (
  <div className="container">
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>

      <p style={{ marginTop: "10px" }}>
        New user? <Link to="/signup">Signup</Link>
      </p>
    </form>
  </div>
);

};

export default Login;
