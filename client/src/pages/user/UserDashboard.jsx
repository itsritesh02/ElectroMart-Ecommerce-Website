import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";


function UserDashboard() {

  // Redux se logged-in user lena
  const { user } = useSelector(
    (state) => state.auth
  );


  // Redux action dispatch karne ke liye
  const dispatch = useDispatch();


  // Page navigate karne ke liye
  const navigate = useNavigate();


  // Logout function
  const handleLogout = () => {

    dispatch(logout());

    navigate("/login");

  };


  return (

    <div>

      <h1>
        User Dashboard
      </h1>


      <h2>
        Welcome {user?.name}
      </h2>


      <button onClick={handleLogout}>
        Logout
      </button>

    </div>

  );
}


export default UserDashboard;



// import { useSelector } from "react-redux"
                                 // react-redux se useSelector hook import kiya.
                                // Is hook ka use Redux Store se data lene ke liye hota hai.

// const Dashboard = () => {
                                // Dashboard naam ka Functional Component banaya.

  // const { user } = useSelector((state) => state.auth)
                                 // useSelector Redux Store se data nikalta hai.
                                       // state => poora Redux Store hai.
                                           // state.auth => auth slice ka data.
                                        // { user } => auth object me se user ko destructure kiya.
                                              //
                                                // Example:
                                               // state = {
                                                  //   auth: {
                                                    //     user: {
                                           //       name: "Ritesh",
                                     //       email: "ritesh@gmail.com"
                                                     //     }
                                            //   }
                                       // }
                                          //
                                           // To user ki value hogi:
                                                // {
                                           //   name: "Ritesh",
                                       //   email: "ritesh@gmail.com"
                                                               // }

  // return (
                                             // JSX return ho raha hai jo browser me display hoga.

    // <div>
                                  {/* Sab elements ko wrap karne ke liye div use kiya hai. */}

      // <h1>User Dashboard</h1>
                                            {/* Dashboard ka heading show karega.  */}

      // <h2>Welcome {user?.name}</h2>
                                           {/* user ka name show karega. */}

                                          {/* ?. (Optional Chaining) ka matlab:
                             Agar user exist karta hai to uska name   dikhao.
                                 Agar user null ya undefined hai to error mat do.
                                              */}

                                                  {/* Example:
                                                   user = {
                                                    name: "Ritesh"
                                                      }

                                           Output:
                                            Welcome Ritesh
                                                 */}

                                        {/* Agar user = null ho to output:
                                           Welcome
                                  (Error nahi aayega)
                                   */}
    // </div>
  // )
// }

// export default Dashboard
                                            // Dashboard component ko export kiya.
                                   // Ab is component ko kisi bhi file me import karke use kar sakte hain.