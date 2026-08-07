import {Navigate, Outlet} from 'react-router-dom'
import { useSelector } from "react-redux";

const ProtectedRoute = () => {

  const {isAuthenticated}= useSelector((state)=>state.auth);
  return isAuthenticated?<Outlet/>:<Navigate to='/login'replace/>
}

export default ProtectedRoute


/*
User Opens Protected Route
(User Protected Route open karta hai)
            │
            ▼
Check isAuthenticated
(isAuthenticated check hota hai)
            │
     ┌──────┴──────┐
     │             │
   true          false
     │             │
     ▼             ▼
<Outlet />    <Navigate />
(Render Page)  (Login Page) */



/*
import { Navigate, Outlet } from "react-router-dom";
// English: Import Navigate and Outlet from React Router DOM.
// Hindi: React Router DOM se Navigate aur Outlet import kiya.

import { useSelector } from "react-redux";
// English: Import useSelector to access Redux Store data.
// Hindi: Redux Store ka data lene ke liye useSelector import kiya.

const ProtectedRoute = () => {
  // English: Create a ProtectedRoute component.
  // Hindi: ProtectedRoute naam ka Functional Component banaya.

  const { isAuthenticated } = useSelector((state) => state.auth);
  // English: Get isAuthenticated from the auth slice of Redux Store.
  // Hindi: Redux Store ke auth slice se isAuthenticated ki value li.

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  // English:
  // If isAuthenticated is true → Render the child route using <Outlet />.
  // If isAuthenticated is false → Redirect the user to the Login page.
  // replace removes the current page from browser history.

  // Hindi:
  // Agar isAuthenticated true hai → Child Route (<Outlet />) ko render karo.
  // Agar isAuthenticated false hai → User ko Login Page par bhej do.
  // replace ka matlab Browser History me current page replace ho jayega.
};

export default ProtectedRoute;
// English: Export the ProtectedRoute component.
// Hindi: ProtectedRoute component ko export kiya taaki dusri files me use kar saken. */