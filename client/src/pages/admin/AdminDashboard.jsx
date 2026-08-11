import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";


function AdminDashboard() {

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

    <div className="admin-dashboard">

      {/* Header */}

      <div className="admin-header">

        <div>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage your ElectroMart store
          </p>

        </div>


        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* Welcome */}

      <div className="admin-welcome">

        <h2>
          Welcome, {user?.name || "Admin"} 👋
        </h2>

        <p>
          You are logged in as an administrator.
        </p>

      </div>


      {/* Dashboard Cards */}

      <div className="admin-cards">

        <div className="admin-card">

          <h3>
            Products
          </h3>

          <p>
            0
          </p>

          <button>
            Manage Products
          </button>

        </div>


        <div className="admin-card">

          <h3>
            Orders
          </h3>

          <p>
            0
          </p>

          <button>
            Manage Orders
          </button>

        </div>


        <div className="admin-card">

          <h3>
            Users
          </h3>

          <p>
            0
          </p>

          <button>
            Manage Users
          </button>

        </div>


        <div className="admin-card">

          <h3>
            Revenue
          </h3>

          <p>
            ₹0
          </p>

          <button>
            View Revenue
          </button>

        </div>

      </div>

    </div>

  );
}


export default AdminDashboard;



//import { useSelector } from "react-redux"; 
                                    // Redux Store se data lene ke liye useSelector hook import kiya

// const Dashboard = () => {
                                  // Redux Store ke auth slice se user object nikal rahe hain
  // const { user } = useSelector((state) => state.auth);

  // return (
    // <div>
                                     {/* Dashboard ka Heading */}
      // <h1>User Dashboard</h1>

                                      {/* Logged-in user ka name show hoga */}
                                         {/* ?. ka matlab hai agar user available hai to uska name dikhao,
                                          warna error mat do */}
      // <h2>Welcome {user?.name}</h2>
    // </div>
  // );
// };

// export default Dashboard; 

                                           // Dashboard component ko dusri files me use karne ke liye export kiya