import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./Login.css"; // Import your CSS file (if available)

function Login() {
    const initialValues = {email: "", password: ""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
        }
    },[formErrors]);

    const validate = (values) => {
        
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!formValues.email){
            errors.email = "Email is required!"; 
        }else if(!regex.test(values.email)){
            errors.email = "This is not a valid email format!";
        }
        if (!formValues.password){
            errors.password = "Password is required!"; 
        }
        return errors;
    }
  return (
    <div>
      {/* Main container div for the page content */}
      <div className="container">
        {/*<pre>{JSON.stringify(formValues, undefined, 2)}</pre>*/}
        {/* Div for login grid layout */}
        <div className="login-grid">
          {/* Div for login text */}
          <div className="login-text">
            <h2>Login</h2>
          </div>

          {/* Additional login text with a link to Sign Up page */}
          <div className="login-text">
            Are you a new member?{" "}
            <span>
              <a href="../Sign_Up/Sign_Up.html" style={{ color: "#2190FF" }}>
                {" "}
                Sign Up Here
              </a>
            </span>
          </div>

          <br />

          {/* Div for login form */}
          <div className="login-form">
            <form>
              {/* Form group for email input */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-describedby="helpId"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
                {formErrors.email && (
                    <p style={{ color: "red" }}>{formErrors.email}</p>
                )}
              {/* Form group for password input */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                  value={formValues.password}
                  onChange={handleChange}
                />
              </div>
                {formErrors.password && (
                    <p style={{ color: "red" }}>{formErrors.password}</p>
                )}
              {/* Button group for login and reset buttons */}
              <div className="btn-group">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                  onClick={handleSubmit}
                >
                  Login
                </button>
                <button
                  type="reset"
                  className="btn btn-danger mb-2 waves-effect waves-light"
                >
                  Reset
                </button>
              </div>

              <br />

              {/* Additional login text for 'Forgot Password' option */}
              <div className="login-text">Forgot Password?</div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
