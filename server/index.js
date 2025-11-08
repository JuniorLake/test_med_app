// server/index.js
const express = require("express");
const app = express();
const PORT = 8181;
const cors = require('cors');

// Parse JSON bodies
app.use(express.json());
app.use(cors());

// Simple debug middleware so you can see hits in the terminal
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// --- Mock APIs ---

// Doctors API
app.get("/api/doctors", (req, res) => {
  const doctors = [
    { name: "Dr. Sarah Johnson", speciality: "Cardiologist", experience: 10, ratings: 4.8 },
    { name: "Dr. Rakesh Mehta", speciality: "Dentist", experience: 7, ratings: 4.5 },
    { name: "Dr. Emily Carter", speciality: "Dermatologist", experience: 12, ratings: 4.9 },
  ];
  res.json(doctors);
});

// Register
app.post("/api/auth/register", (req, res) => {
  console.log("✅ Register body:", req.body);
  res.json({
    authtoken: "fake-signup-token",
    message: "User registered successfully!",
  });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  console.log("✅ Login attempt:", email);

  if (email === "test@example.com" && password === "1234") {
    res.json({ authtoken: "fake-login-token" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
});
