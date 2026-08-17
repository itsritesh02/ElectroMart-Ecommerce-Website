import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

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


  // ==========================
  // HANDLE INPUT
  // ==========================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };


  // ==========================
  // REGISTER
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const res = await api.post(
        "/auth/register",
        formData
      );


      // ==========================
      // SUCCESS ALERT
      // ==========================

      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text:
          res.data.message ||
          "Your ElectroMart account has been created successfully.",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#111827",
      });


      // ==========================
      // GO TO LOGIN
      // ==========================

      navigate("/login");


    } catch (error) {

      console.error(
        "Registration Error:",
        error
      );


      // ==========================
      // ERROR ALERT
      // ==========================

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#dc2626",
      });

    }

  };


  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>
          Register
        </h1>

        <p className="auth-subtitle">
          Create your ElectroMart account
        </p>


        <form onSubmit={handleSubmit}>


          {/* ==========================
              NAME
          ========================== */}

          <div className="form-group">

            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />

          </div>


          {/* ==========================
              EMAIL
          ========================== */}

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


          {/* ==========================
              PASSWORD
          ========================== */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          {/* ==========================
              PHONE
          ========================== */}

          <div className="form-group">

            <label htmlFor="phone">
              Phone
            </label>

            <input
              id="phone"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

          </div>


          {/* ==========================
              REGISTER BUTTON
          ========================== */}

          <button
            type="submit"
            className="auth-btn"
          >
            Register
          </button>


        </form>


        {/* ==========================
            LOGIN
        ========================== */}

        <p className="auth-bottom">

          Already have an account?

          <span
            onClick={() =>
              navigate("/login")
            }
          >
            Login
          </span>

        </p>


      </div>

    </div>

  );

};


export default Register;