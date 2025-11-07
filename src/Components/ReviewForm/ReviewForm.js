import React, { useState, useEffect } from "react";
import "./ReviewForm.css";

const ReviewForm = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeReviewDoctor, setActiveReviewDoctor] = useState(null);
  const [submittedReviews, setSubmittedReviews] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rating: "",
  });
  const [warning, setWarning] = useState("");

  // ✅ Load booked appointments from localStorage
  useEffect(() => {
    const doctorData = JSON.parse(localStorage.getItem("doctorData"));
    if (doctorData) {
      const appt = JSON.parse(localStorage.getItem(doctorData.name));
      if (appt) {
        setAppointments([
          {
            doctorName: doctorData.name,
            speciality: doctorData.speciality,
            date: appt.date,
            time: appt.time,
          },
        ]);

        // ✅ Load saved review if exists
        const savedReview = JSON.parse(localStorage.getItem("review_" + doctorData.name));
        if (savedReview) {
          setSubmittedReviews({ [doctorData.name]: savedReview });
        }
      }
    }
  }, []);

  const handleOpenForm = (doctorName) => {
    setActiveReviewDoctor(doctorName);
    setWarning("");
    setFormData({ name: "", review: "", rating: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.review || !formData.rating) {
      setWarning("⚠️ Please fill out all fields.");
      return;
    }

    const finalReview = { ...formData };

    // ✅ Save in localStorage
    localStorage.setItem("review_" + activeReviewDoctor, JSON.stringify(finalReview));

    // ✅ Update UI
    setSubmittedReviews({ ...submittedReviews, [activeReviewDoctor]: finalReview });

    // ✅ Disable button
    setActiveReviewDoctor(null);
  };

  return (
    <div className="review-wrapper">
      <h2>Reviews</h2>

      {appointments.length === 0 ? (
        <p>No past consultations found.</p>
      ) : (
        <table className="review-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Speciality</th>
              <th>Provide Feedback</th>
              <th>Your Review</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((appt, i) => {
              const hasReview = submittedReviews[appt.doctorName];

              return (
                <tr key={i}>
                  <td>{appt.doctorName}</td>
                  <td>{appt.speciality}</td>

                  <td>
                    <button
                      className="feedback-btn"
                      disabled={!!hasReview}
                      onClick={() => handleOpenForm(appt.doctorName)}
                    >
                      {hasReview ? "✅ Submitted" : "Click Here"}
                    </button>
                  </td>

                  <td className="review-output-cell">
                    {hasReview ? (
                      <div className="submitted-review-box">
                        <p><strong>Name:</strong> {hasReview.name}</p>
                        <p><strong>Rating:</strong> {"⭐".repeat(hasReview.rating)}</p>
                        <p><strong>Review:</strong> {hasReview.review}</p>
                      </div>
                    ) : (
                      <p>—</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* ✅ The Review Form */}
      {activeReviewDoctor && (
        <div className="review-form-container">
          <h3>Submit Review for {activeReviewDoctor}</h3>

          {warning && <p className="warning">{warning}</p>}

          <form onSubmit={handleSubmit} className="review-form">
            <label>
              Your Name:
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </label>

            <label>
              Rating (1–5):
              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
              >
                <option value="">Select Rating</option>
                <option value="1">⭐ 1</option>
                <option value="2">⭐ 2</option>
                <option value="3">⭐ 3</option>
                <option value="4">⭐ 4</option>
                <option value="5">⭐ 5</option>
              </select>
            </label>

            <label>
              Your Review:
              <textarea
                value={formData.review}
                onChange={(e) =>
                  setFormData({ ...formData, review: e.target.value })
                }
              ></textarea>
            </label>

            <button type="submit" className="submit-review-btn">
              Submit Review
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewForm;
