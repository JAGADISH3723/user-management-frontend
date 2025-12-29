import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import api from "../api/axios";

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);

  const save = async () => {
    await api.put("/users/profile", { fullName: name, email });
    alert("Profile updated");
  };

  return (
    <div className="container">
    <h2>Profile</h2>

      <input value={name} onChange={e => setName(e.target.value)} />
      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={save}>Save</button>
    </div>
  );
};

export default Profile;
