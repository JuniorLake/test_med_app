import React, { useState } from "react";
import "./AppointmentForm.css";

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    appointmentDate: "",
    appointmentTime: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.phoneNumber ||
      !formData.appointmentDate ||
      !formData.appointmentTime
    ) {
      setError("Please fill in all fields before booking.");
      return;
    }

    setError("");
    console.log("✅ Appointment booked:", formData);
    onSubmit(formData);
  };

  return (
    <div className="appointment-form-container">
      <h3>Book Appointment</h3>
      <p>
        Doctor: <strong>{doctorName}</strong> ({doctorSpeciality})
      </p>

      <form onSubmit={handleSubmit} className="appointment-form">
        <label>
          Patient Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
        </label>

        <label>
          Phone Number:
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </label>

        <label>
          Appointment Date:
          <input
            type="date"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
          />
        </label>

        <label>
          Appointment Time:
          <input
            type="time"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="submit-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
