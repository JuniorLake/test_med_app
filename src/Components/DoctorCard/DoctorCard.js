import React from "react";
import "./DoctorCard.css";

export default function DoctorCard({ name, speciality, experience, rating, image }) {
  return (
    <div className="doctor-card">
      <div className="doctor-card-left">
        <img
          src={
            image ||
            "https://cdn-icons-png.flaticon.com/512/387/387561.png"
          }
          alt={`${name}`}
          className="doctor-image"
        />
      </div>

      <div className="doctor-card-right">
        <h2 className="doctor-name">{name}</h2>
        <p className="doctor-speciality">Speciality: {speciality}</p>
        <p className="doctor-experience">Experience: {experience} years</p>
        <p className="doctor-rating">⭐ Rating: {rating}/5</p>

        <button className="book-btn">Book Appointment</button>
      </div>
    </div>
  );
}
