
import { useEffect, useState } from "react";

import api from "../../services/api";

import "./AdminUsers.css";


function AdminUsers() {

  // ==========================
  // USERS STATE
  // ==========================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);


  // ==========================
  // GET ALL USERS
  // ==========================

  useEffect(() => {

    const getUsers = async () => {

      try {

        const res = await api.get(
          "/admin/users"
        );


        console.log(
          "ADMIN USERS:",
          res.data
        );


        setUsers(
          res.data.users || []
        );


      } catch (error) {

        console.error(
          "Get Users Error:",
          error
        );


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


  // ==========================
  // UPDATE USER ROLE
  // ==========================

  const handleRoleChange = async (
    userId,
    newRole
  ) => {

    try {

      const res = await api.put(
        `/ admin / users / ${ userId }/role`,
{
  role: newRole,
        }
      );


console.log(
  "ROLE UPDATED:",
  res.data
);


// ==========================
// UPDATE UI
// ==========================

setUsers((prevUsers) => {

  return prevUsers.map(
    (user) => {

      if (user._id === userId) {

        return {
          ...user,
          role: newRole,
        };

      }

      return user;

    }
  );

});


alert(
  "User role updated successfully"
);


    } catch (error) {

  console.error(
    "Update Role Error:",
    error
  );


  alert(
    error.response?.data?.message ||
    "Failed to update user role"
  );

}

  };


// ==========================
// DELETE USER
// ==========================

const handleDelete = async (
  userId
) => {

  const confirmDelete =
    window.confirm(
      "Are you sure you want to delete this user?"
    );


  if (!confirmDelete) {

    return;

  }


  try {

    const res = await api.delete(
      `/admin/users/${userId}`
    );


    console.log(
      "USER DELETED:",
      res.data
    );


    // ==========================
    // REMOVE USER FROM UI
    // ==========================

    setUsers((prevUsers) =>
      prevUsers.filter(
        (user) =>
          user._id !== userId
      )
    );


    alert(
      "User deleted successfully"
    );


  } catch (error) {

    console.error(
      "Delete User Error:",
      error
    );


    alert(
      error.response?.data?.message ||
      "Failed to delete user"
    );

  }

};


// ==========================
// LOADING
// ==========================

if (loading) {

  return (

    <div className="admin-users">

      <h2>
        Loading users...
      </h2>

    </div>

  );

}


// ==========================
// PAGE
// ==========================

return (

  <div className="admin-users">


    {/* ==========================
          HEADER
      ========================== */}

    <div className="admin-users-header">

      <div>

        <h1>
          Users
        </h1>

        <p>
          Manage registered customers
        </p>

      </div>


      {/* ==========================
            USER COUNT
        ========================== */}

      <div className="users-count">

        Total Users:

        <strong>
          {users.length}
        </strong>

      </div>

    </div>


    {/* ==========================
          NO USERS
      ========================== */}

    {users.length === 0 ? (

      <div className="no-users">

        <h2>
          No Users Found
        </h2>

        <p>
          There are no registered users.
        </p>

      </div>

    ) : (


      /* ==========================
         USERS TABLE
      ========================== */

      <div className="users-table-container">

        <table className="users-table">

          <thead>

            <tr>

              <th>
                Name
              </th>

              <th>
                Email
              </th>

              <th>
                Role
              </th>

              <th>
                Joined
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>


          <tbody>

            {users.map((user) => (

              <tr
                key={user._id}
              >


                {/* ==========================
                      NAME
                  ========================== */}

                <td>

                  <strong className="user-name">

                    {user.name}

                  </strong>

                </td>


                {/* ==========================
                      EMAIL
                  ========================== */}

                <td>

                  <span className="user-email">

                    {user.email}

                  </span>

                </td>


                {/* ==========================
                      ROLE
                  ========================== */}

                <td>

                  <select
                    value={
                      user.role || "user"
                    }
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


                {/* ==========================
                      JOINED DATE
                  ========================== */}

                <td>

                  {user.createdAt
                    ? new Date(
                      user.createdAt
                    ).toLocaleDateString()
                    : "N/A"}

                </td>


                {/* ==========================
                      DELETE
                  ========================== */}

                <td>

                  <button
                    type="button"
                    className="delete-user-btn"
                    onClick={() =>
                      handleDelete(
                        user._id
                      )
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
