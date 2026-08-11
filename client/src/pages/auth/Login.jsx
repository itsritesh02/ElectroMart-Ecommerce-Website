import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import api from "../../services/api";
import { loginSuccess } from "../../redux/slice/authSlice.js";

import "./Login.css";


function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        "/auth/login",
        formData
      );


      dispatch(loginSuccess(res.data));


      if (res.data.user.role === "admin") {

        navigate("/admin/dashboard");

      } else {

        navigate("/user/dashboard");

      }

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Login Failed"
      );

    }

  };


  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>Login</h1>

        <p className="auth-subtitle">
          Login to your ElectroMart account
        </p>


        <form onSubmit={handleSubmit}>

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


          <div className="form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>

        </form>


        <p className="auth-bottom">

          Don't have an account?

          <span onClick={() => navigate("/register")}>
            Register
          </span>

        </p>

      </div>

    </div>

  );
}


export default Login;