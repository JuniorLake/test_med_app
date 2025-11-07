import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    setIsActive(!isActive);
  };

  // ✅ On mount, check if user is logged in
  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    const name = sessionStorage.getItem("name");
    if (token && name) {
      // Extract only first name (optional)
      const firstName = name.split(" ")[0];
      setUserName(firstName);
    }
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    sessionStorage.clear(); // Remove all sessionStorage items
    setUserName("");
    navigate("/"); // Redirect to home
    window.location.reload(); // Refresh navbar
  };

  return (
    <div>
      <nav>
        {/* Navigation logo section */}
        <div className="nav__logo">
          <Link to="/">
            StayHealthy
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              width="26"
              viewBox="0 0 1000 1000"
              style={{ fill: "#3685fb" }}
            >
              <title>Doctor With Stethoscope SVG icon</title>
              <g>
                <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
              </g>
            </svg>
          </Link>
          <span>.</span>
        </div>

        {/* Menu toggle icon */}
        <div className="nav__icon" onClick={handleClick}>
          <i className={`fa ${isActive ? "fa-times" : "fa-bars"}`}></i>
        </div>

        <ul className={`nav__links ${isActive ? "active" : ""}`}>
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="#">Appointments</Link>
          </li>
          <li className="link">
            <Link to="/review">Reviews</Link>
          </li>
          <li className="link">
            <Link to="/instant-consultation">Instant Booking Consultation</Link>
          </li>

          {/* ✅ Conditional rendering based on login state */}
          {userName ? (
            <>
              <li className="link user-display">
                <span style={{ color: "#3685fb", fontWeight: "bold" }}>
                  Hello, {userName}
                </span>
              </li>
              <li className="link">
                <button
                  className="btn1"
                  style={{ backgroundColor: "#ff4d4d", color: "white" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="link">
                <Link to="/Sign_Up">
                  <button className="btn1">Sign Up</button>
                </Link>
              </li>
              <li className="link">
                <Link to="/Login">
                  <button className="btn1">Login</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
