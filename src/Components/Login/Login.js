import React, { useEffect, useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";


function Login() {
  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        // ✅ Replace this URL with your real backend endpoint
        const response = await fetch("https://juniorlake12-8181.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formValues),
          });
        

        const data = await response.json();

        if (response.ok) {
          // ✅ Save login data to sessionStorage
          sessionStorage.setItem("auth-token", data.token);
          sessionStorage.setItem("name", data.name);

          // ✅ Redirect user and refresh Navbar
          navigate("/");
          window.location.reload();
        } else {
          // Show backend error message
          setErrorMessage(data.message || "Invalid email or password");
        }
      } catch (error) {
        console.error("Login failed:", error);
        setErrorMessage("Server error. Please try again later.");
      }
    }

    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    }

    return errors;
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>

          <div className="login-text">
            Are you a new member?{" "}
            <span>
              <a href="../Sign_Up/Sign_Up.html" style={{ color: "#2190FF" }}>
                Sign Up Here
              </a>
            </span>
          </div>

          <br />

          <div className="login-form">
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              {formErrors.email && (
                <p style={{ color: "red" }}>{formErrors.email}</p>
              )}

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
              {formErrors.password && (
                <p style={{ color: "red" }}>{formErrors.password}</p>
              )}

              {/* Error message from backend */}
              {errorMessage && (
                <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
              )}

              {/* Buttons */}
              <div className="btn-group">
                <button type="submit" className="btn btn-primary mb-2 mr-1">
                  Login
                </button>
                <button type="reset" className="btn btn-danger mb-2">
                  Reset
                </button>
              </div>

              <br />
              <div className="login-text">Forgot Password?</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
