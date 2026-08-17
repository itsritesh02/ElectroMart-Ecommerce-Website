import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

import api from "../../services/api";

import "./ForgotPassword.css";


function ForgotPassword() {

  const navigate = useNavigate();


  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  // ==========================
  // SUBMIT
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      setLoading(true);


      const res = await api.post(
        "/auth/forgot-password",
        {
          email,
        }
      );


      await Swal.fire({
        icon: "success",
        title: "Email Sent",
        text:
          res.data.message ||
          "Password reset link has been sent to your email.",
        confirmButtonText: "OK",
        confirmButtonColor: "#111827",
      });


      setEmail("");


    } catch (error) {

      console.error(
        "Forgot Password Error:",
        error
      );


      Swal.fire({
        icon: "error",
        title: "Failed",
        text:
          error.response?.data?.message ||
          "Unable to send reset email.",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#dc2626",
      });


    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>
          Forgot Password
        </h1>

        <p className="auth-subtitle">
          Enter your email to reset your password
        </p>


        <form onSubmit={handleSubmit}>


          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

          </div>


          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >

            {loading
              ? "Sending..."
              : "Send Reset Link"}

          </button>


        </form>


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


export default ForgotPassword;