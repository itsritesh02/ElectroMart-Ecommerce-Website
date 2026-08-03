
import { Routes, Route } from 'react-router-dom'

 
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'

import UserDashboard from '../pages/user/userDashboard'
import AdminDashboard from '../pages/admin/AdminDashboard'
const AppRoutes = () => {
  return (
    <div>
      <Routes>

        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/user/dashboard' element={<UserDashboard/>} />
        <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      </Routes>
    </div>
  )
}

export default AppRoutes

