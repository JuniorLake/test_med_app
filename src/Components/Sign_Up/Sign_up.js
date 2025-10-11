import React from "react";
import "./Sign_Up.css"; // Optional CSS import

function Sign_Up() {
  return (
    <div>
      {/* Main container with margin-top */}
      <div className="container" style={{ marginTop: "5%" }}>
        {/* Grid layout for sign-up form */}
        <div className="signup-grid">
          {/* Title for the sign-up form */}
          <div className="signup-text">
            <h1>Sign Up</h1>
          </div>

          {/* Text for existing members to log in */}
          <div className="signup-text1" style={{ textAlign: "left" }}>
            Already a member?{" "}
            <span>
              <a href="../Login/Login.html" style={{ color: "#2190FF" }}>
                Login
              </a>
            </span>
          </div>

          {/* Form for user sign-up */}
          <div className="signup-form">
            <form>
              {/* Form group for user's name */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="form-control"
                  placeholder="Enter your name"
                  aria-describedby="helpId"
                />
              </div>

              {/* Form group for user's phone number */}
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  className="form-control"
                  placeholder="Enter your phone number"
                  aria-describedby="helpId"
                />
              </div>

              {/* Form group for user's email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="form-control"
                  placeholder="Enter your email"
                  aria-describedby="helpId"
                />
              </div>

              {/* Form group for user's password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                />
              </div>

              {/* Button group for form submission and reset */}
              <div className="btn-group">
                <button
                  type="submit"
                  className="btn btn-primary mb-2 mr-1 waves-effect waves-light"
                >
                  Submit
                </button>
                <button
                  type="reset"
                  className="btn btn-danger mb-2 waves-effect waves-light"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sign_Up;
