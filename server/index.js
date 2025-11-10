const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8181;

app.use(express.json());
app.use(cors());


// ✅ API routes
app.use('/api/auth', require('./routes/auth'));

// ✅ Serve React build
app.use(express.static(path.join(__dirname, 'build')));

// ✅ SPA fallback route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// ✅ Health check
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
