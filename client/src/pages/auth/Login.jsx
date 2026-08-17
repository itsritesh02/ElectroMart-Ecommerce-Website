import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";

import api from "../../services/api";
import { loginSuccess } from "../../redux/slice/authSlice.js";

import "./Login.css";


function Login() {

  const navigate = useNavigate();

  const dispatch = useDispatch();


  // ==========================
  // FORM DATA
  // ==========================

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  // ==========================
  // HANDLE CHANGE
  // ==========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // ==========================
  // LOGIN
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const res = await api.post(
        "/auth/login",
        formData
      );


      dispatch(loginSuccess(res.data));


      await Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${res.data.user?.name || "User"
          } 👋`,
        confirmButtonText: "Continue",
        confirmButtonColor: "#111827",
        timer: 1800,
        timerProgressBar: true,
      });


      // ==========================
      // ROLE REDIRECT
      // ==========================

      if (
        res.data.user?.role === "admin"
      ) {

        navigate("/admin/dashboard");

      } else {

        navigate("/user/dashboard");

      }


    } catch (err) {

      console.error(
        "Login Error:",
        err
      );


      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text:
          err.response?.data?.message ||
          "Invalid email or password.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#dc2626",
      });

    }

  };


  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>
          Login
        </h1>

        <p className="auth-subtitle">
          Login to your ElectroMart account
        </p>


        <form onSubmit={handleSubmit}>


          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

          </div>


          {/* PASSWORD */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* ==========================
              FORGOT PASSWORD
          ========================== */}

          <div className="forgot-password">

            <span
              onClick={() =>
                navigate("/forgot-password")
              }
            >
              Forgot Password?
            </span>

          </div>


          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="auth-btn"
          >
            Login
          </button>

        </form>


        {/* REGISTER */}

        <p className="auth-bottom">

          Don't have an account?

          <span
            onClick={() =>
              navigate("/register")
            }
          >
            Register
          </span>

        </p>

      </div>

    </div>

  );

}


export default Login;