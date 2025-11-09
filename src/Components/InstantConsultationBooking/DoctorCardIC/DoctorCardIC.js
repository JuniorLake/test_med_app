import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./DoctorCardIC.css";
import AppointmentFormIC from "../AppointmentFormIC/AppointmentFormIC";
import { v4 as uuidv4 } from "uuid";

const DoctorCardIC = ({ name, speciality, experience, ratings, profilePic }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  // ✅ Load saved appointment on mount
  useEffect(() => {
    const stored = localStorage.getItem(name);
    if (stored) {
      const parsed = JSON.parse(stored);
      setAppointments([{ id: uuidv4(), ...parsed }]);
    }
  }, [name]);

  // ✅ Open booking modal
  const handleBooking = () => {
    setShowModal(true);
  };

  // ✅ Cancel existing appointment
  const handleCancel = (id) => {
    localStorage.removeItem(name);
    localStorage.removeItem("doctorData");

    setAppointments([]); // UI update
    alert("❌ Appointment cancelled");

    // ✅ Notify other components (ReportsLayout, Notification)
    window.dispatchEvent(new Event("appointmentCancelled"));
  };

  // ✅ Handle new booking submission
  const handleFormSubmit = (appointmentData) => {
    const newAppointment = { id: uuidv4(), ...appointmentData };

    // ✅ Save appointment
    localStorage.setItem(name,JSON.stringify({...appointmentData,doctorSpeciality: speciality}));


    // ✅ Save doctor info for reports/notification
    localStorage.setItem(
      "doctorData",
      JSON.stringify({ name, speciality })
    );

    setAppointments([newAppointment]);
    setShowModal(false);

    alert("✅ Appointment booked successfully!");

    // ✅ Notify Notification + ReportsLayout
    window.dispatchEvent(new Event("appointmentBooked"));
  };

  return (
    <div className="doctor-card-container">
      {/* Doctor Details */}
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          {profilePic ? (
            <img src={profilePic} alt={name} className="doctor-profile-img" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="46"
              height="46"
              fill="currentColor"
              className="bi bi-person-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          )}
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">
            {experience} years experience
          </div>
          <div className="doctor-card-detail-consultationfees">
            Ratings: {ratings}
          </div>
        </div>
      </div>

      {/* ✅ Booking / Cancel buttons */}
      <div className="doctor-card-options-container">
        {appointments.length > 0 ? (
          <button
            className="book-appointment-btn cancel-appointment"
            onClick={() => handleCancel(appointments[0].id)}
          >
            Cancel Appointment
          </button>
        ) : (
          <button className="book-appointment-btn" onClick={handleBooking}>
            Book Appointment
          </button>
        )}
      </div>

      {/* ✅ Booking Modal */}
      <Popup
        open={showModal}
        modal
        closeOnDocumentClick
        onClose={() => setShowModal(false)}
      >
        <div className="doctorbg" style={{ height: "100vh", overflow: "auto" }}>
          <div className="doctor-card-details">
            <div className="doctor-card-detail-name">{name}</div>
            <div className="doctor-card-detail-speciality">{speciality}</div>
            <div className="doctor-card-detail-experience">
              {experience} years experience
            </div>
            <div className="doctor-card-detail-consultationfees">
              Ratings: {ratings}
            </div>
          </div>

          {appointments.length > 0 ? (
            <>
              <h3 style={{ textAlign: "center" }}>Appointment Booked!</h3>

              {appointments.map((appointment) => (
                <div className="bookedInfo" key={appointment.id}>
                  <p>Name: {appointment.name}</p>
                  <p>Phone: {appointment.phoneNumber}</p>
                  <p>
                    Appointment: {appointment.appointmentDate} at{" "}
                    {appointment.appointmentTime}
                  </p>

                  <button onClick={() => handleCancel(appointment.id)}>
                    Cancel Appointment
                  </button>
                </div>
              ))}
            </>
          ) : (
            <AppointmentFormIC
              doctorName={name}
              doctorSpeciality={speciality}
              onSubmit={handleFormSubmit}
            />
          )}
        </div>
      </Popup>
    </div>
  );
};

export default DoctorCardIC;
