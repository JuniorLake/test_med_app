const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8181;

// ✅ Handle CORS and OPTIONS preflight correctly
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://juniorlake12-3000.theiadockernext-1-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

// ✅ Test route
app.post("/api/auth/register", (req, res) => {
  console.log("✅ Received signup data:", req.body);
  res.json({ message: "User registered successfully!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
