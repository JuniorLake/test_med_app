const express = require("express");
const app = express();
const PORT = 8181;

// ✅ Always enable CORS for both frontend URLs
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://juniorlake12-3000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai",
    "https://juniorlake12-3000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // Default fallback
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://juniorlake12-3000.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai"
    );
  }

  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // preflight
  }

  next();
});

app.use(express.json());

// ✅ Doctors API (static mock since external fetch may fail in your lab)
app.get("/api/doctors", (req, res) => {
  const doctors = [
    { name: "Dr. Smith", speciality: "Dentist", location: "London" },
    { name: "Dr. Patel", speciality: "Cardiologist", location: "Manchester" },
    { name: "Dr. Kim", speciality: "Dermatologist", location: "Birmingham" },
  ];
  res.json(doctors);
});

// ✅ Register
app.post("/api/auth/register", (req, res) => {
  console.log("✅ Register:", req.body);
  res.json({ authtoken: "fake-signup-token", message: "User registered successfully!" });
});

// ✅ Login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  console.log("✅ Login:", email);
  if (email === "test@example.com" && password === "1234") {
    res.json({ authtoken: "fake-login-token" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
