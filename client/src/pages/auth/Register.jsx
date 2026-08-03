import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import api from "../../services/api";


const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", formData);
      alert(res.data.message);
      navigate("/login");

    }
    catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" name="name" placeholder="Name" />
      <input onChange={handleChange} type="email" name="email" placeholder="Email" />
      <input onChange={handleChange} type="password" name="password" placeholder="Password" />
      <input onChange={handleChange} type="text" name="phone" placeholder="Phone" />
      <button>Register</button>
    </form>
  )
}
export default Register
