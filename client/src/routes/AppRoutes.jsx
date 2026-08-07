
import { Routes, Route } from 'react-router-dom'

 
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'

import UserDashboard from '../pages/user/userDashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'

import ProtectedRoute from './ProtectedRoute'
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
  return (
    <div>
      <Routes>

        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login />} />


<Route element={<ProtectedRoute/>} >
<Route path='/user/dashboard' element={<UserDashboard />} />
</Route>

<Route element={<AdminRoute/>}>
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
</Route>




        
      </Routes>
    </div>
  )
}

export default AppRoutes

