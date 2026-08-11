import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import "./Register.css";


const Register = () => {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await api.post(
        "/auth/register",
        formData
      );


      alert(res.data.message);

      navigate("/login");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };


  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Register</h1>

        <p className="auth-subtitle">
          Create your ElectroMart account
        </p>


        <form onSubmit={handleSubmit}>


          {/* Name */}

          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* Email */}

          <div className="form-group">

            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* Password */}

          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* Phone */}

          <div className="form-group">

            <label>Phone</label>

            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

          </div>


          <button
            type="submit"
            className="auth-btn"
          >
            Register
          </button>


        </form>


        <p className="auth-bottom">

          Already have an account?

          <span onClick={() => navigate("/login")}>
            Login
          </span>

        </p>


      </div>

    </div>

  );
};


export default Register;