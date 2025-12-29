import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      return setError("Passwords do not match");
    }
    try {
      await api.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

 return (
  <div className="container">
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Full Name"
        onChange={e => setForm({ ...form, fullName: e.target.value })}
      />

      <input
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        onChange={e => setForm({ ...form, confirm: e.target.value })}
      />

      <button type="submit">Create Account</button>
    </form>
  </div>
);

};

export default Signup;
