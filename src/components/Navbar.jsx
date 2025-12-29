import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav>
      <span>{user.fullName} ({user.role})</span>
      <Link to="/">Profile</Link>

      {user.role === "admin" && <Link to="/admin">Admin</Link>}

      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;
