import { useEffect, useState } from "react";
import api from "../api/axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/users?page=${page}`);
      setUsers(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  const updateStatus = async (id, action) => {
    const confirmAction = window.confirm(
      `Are you sure you want to ${action} this user?`
    );
    if (!confirmAction) return;

    try {
      await api.patch(`/users/${id}/${action}`);
      alert(`User ${action}d successfully`);
      loadUsers();
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {loading && <p>Loading users...</p>}

      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="5">No users found</td>
            </tr>
          )}

          {users.map((u) => (
            <tr key={u._id}>
              <td>{u.email}</td>
              <td>{u.fullName}</td>
              <td>{u.role}</td>
              <td>{u.status}</td>
              <td>
                {u.status === "active" ? (
                  <button
                    className="danger"
                    onClick={() => updateStatus(u._id, "deactivate")}
                  >
                    Deactivate
                  </button>
                ) : (
                  <button onClick={() => updateStatus(u._id, "activate")}>
                    Activate
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
