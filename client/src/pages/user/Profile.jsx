import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../redux/slice/authSlice";

import { useNavigate } from "react-router-dom";

import "./Profile.css";


function Profile() {

  // Redux se user lena
  const { user } = useSelector(
    (state) => state.auth
  );


  const dispatch = useDispatch();

  const navigate = useNavigate();


  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");

  };


  return (
    <div className="profile-page">

      <div className="profile-card">

        <h1>
          My Profile
        </h1>


        <div className="profile-info">

          <p>
            <strong>Name:</strong>{" "}
            {user?.name || "N/A"}
          </p>


          <p>
            <strong>Email:</strong>{" "}
            {user?.email || "N/A"}
          </p>


          <p>
            <strong>Role:</strong>{" "}
            {user?.role || "user"}
          </p>

        </div>


        <button
          className="profile-logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}


export default Profile;