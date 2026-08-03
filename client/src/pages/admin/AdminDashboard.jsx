import { useSelector } from "react-redux";

function AdminDashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>Welcome {user?.name}</h2>
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