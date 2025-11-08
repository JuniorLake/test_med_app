import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [userName, setUserName] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);  // ✅ Reference to dropdown

  const handleClick = () => {
    setIsActive(!isActive);
  };

  // ✅ Check login status on mount
  useEffect(() => {
    const token = sessionStorage.getItem("auth-token");
    const fullName = sessionStorage.getItem("name");

    if (token && fullName) {
      setUserName(fullName.split(" ")[0]); // First name only
    }
  }, []);

  // ✅ Logout
  const handleLogout = () => {
    sessionStorage.clear();
    setUserName("");
    navigate("/");
    window.location.reload();
  };

  // ✅ CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  useEffect(() => {
    function handleOutsideClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfileMenu(false); // close menu
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []); 
  return (
    <div>
      <nav>
        <div className="nav__logo">
          <Link to="/">
            StayHealthy
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="26"
              width="26"
              viewBox="0 0 1000 1000"
              style={{ fill: "#3685fb", marginLeft: "5px" }}
            >
              <title>Doctor With Stethoscope</title>
              <g>
                <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
              </g>
            </svg>
          </Link>
        </div>

        {/* Hamburger Menu Toggle */}
        <div className="nav__icon" onClick={handleClick}>
          <i className={`fa ${isActive ? "fa-times" : "fa-bars"}`}></i>
        </div>

        <ul className={`nav__links ${isActive ? "active" : ""}`}>
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/booking-consultation">Appointments</Link>
          </li>
          <li className="link">
            <Link to="/review">Reviews</Link>
          </li>
          <li className="link">
            <Link to="/instant-consultation">Instant Booking</Link>
          </li>

          {/* ✅ Logged-In Dropdown Menu */}
          {userName ? (
            <>
              <li className="nav-item" style={{ position: "relative" }}>
                <button className="dropdown-btn" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    {userName} ▼
                </button>

                {showProfileMenu && (
                    <ul className="dropdown-menu">
                        <li onClick={() => navigate("/profile")}>Profile</li>
                        <li onClick={handleLogout}>Logout</li>
                    </ul>
                )}
            </li>

            </>
          ) : (
            // ✅ Logged-Out Buttons
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
