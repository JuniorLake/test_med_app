// server/index.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8181;

// ✅ CORS
app.use(cors());
app.use(express.json());

// ✅ Logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// ✅ TEMP user store
let users = {};

// ---------------------------------------
// ✅ Doctors API
// ---------------------------------------
app.get("/api/doctors", (req, res) => {
  const doctors = [
    { name: "Dr. Sarah Johnson", speciality: "Cardiologist", experience: 10, ratings: 4.8 },
    { name: "Dr. Rakesh Mehta", speciality: "Dentist", experience: 7, ratings: 4.5 },
    { name: "Dr. Emily Carter", speciality: "Dermatologist", experience: 12, ratings: 4.9 },
  ];
  res.json(doctors);
});

// ---------------------------------------
// ✅ Register User
// ---------------------------------------
app.post("/api/auth/register", (req, res) => {
  const { name, email, phone, password } = req.body;

  if (!email) return res.status(400).json({ error: "Email required" });

  users[email] = { name, email, phone };

  res.json({
    authtoken: "fake-signup-token",
    message: "User registered successfully!"
  });
});

// ---------------------------------------
// ✅ Login
// ---------------------------------------
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;

  if (!email || !users[email]) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({
    authtoken: "fake-login-token",
    user: users[email]
  });
});

// ---------------------------------------
// ✅ GET Profile
// ---------------------------------------
app.get("/api/auth/user", (req, res) => {
  const email = req.headers.email;

  if (!email || !users[email]) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(users[email]);
});

// ---------------------------------------
// ✅ PUT Update Profile  ✅ MOVED BEFORE listen()
// ---------------------------------------
app.put("/api/auth/user", (req, res) => {
  const email = req.headers.email;
  const { name, phone } = req.body;

  if (!email || !users[email]) {
    return res.status(404).json({ error: "User not found" });
  }

  users[email].name = name || users[email].name;
  users[email].phone = phone || users[email].phone;

  res.json({
    message: "Profile updated successfully",
    user: users[email]
  });
});

// ---------------------------------------
// ✅ START SERVER (MUST STAY LAST!)
// ---------------------------------------
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
