const express = require("express");
const app = express();
const PORT = 8181;

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://juniorlake12-3000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai",
];

// ✅ Manual CORS middleware (works behind Theia proxy)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Only allow the known frontend origins
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  // Always include CORS headers for preflight & main requests
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // ✅ Handle preflight requests explicitly
  if (req.method === "OPTIONS") {
    console.log("🔁 Handling preflight for:", req.path, "from", origin);
    return res.sendStatus(200);
  }

  next();
});

app.use(express.json());

// ✅ Your test route
app.post("/api/auth/register", (req, res) => {
  console.log("✅ Received signup data:", req.body);
  res.json({ authtoken: "fake-token-123" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
