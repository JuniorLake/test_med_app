import React, { useState } from "react";
import "./AppointmentFormIC.css";

const AppointmentFormIC = ({ doctorName, doctorSpeciality, onSubmit }) => {
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

    if (
      !formData.name ||
      !formData.phoneNumber ||
      !formData.appointmentDate ||
      !formData.appointmentTime
    ) {
      setError("⚠️ Please fill out all fields before booking.");
      return;
    }

    setError("");
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
          Time Slot:
          <select
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
          >
            <option value="">-- Select a time slot --</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:30 AM">10:30 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="02:00 PM">02:00 PM</option>
            <option value="04:00 PM">04:00 PM</option>
            <option value="06:00 PM">06:00 PM</option>
          </select>
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="submit-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AppointmentFormIC;
