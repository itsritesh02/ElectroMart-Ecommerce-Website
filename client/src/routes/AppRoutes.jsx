
import { Routes, Route } from 'react-router-dom'

import Register from '../pages/auth/register'
import Login from '../pages/auth/Login'
const AppRoutes = () => {
  return (
    <div>
      <Routes>

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default AppRoutes

