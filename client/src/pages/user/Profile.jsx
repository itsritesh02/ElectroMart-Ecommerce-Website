import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../redux/slice/authSlice";

import "./Profile.css";


function Profile() {

  const dispatch = useDispatch();

  const navigate = useNavigate();


  // ==========================
  // GET USER FROM REDUX
  // ==========================

  const { user } = useSelector(
    (state) => state.auth
  );


  // ==========================
  // LOGOUT
  // ==========================

  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");

  };


  // ==========================
  // USER NOT FOUND
  // ==========================

  if (!user) {

    return (

      <div className="profile-page">

        <div className="profile-card">

          <h2>
            User information not found
          </h2>

          <button
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </div>

    );

  }


  return (

    <div className="profile-page">


      {/* ==========================
          PROFILE CARD
      ========================== */}

      <div className="profile-card">


        {/* ==========================
            PROFILE HEADER
        ========================== */}

        <div className="profile-header">

          <div className="profile-avatar">

            {user.name
              ?.charAt(0)
              .toUpperCase()}

          </div>


          <div>

            <h1>
              {user.name}
            </h1>

            <p>
              {user.role || "User"}
            </p>

          </div>

        </div>


        {/* ==========================
            USER INFORMATION
        ========================== */}

        <div className="profile-info">


          {/* NAME */}

          <div className="profile-row">

            <span>
              Name
            </span>

            <strong>
              {user.name}
            </strong>

          </div>


          {/* EMAIL */}

          <div className="profile-row">

            <span>
              Email
            </span>

            <strong>
              {user.email}
            </strong>

          </div>


          {/* PHONE */}

          <div className="profile-row">

            <span>
              Phone
            </span>

            <strong>
              {user.phone || "Not provided"}
            </strong>

          </div>


          {/* ROLE */}

          <div className="profile-row">

            <span>
              Account Type
            </span>

            <strong>
              {user.role || "user"}
            </strong>

          </div>


        </div>


        {/* ==========================
            ACTIONS
        ========================== */}

        <div className="profile-actions">


          <button
            type="button"
            className="dashboard-btn"
            onClick={() =>
              navigate("/user/dashboard")
            }
          >
            Go To Dashboard
          </button>


          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>


        </div>


      </div>

    </div>

  );

}


export default Profile;