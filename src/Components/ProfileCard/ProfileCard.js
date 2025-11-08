import React from "react";
import "./ProfileCard.css";

const ProfileCard = () => {
  // ✅ Load stored user data (update if you store more fields)
  const username = sessionStorage.getItem("email") || "Guest User";

  return (
    <div className="profile-card-container">
      <div className="profile-card">
        <div className="profile-avatar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="70"
            height="70"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>

        <div className="profile-info">
          <h2 className="profile-name">{username}</h2>
          <p className="profile-email">{username}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
