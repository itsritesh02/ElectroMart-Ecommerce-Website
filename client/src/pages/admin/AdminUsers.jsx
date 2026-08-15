
import { useEffect, useState } from "react";
import api from "../../services/api";
import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data.users || []);
      } catch (error) {
        console.error("Get Users Error:", error);

        alert(
          error.response?.data?.message ||
            "Failed to load users"
        );
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      const res = await api.put(
        `/admin/users/${userId}/role`,
{
  role: newRole,
        }
      );

setUsers((prevUsers) =>
  prevUsers.map((user) =>
    user._id === userId
      ? {
        ...user,
        role: res.data.user.role,
      }
      : user
  )
);

alert("User role updated successfully");
    } catch (error) {
  console.error("Update Role Error:", error);

  alert(
    error.response?.data?.message ||
    "Failed to update user role"
  );
}
  };

const handleDelete = async (userId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    await api.delete(`/admin/users/${userId}`);

    setUsers((prevUsers) =>
      prevUsers.filter(
        (user) => user._id !== userId
      )
    );

    alert("User deleted successfully");
  } catch (error) {
    console.error("Delete User Error:", error);

    alert(
      error.response?.data?.message ||
      "Failed to delete user"
    );
  }
};

if (loading) {
  return (
    <div className="admin-users">
      <h2>Loading users...</h2>
    </div>
  );
}

return (
  <div className="admin-users">
    <div className="admin-users-header">
      <div>
        <h1>Users</h1>

        <p>
          Manage registered customers
        </p>
      </div>

      <div className="users-count">
        Total Users:
        <strong>{users.length}</strong>
      </div>
    </div>

    {users.length === 0 ? (
      <div className="no-users">
        <h2>No Users Found</h2>

        <p>
          There are no registered users.
        </p>
      </div>
    ) : (
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Joined</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <strong className="user-name">
                    {user.name}
                  </strong>
                </td>

                <td>
                  <span className="user-email">
                    {user.email}
                  </span>
                </td>

                <td>
                  <select
                    value={user.role || "user"}
                    onChange={(e) =>
                      handleRoleChange(
                        user._id,
                        e.target.value
                      )
                    }
                    className={`user-role role-${user.role || "user"
                      }`}
                  >
                    <option value="user">
                      User
                    </option>

                    <option value="admin">
                      Admin
                    </option>
                  </select>
                </td>

                <td>
                  {user.createdAt
                    ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                    : "N/A"}
                </td>

                <td>
                  <button
                    type="button"
                    className="delete-user-btn"
                    onClick={() =>
                      handleDelete(user._id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);
}

export default AdminUsers;

