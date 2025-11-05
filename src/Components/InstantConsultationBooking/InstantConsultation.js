import React, { useEffect, useState } from "react";
import "./InstantConsultation.css";
import { useSearchParams } from "react-router-dom";
import FindDoctorSearchIC from "./FindDoctorSearchIC/FindDoctorSearchIC";
import DoctorCard from "../../Components/InstantConsultationBooking/DoctorCardIC/DoctorCardIC.js";
import { API_URL } from "../../config";

const InstantConsultation = () => {
  const [searchParams] = useSearchParams();

  // 🧠 Local fallback doctor data
  const [doctors, setDoctors] = useState([
    { name: "Dr. Sarah Johnson", speciality: "Cardiologist", experience: 10, ratings: 4.8 },
    { name: "Dr. Rakesh Mehta", speciality: "Dentist", experience: 7, ratings: 4.5 },
    { name: "Dr. Emily Carter", speciality: "Dermatologist", experience: 12, ratings: 4.9 },
    { name: "Dr. Alex Kim", speciality: "Neurologist", experience: 9, ratings: 4.6 },
  ]);

  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [activeSpeciality, setActiveSpeciality] = useState(null);

  // ✅ Fetch and merge doctors (runs once)
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/doctors`);
        if (!response.ok) throw new Error("Network error");

        const data = await response.json();
        console.log("🌐 API returned:", data);

        // Ensure data is always an array
        const apiDoctors = Array.isArray(data) ? data : [data];

        // Merge API + local doctors (avoid duplicates by name)
        const merged = [
          ...doctors,
          ...apiDoctors.filter(
            (apiDoc) => !doctors.some((local) => local.name === apiDoc.name)
          ),
        ];

        console.log("🩺 Final merged list:", merged);
        setDoctors(merged);
      } catch (err) {
        console.warn("⚠️ API failed, using local fallback doctors.");
        // Keep local ones if API fails
        setDoctors((prev) => prev);
      }
    };

    fetchDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Handle search (filters locally)
  const handleSearch = (searchText) => {
    if (!searchText.trim()) {
      setFilteredDoctors([]);
      setActiveSpeciality(null);
      return;
    }

    const filtered = doctors.filter((doc) =>
      doc.speciality.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredDoctors(filtered);
    setActiveSpeciality(searchText);
  };

  // ✅ Check for ?speciality param on first load
  useEffect(() => {
    const specialityFromURL = searchParams.get("speciality");
    if (specialityFromURL) {
      handleSearch(specialityFromURL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doctorsToDisplay = filteredDoctors.length > 0 ? filteredDoctors : doctors;
  console.log("🧠 Rendering doctors:", doctorsToDisplay);

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearchIC onSearch={handleSearch} />

        <div className="search-results-container">
          <h2>
            {doctorsToDisplay.length} doctors are available{" "}
            {activeSpeciality ? `for ${activeSpeciality}` : ""}
          </h2>
          <h3>Book appointments with minimum wait-time & verified doctor details</h3>

          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.name}
              name={doctor.name}
              speciality={doctor.speciality}
              experience={doctor.experience}
              ratings={doctor.ratings}
              profilePic={doctor.image}
            />
          ))}
        </div>
      </div>
    </center>
  );
};

export default InstantConsultation;
