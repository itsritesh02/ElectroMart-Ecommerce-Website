import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/slice/authSlice";

import "./Profile.css";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = () => {
    dispatch(logout());

    // Optional local storage cleanup
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  // ==========================
  // USER NOT FOUND
  // ==========================

  if (!user) {
    return (
      <main className="profile-page">
        <section className="profile-card profile-error-card">
          <div className="profile-error-icon">!</div>

          <h2>User information not found</h2>

          <p>
            Please login to view your profile information.
          </p>

          <button
            type="button"
            className="profile-login-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </section>
      </main>
    );
  }

  // ==========================
  // USER INITIAL
  // ==========================

  const userInitial =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <main className="profile-page">
      <section className="profile-card">

        {/* ==========================
            HEADER
        ========================== */}

        <header className="profile-header">
          <div className="profile-avatar">
            {userInitial}
          </div>

          <div className="profile-header-content">
            <h1>
              {user.name || "User"}
            </h1>

            <p>
              {user.role || "User"}
            </p>
          </div>
        </header>


        {/* ==========================
            PROFILE INFORMATION
        ========================== */}

        <section className="profile-info">

          {/* NAME */}

          <div className="profile-row">
            <div className="profile-label">
              <span className="profile-label-icon">
                👤
              </span>

              <span>Name</span>
            </div>

            <strong>
              {user.name || "Not provided"}
            </strong>
          </div>


          {/* EMAIL */}

          <div className="profile-row">
            <div className="profile-label">
              <span className="profile-label-icon">
                ✉
              </span>

              <span>Email</span>
            </div>

            <strong>
              {user.email || "Not provided"}
            </strong>
          </div>


          {/* PHONE */}

          <div className="profile-row">
            <div className="profile-label">
              <span className="profile-label-icon">
                ☎
              </span>

              <span>Phone</span>
            </div>

            <strong>
              {user.phone || "Not provided"}
            </strong>
          </div>


          {/* ACCOUNT TYPE */}

          {/* <div className="profile-row">
            <div className="profile-label">
              <span className="profile-label-icon">
                ◈
              </span>

              <span>Account Type</span>
            </div>

            <strong className="profile-role">
              {user.role || "User"}
            </strong>
          </div> */}

        </section>


        {/* ==========================
            ACTION BUTTONS
        ========================== */}

        <footer className="profile-actions">

          {/* DASHBOARD */}

          {/* <button
            type="button"
            className="dashboard-btn"
            onClick={() => navigate("/user/dashboard")}
          >
            <span>▣</span>
            Go To Dashboard
          </button> */}


          {/* LOGOUT */}

          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            <span>↪</span>
            Logout
          </button>

        </footer>

      </section>
    </main>
  );
}

export default Profile;