import React, { useEffect, useState } from "react";
import "./BookingConsultation.css";
import FindDoctorSearch from "../FindDoctorSearch/FindDoctorSearch";
import DoctorCard from "../DoctorCard/DoctorCard";
import { API_URL } from "../../config";

const BookingConsultation = () => {
  const [doctors, setDoctors] = useState([
    { name: "Dr. Sarah Johnson", speciality: "Cardiologist", experience: 10, ratings: 4.8 },
    { name: "Dr. Rakesh Mehta", speciality: "Dentist", experience: 7, ratings: 4.5 },
    { name: "Dr. Emily Carter", speciality: "Dermatologist", experience: 12, ratings: 4.9 },
    { name: "Dr. Alex Kim", speciality: "Neurologist", experience: 9, ratings: 4.6 },
  ]);

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  // ✅ Fetch doctors (optional backend fetch)
  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${API_URL}/api/doctors`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setDoctors(data);
        }
      }
    } catch (err) {
      console.warn("⚠️ Using local fallback doctors");
    }
  };

  // ✅ Filter doctors by speciality
  const handleSearch = (searchText) => {
    if (!searchText.trim()) {
      setFilteredDoctors([]);
      setIsSearched(false);
      return;
    }

    const filtered = doctors.filter((doc) =>
      doc.speciality.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setIsSearched(true);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const doctorsToDisplay = isSearched ? filteredDoctors : doctors;

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearch onSearch={handleSearch} />
        <div className="search-results-container">
          <h2>
            {doctorsToDisplay.length} doctors available{" "}
            {isSearched && filteredDoctors.length > 0 ? "(filtered)" : ""}
          </h2>
          <h3>Book or cancel appointments with verified doctors</h3>

          {doctorsToDisplay.length > 0 ? (
            doctorsToDisplay.map((doctor) => (
              <DoctorCard
                key={doctor.name}
                name={doctor.name}
                speciality={doctor.speciality}
                experience={doctor.experience}
                ratings={doctor.ratings}
                profilePic={doctor.image}
              />
            ))
          ) : (
            <p>No doctors found.</p>
          )}
        </div>
      </div>
    </center>
  );
};

export default BookingConsultation;
