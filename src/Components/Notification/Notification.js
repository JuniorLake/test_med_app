import React, { useEffect, useState } from "react";
import "./Notification.css";

const Notification = () => {
  const [appointment, setAppointment] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [visible, setVisible] = useState(false);

  // ✅ Load appointment + doctor info on mount
  useEffect(() => {
    const storedDoctor = JSON.parse(localStorage.getItem("doctorData"));

    if (storedDoctor) {
      setDoctor(storedDoctor);

      const storedAppt = JSON.parse(localStorage.getItem(storedDoctor.name));

      if (storedAppt) {
        setAppointment(storedAppt);
        setVisible(true);
      }
    }

    // ✅ Listen for booking event
    const handleBooked = () => {
      const d = JSON.parse(localStorage.getItem("doctorData"));
      const appt = JSON.parse(localStorage.getItem(d?.name));

      if (d && appt) {
        setDoctor(d);
        setAppointment(appt);
        setVisible(true);
      }
    };

    // ✅ Listen for cancellation event
    const handleCancelled = () => {
      setVisible(false);
      setAppointment(null);
      setDoctor(null);
    };

    window.addEventListener("appointmentBooked", handleBooked);
    window.addEventListener("appointmentCancelled", handleCancelled);

    return () => {
      window.removeEventListener("appointmentBooked", handleBooked);
      window.removeEventListener("appointmentCancelled", handleCancelled);
    };
  }, []);

  if (!visible || !appointment || !doctor) return null;

  return (
    <div className="notification-container">
      <div className="notification-card">
        <h3>✅ Appointment Confirmed</h3>

        <p><strong>Doctor:</strong> {doctor.name}</p>
        <p><strong>Speciality:</strong> {doctor.speciality}</p>
        <p><strong>Patient:</strong> {appointment.name}</p>
        <p><strong>Phone:</strong> {appointment.phoneNumber}</p>
        <p>
            <strong>Schedule:</strong> {appointment.appointmentDate} at {appointment.appointmentTime}
        </p>


        <button
            className="close-btn"
            onClick={() => {
                if (doctor?.name) {
                localStorage.removeItem(doctor.name);  // ✅ Remove appointment
                }

                localStorage.removeItem("doctorData");   // ✅ Remove stored doctor info

                window.dispatchEvent(new Event("appointmentCancelled")); // ✅ Update all pages

                setVisible(false); // ✅ Hide notification
                setAppointment(null);
                setDoctor(null);
            }}
            >
            Cancel Appointment
        </button>

      </div>
    </div>
  );
};

export default Notification;
