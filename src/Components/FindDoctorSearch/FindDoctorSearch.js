import React, { useState, useRef } from "react";
import "./FindDoctorSearch.css";

const specialities = [
  "Dentist",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Neurologist",
];

export default function FindDoctorSearch({ onSearch }) {
  const [searchText, setSearchText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const handleFocus = () => setShowDropdown(true);
  const handleBlur = (e) => {
    // Delay blur so click works
    setTimeout(() => setShowDropdown(false), 150);
  };

  const handleSelect = (speciality) => {
    setSearchText(speciality);
    onSearch(speciality);
    setShowDropdown(false);
  };

  return (
    <div className="findDoctorSearch" ref={searchRef}>
      <input
        type="text"
        placeholder="Search doctor by speciality..."
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          onSearch(e.target.value);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="search-input"
      />
      
      {showDropdown && (
        <ul className="dropdown">
          {specialities.map((s) => (
            <li key={s} onClick={() => handleSelect(s)}>
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
