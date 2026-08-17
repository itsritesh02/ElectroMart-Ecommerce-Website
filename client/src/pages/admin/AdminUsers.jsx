import { useEffect, useState } from "react";

import Swal from "sweetalert2";

import api from "../../services/api";

import "./AdminUsers.css";


function AdminUsers() {

  // ==========================
  // USERS
  // ==========================

  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);


  // ==========================
  // GET USERS
  // ==========================

  useEffect(() => {

    const getUsers = async () => {

      try {

        const res = await api.get(
          "/admin/users"
        );

        setUsers(
          res.data.users || []
        );

      } catch (error) {

        console.error(
          "Get Users Error:",
          error
        );

        Swal.fire({
          icon: "error",
          title: "Failed",
          text:
            error.response?.data?.message ||
            "Failed to load users",
          confirmButtonColor: "#111827",
        });

      } finally {

        setLoading(false);

      }

    };

    getUsers();

  }, []);


  // ==========================
  // CHANGE USER ROLE
  // ==========================

  const handleRoleChange = async (
    userId,
    newRole
  ) => {

    try {

      const res = await api.put(
        `/admin/users/${userId}/role`,
        {
          role: newRole,
        }
      );


      // UPDATE USER IN UI

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId
            ? {
              ...user,
              role:
                res.data.user.role,
            }
            : user
        )
      );


      // SUCCESS ALERT

      Swal.fire({
        icon: "success",
        title: "Role Updated",
        text:
          "User role updated successfully.",
        confirmButtonColor: "#111827",
        timer: 1800,
        showConfirmButton: false,
      });

    } catch (error) {

      console.error(
        "Update Role Error:",
        error
      );


      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Failed to update user role",
        confirmButtonColor: "#111827",
      });

    }

  };


  // ==========================
  // DELETE USER
  // ==========================

  const handleDelete = async (
    userId
  ) => {

    // SWEET ALERT CONFIRMATION

    const result = await Swal.fire({

      title: "Delete User?",

      text:
        "This user will be permanently deleted.",

      icon: "warning",

      showCancelButton: true,

      confirmButtonText:
        "Yes, Delete",

      cancelButtonText:
        "Cancel",

      confirmButtonColor:
        "#dc2626",

      cancelButtonColor:
        "#6b7280",

      reverseButtons: true,

    });


    // USER CANCELLED

    if (!result.isConfirmed) {
      return;
    }


    try {

      await api.delete(
        `/admin/users/${userId}`
      );


      // REMOVE USER FROM UI

      setUsers((prevUsers) =>
        prevUsers.filter(
          (user) =>
            user._id !== userId
        )
      );


      // SUCCESS ALERT

      Swal.fire({

        icon: "success",

        title: "Deleted!",

        text:
          "User deleted successfully.",

        confirmButtonColor:
          "#111827",

        timer: 1800,

        showConfirmButton: false,

      });

    } catch (error) {

      console.error(
        "Delete User Error:",
        error
      );


      Swal.fire({

        icon: "error",

        title: "Delete Failed",

        text:
          error.response?.data?.message ||
          "Failed to delete user",

        confirmButtonColor:
          "#111827",

      });

    }

  };


  // ==========================
  // LOADING
  // ==========================

  if (loading) {

    return (

      <div className="admin-users">

        <div className="users-loading">

          <h2>
            Loading users...
          </h2>

          <p>
            Please wait while we fetch
            registered users.
          </p>

        </div>

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


        {/* USERS COUNT */}

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

          <div className="no-users-icon">
            👥
          </div>

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


            {/* TABLE HEADER */}

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


            {/* TABLE BODY */}

            <tbody>

              {users.map((user) => (

                <tr
                  key={user._id}
                >


                  {/* NAME */}

                  <td>

                    <strong className="user-name">

                      {user.name}

                    </strong>

                  </td>


                  {/* EMAIL */}

                  <td>

                    <span className="user-email">

                      {user.email}

                    </span>

                  </td>


                  {/* ROLE */}

                  <td>

                    <select

                      value={
                        user.role ||
                        "user"
                      }

                      onChange={(e) =>
                        handleRoleChange(
                          user._id,
                          e.target.value
                        )
                      }

                      className={`user-role role-${user.role ||
                        "user"
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


                  {/* JOINED */}

                  <td>

                    {user.createdAt
                      ? new Date(
                        user.createdAt
                      ).toLocaleDateString()
                      : "N/A"}

                  </td>


                  {/* DELETE */}

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