import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Swal from "sweetalert2";

import api from "../../services/api";

import "./ResetPassword.css";


function ResetPassword() {

  const navigate = useNavigate();

  const { token } = useParams();


  // ==========================
  // FORM DATA
  // ==========================

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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
  // RESET PASSWORD
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    // ==========================
    // PASSWORD MATCH
    // ==========================

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      Swal.fire({
        icon: "warning",
        title: "Passwords Don't Match",
        text: "Please make sure both passwords are the same.",
        confirmButtonColor: "#111827",
      });

      return;

    }


    // ==========================
    // PASSWORD LENGTH
    // ==========================

    if (formData.password.length < 6) {

      Swal.fire({
        icon: "warning",
        title: "Weak Password",
        text: "Password must be at least 6 characters.",
        confirmButtonColor: "#111827",
      });

      return;

    }


    try {

      const res = await api.put(
        `/auth/reset-password/${token}`,
        {
          password: formData.password,
        }
      );


      // ==========================
      // SUCCESS
      // ==========================

      await Swal.fire({
        icon: "success",
        title: "Password Reset Successful!",
        text:
          res.data.message ||
          "Your password has been reset successfully.",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#111827",
      });


      navigate("/login");


    } catch (error) {

      console.error(
        "Reset Password Error:",
        error
      );


      Swal.fire({
        icon: "error",
        title: "Reset Failed",
        text:
          error.response?.data?.message ||
          "Reset link is invalid or expired.",
        confirmButtonText: "Go to Login",
        confirmButtonColor: "#dc2626",
      });

    }

  };


  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>
          Reset Password
        </h1>


        <p className="auth-subtitle">
          Create a new password for your account
        </p>


        <form onSubmit={handleSubmit}>


          {/* ==========================
              NEW PASSWORD
          ========================== */}

          <div className="form-group">

            <label htmlFor="password">
              New Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />

          </div>


          {/* ==========================
              CONFIRM PASSWORD
          ========================== */}

          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={
                formData.confirmPassword
              }
              onChange={handleChange}
              required
              minLength="6"
            />

          </div>


          {/* ==========================
              RESET BUTTON
          ========================== */}

          <button
            type="submit"
            className="auth-btn"
          >
            Reset Password
          </button>


        </form>


        {/* ==========================
            BACK TO LOGIN
        ========================== */}

        <p className="auth-bottom">

          Remember your password?

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

}


export default ResetPassword;