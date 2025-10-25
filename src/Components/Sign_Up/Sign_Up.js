// Sign_Up.js
import React, { useState } from "react";
import "./Sign_Up.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config"; // make sure config.js exports API_URL properly

function Sign_Up() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [showErr, setShowErr] = useState("");
  const navigate = useNavigate();

  // ✅ Validate input fields before submitting to API
  const validate = (values) => {
    const errors = {};
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPhone = /^((\+44)|(0)) ?\d{4} ?\d{6}$/i;

    if (!name.trim()) errors.name = "Name is required!";
    if (!phone.trim()) errors.phone = "Phone number is required!";
    else if (!regexPhone.test(phone)) errors.phone = "Invalid phone format!";
    if (!email.trim()) errors.email = "Email is required!";
    else if (!regexEmail.test(email)) errors.email = "Invalid email format!";
    if (!password.trim()) errors.password = "Password is required!";
    return errors;
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate({ name, phone, email, password });
    setFormErrors(errors);
    if (Object.keys(errors).length !== 0) return;

    try {
      const response = await fetch("https://juniorlake12-8181.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name,
            email,
            password,
            phone,
        }),
      });

      const json = await response.json();

      if (json.authtoken) {
        // ✅ Save data in session storage
        sessionStorage.setItem("auth-token", json.authtoken);
        sessionStorage.setItem("name", name);
        sessionStorage.setItem("phone", phone);
        sessionStorage.setItem("email", email);

        navigate("/"); // redirect to home
        window.location.reload(); // refresh navbar
      } else {
        if (json.errors) {
          setShowErr(json.errors[0]?.msg || "An error occurred");
        } else {
          setShowErr(json.error || "Registration failed");
        }
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setShowErr("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <div className="container" style={{ marginTop: "5%" }}>
        <div className="signup-grid">
          <div className="signup-text">
            <h1>Sign Up</h1>
          </div>

          <div className="signup-text1" style={{ textAlign: "left" }}>
            Already a member?{" "}
            <span>
              <a href="../Login/Login.html" style={{ color: "#2190FF" }}>
                Login
              </a>
            </span>
          </div>

          <div className="signup-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {formErrors.name && (
                  <p style={{ color: "red" }}>{formErrors.name}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="form-control"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                {formErrors.phone && (
                  <p style={{ color: "red" }}>{formErrors.phone}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {formErrors.email && (
                  <p style={{ color: "red" }}>{formErrors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {formErrors.password && (
                  <p style={{ color: "red" }}>{formErrors.password}</p>
                )}
              </div>

              {showErr && <p style={{ color: "red" }}>{showErr}</p>}

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
                  onClick={() => {
                    setName("");
                    setPhone("");
                    setEmail("");
                    setPassword("");
                    setFormErrors({});
                    setShowErr("");
                  }}
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
