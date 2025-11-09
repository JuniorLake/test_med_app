import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileCard = () => {
  const navigate = useNavigate();

  // ✅ Required state fields
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [updatedDetails, setUpdatedDetails] = useState({
    name: "",
    phone: "",
    email: ""
  });

  const [editMode, setEditMode] = useState(false);

  // ✅ Fetch user profile on load
  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    const storedEmail = sessionStorage.getItem("email");

    if (!authtoken || !storedEmail) {
      navigate("/login");
      return;
    }

    fetchUserProfile();
  }, [navigate]);

  // ✅ GET user profile
  const fetchUserProfile = async () => {
    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      const response = await fetch(`${API_URL}/api/auth/user`, {
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Email": email
        }
      });

      if (!response.ok) throw new Error("Failed to fetch profile");

      const data = await response.json();

      setUserDetails({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || ""
      });

      setUpdatedDetails({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || ""
      });

    } catch (err) {
      console.error("Profile fetch error:", err);
    }
  };

  // ✅ Turn on edit mode
  const handleEdit = () => setEditMode(true);

  // ✅ Handle typed input
  const handleInputChange = (e) => {
    setUpdatedDetails({
      ...updatedDetails,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ SAVE updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authtoken = sessionStorage.getItem("auth-token");
      const email = sessionStorage.getItem("email");

      const response = await fetch(`${API_URL}/api/auth/user`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${authtoken}`,
          "Content-Type": "application/json",
          "Email": email
        },
        body: JSON.stringify(updatedDetails),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      // ✅ Update UI + session storage
      sessionStorage.setItem("name", updatedDetails.name);
      sessionStorage.setItem("phone", updatedDetails.phone);

      setUserDetails(updatedDetails);
      setEditMode(false);

      alert("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Update failed");
    }
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>

      {editMode ? (
        /* ✅ EDIT MODE */
        <form className="profile-form" onSubmit={handleSubmit}>
          
          <label>
            Email
            <input type="email" name="email" value={updatedDetails.email} disabled />
          </label>

          {/* ✅ HINT SECTION IMPLEMENTED — EDIT NAME & PHONE */}
          <label>
            Name
            <input
              type="text"
              name="name"
              value={updatedDetails.name}
              onChange={handleInputChange}
            />
          </label>

          <label>
            Phone
            <input
              type="text"
              name="phone"
              value={updatedDetails.phone}
              onChange={handleInputChange}
            />
          </label>

          <button type="submit" className="save-btn">
            Save
          </button>
        </form>
      ) : (
        /* ✅ VIEW MODE */
        <div className="profile-details">
          <p><b>Name:</b> {userDetails.name}</p>

          {/* ✅ HINT SECTION IMPLEMENTED — DISPLAY EMAIL & PHONE */}
          <p><b>Email:</b> {userDetails.email}</p>
          <p><b>Phone:</b> {userDetails.phone}</p>

          <button className="edit-btn" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
