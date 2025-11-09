import React, { useEffect, useState } from "react";
import "./ReportsLayout.css";
import { jsPDF } from "jspdf";

const ReportsLayout = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReportsFromAppointments();
  }, []);

  // ✅ Load only REAL appointments from localStorage
  const loadReportsFromAppointments = () => {
    const reportList = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // ✅ Skip non-appointment entries
      if (
        key === "auth-token" ||
        key === "email" ||
        key === "name" ||
        key === "phone" ||
        key === "doctorData" ||
        key.startsWith("react") ||
        key.startsWith("persist:")
      ) {
        continue;
      }

      let appointment;
      try {
        appointment = JSON.parse(localStorage.getItem(key));
      } catch {
        continue; // skip invalid JSON entries
      }

      // ✅ Validate appointment fields
      if (
        appointment &&
        appointment.appointmentDate &&
        appointment.appointmentTime &&
        appointment.name // patient name
      ) {
        reportList.push({
          id: reportList.length + 1,
          doctor: key, // doctor name is the key
          speciality: appointment.doctorSpeciality || "N/A",
          date: appointment.appointmentDate,
          time: appointment.appointmentTime,
          summary: `Consultation with ${key} at ${appointment.appointmentTime}.`
        });
      }
    }

    setReports(reportList);
  };

  // ✅ PDF builder
  const buildPdf = (report) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Patient Consultation Report", 20, 20);

    doc.setFontSize(12);
    doc.text(`Doctor: ${report.doctor}`, 20, 40);
    doc.text(`Speciality: ${report.speciality}`, 20, 50);
    doc.text(`Date: ${report.date}`, 20, 60);
    doc.text(`Time: ${report.time}`, 20, 70);

    doc.text("Summary:", 20, 90);
    const wrappedText = doc.splitTextToSize(report.summary, 170);
    doc.text(wrappedText, 20, 100);

    return doc;
  };

  // ✅ Download PDF
  const downloadPdf = (report) => {
    const doc = buildPdf(report);
    doc.save(`Report_${report.doctor}.pdf`);
  };

  // ✅ View PDF in new tab
  const viewPdf = (report) => {
    const doc = buildPdf(report);
    const blob = doc.output("blob");
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="reports-container">
      <h1>Your Consultation Reports</h1>

      {reports.length === 0 ? (
        <p className="no-reports">No reports available.</p>
      ) : (
        <table className="reports-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Speciality</th>
              <th>Date</th>
              <th>Summary</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>{r.doctor}</td>
                <td>{r.speciality}</td>
                <td>{r.date}</td>
                <td>{r.summary}</td>
                <td className="actions-cell">
                  <button className="view-btn" onClick={() => viewPdf(r)}>
                    View
                  </button>
                  <button className="download-btn" onClick={() => downloadPdf(r)}>
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportsLayout;
