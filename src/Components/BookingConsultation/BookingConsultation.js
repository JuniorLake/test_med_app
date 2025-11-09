import React, { useEffect, useState } from "react";
import "./BookingConsultation.css";
import DoctorCardIC from "../InstantConsultationBooking/DoctorCardIC/DoctorCardIC.js";
import { API_URL } from "../../config";

const BookingConsultation = () => {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState({}); // { doctorName: appointmentObj }

  // ✅ Fetch doctors from API or fallback
  const loadDoctors = async () => {
    try {
      const res = await fetch(`${API_URL}/api/doctors`);
      if (res.ok) {
        const data = await res.json();
        setDoctors(data);
        return;
      }
    } catch (err) {
      console.log("⚠️ API offline, using fallback doctors");
    }

    // ✅ fallback list
    setDoctors([
      { name: "Dr. Sarah Johnson", speciality: "Cardiologist", experience: 10, ratings: 4.8 },
      { name: "Dr. Rakesh Mehta", speciality: "Dentist", experience: 7, ratings: 4.5 },
      { name: "Dr. Emily Carter", speciality: "Dermatologist", experience: 12, ratings: 4.9 },
      { name: "Dr. Alex Kim", speciality: "Neurologist", experience: 9, ratings: 4.6 },
    ]);
  };

  // ✅ Load appointments from localStorage
  const loadAppointments = () => {
    const booked = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      if (
        key === "auth-token" ||
        key === "doctorData" ||
        key === "email" ||
        key === "name" ||
        key === "phone"
      ) {
        continue;
      }

      try {
        const data = JSON.parse(localStorage.getItem(key));

        if (data?.appointmentDate && data?.appointmentTime) {
          booked[key] = data;
        }
      } catch {
        continue;
      }
    }

    setAppointments(booked);
  };

  // ✅ Cancel appointment handler
  const cancelAppointment = (doctorName) => {
    localStorage.removeItem(doctorName);
    localStorage.removeItem("doctorData");

    loadAppointments(); // refresh list

    // Notify Reports layout + Notification banner
    window.dispatchEvent(new Event("appointmentCancelled"));
  };

  // ✅ When user books a new appointment inside DoctorCard
  const handleAppointmentBooked = () => {
    loadAppointments();
  };

  useEffect(() => {
    loadDoctors();
    loadAppointments();

    // Listen for cancellation events
    window.addEventListener("appointmentCancelled", loadAppointments);

    return () => {
      window.removeEventListener("appointmentCancelled", loadAppointments);
    };
  }, []);

  return (
    <center>
      <div className="appointments-container">
        <h1>Available Doctors</h1>

        {doctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          doctors.map((doc) => (
            <DoctorCardIC
                key={doc.name}
                name={doc.name}
                speciality={doc.speciality}
                experience={doc.experience}
                ratings={doc.ratings}
                profilePic={doc.image}
                // ✅ DoctorCardIC automatically opens AppointmentFormIC when booking
            />
          ))
        )}
      </div>
    </center>
  );
};

export default BookingConsultation;
